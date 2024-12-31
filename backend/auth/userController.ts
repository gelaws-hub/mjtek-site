import { Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import NodeCache from "node-cache";
import dotenv from "dotenv";

const prisma = new PrismaClient();
const cache = new NodeCache();
dotenv.config();

interface CustomRequest extends Request {
  user: {
    id: string;
    role_name: string;
    name: string;
    email: string;
  };
}

interface ValidationRequest extends Request {
  user?: CustomRequest["user"];
}

const isProduction = process.env.NODE_ENV === "production";

// Middleware untuk validasi token
export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.accessToken;

  // If no token is found in cookies, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: "Access token not found" });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;

    // Attach the user data to the request
    (req as any).user = {
      id: decoded.id,
      role_name: decoded.role_name,
      name: decoded.name,
      email: decoded.email,
    };

    // Continue with the next middleware or route handler
    next();
  } catch (error: any) {
    // Handle token errors (expired, invalid, etc.)
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Access token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Access token invalid" });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, address, phone_number } = req.body;

  try {
    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        phone_number,
        role_name: "buyer", // Set default role sebagai user biasa(pembeli)
        profile_pic:
          "https://raw.githubusercontent.com/gelaws-hub/mjtek-site/refs/heads/main/frontend/public/image.png",
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "Please fill in all fields (email and password)" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    if (user.fa_enable) {
      const tempToken = crypto.randomUUID();
      cache.set(
        `tempToken_${tempToken}`,
        user.id,
        parseInt(process.env.CACHE_TEMP_TOKEN_EXPIRATION!)
      );
      return res.status(200).json({
        tempToken,
        expiresInSeconds: process.env.CACHE_TEMP_TOKEN_EXPIRATION,
      });
    } else {
      const accessToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role_name: user.role_name,
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
          subject: "accessApi",
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }
      );

      const refreshToken = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
          role_name: user.role_name,
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
          subject: "refreshToken",
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }
      );

      await prisma.user_refresh_token.create({
        data: {
          refresh_token: refreshToken,
          user_id: user.id,
        },
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: false, // Prevent client-side access
        // secure: isProduction, // Use HTTPS in production
        // sameSite: isProduction ? "none" : "strict", // Prevent CSRF attacks
        maxAge: 3600 * 1000, // 1 hour expiration
      });

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role_name: user.role_name,
        // accessToken, // access token is received via http only cookie
        // refreshToken, this should never be delivered to client
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    const userRefreshToken = await prisma.user_refresh_token.findFirst({
      where: {
        refresh_token: refreshToken,
        user_id: (decodedRefreshToken as any).userId,
      },
    });

    if (!userRefreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });
    }

    await prisma.user_refresh_token.delete({
      where: { id: userRefreshToken.id },
    });

    const user = await prisma.user.findUnique({
      where: { id: (decodedRefreshToken as any).userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        subject: "accessApi",
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }
    );

    const newRefreshToken = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        subject: "refreshToken",
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }
    );

    await prisma.user_refresh_token.create({
      data: {
        refresh_token: newRefreshToken,
        user_id: user.id,
      },
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Current User
export const getCurrentUser = async (req: ValidationRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: {
        id: true,
        name: true,
        email: true,
        role_name: true,
        profile_pic: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (_req: ValidationRequest, res: Response) => {
  const result = await prisma.user.findMany({
    select: { id: true, name: true, email: true, address: true },
  });
  res.json({ data: result, message: "User list" });
};

// Logout User
export const logoutUser: RequestHandler = (req, res) => {
  try {
    // Clear the cookie storing the access token
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
    });

    return res.status(200).json({ message: "Successfully logged out." });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Failed to log out.", error: error.message });
  }
};

export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Pastikan bahwa req.user sudah terisi oleh middleware ensureAuthenticated
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    try {
      // Ambil role_id dari database berdasarkan id user
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role_name: true },
      });

      if (!user || !roles.includes(user.role_name)) {
        return res.status(403).json({ message: "Access denied 2" });
      }

      // Jika user memiliki role yang diizinkan, lanjutkan ke endpoint berikutnya
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

export const validateSession = (req: ValidationRequest, res: Response) => {
  // Get the JWT token from cookies
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    // If token is valid, return user data
    return res.status(200).json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
