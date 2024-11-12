import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { authenticator } from 'otplib';
import crypto from 'crypto';
import NodeCache from 'node-cache';
import qrcode from 'qrcode';
// import { google } from 'googleapis';

const prisma = new PrismaClient();
const cache = new NodeCache();

interface CustomRequest extends Request {
  user: {
    id: string;
    role_id: number;
    name: string;
    email: string;
  };
}

interface ValidationRequest extends Request {
  user?: CustomRequest['user'];
}

// Middleware untuk validasi token
export const accessValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
      return res.status(401).json({ message: 'Token diperlukan' });
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET!;

  try {
      const decoded = jwt.verify(token, secret) as CustomRequest['user'];
      (req as CustomRequest).user = decoded;
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;
    
    // Type assertion to match CustomRequest
    (req as CustomRequest).user = {
      id: decoded.userId,
      role_id: decoded.role_id,
      name: decoded.name,
      email: decoded.email
    };

    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Access token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Access token invalid' });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};


// Google Login
// export const googleLogin = (req: Request, res: Response) => {
//   res.redirect(authorizationUrl);
// };

// Google Callback
// export const googleCallback = async (req: Request, res: Response) => {
//   const { code } = req.query;
//   const { tokens } = await oauth2Client.getToken(code as string);
//   oauth2Client.setCredentials(tokens);

//   const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
//   const { data } = await oauth2.userinfo.get();

//   if (!data.email || !data.name) {
//       return res.json({ data });
//   }

//   let user = await prisma.users.findUnique({ where: { email: data.email } });
//   if (!user) {
//       user = await prisma.users.create({ data: { name: data.name, email: data.email, address: '-' } });
//   }

//   const payload = { id: user.id, name: user.name, address: user.address };
//   const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

//   res.json({
//       data: { id: user.id, name: user.name, address: user.address },
//       token,
//   });
// };

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, address, phone_number } = req.body;

  try {
    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email }
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
        role_id: 2, // Set default role sebagai user biasa
      }
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: 'Please fill in all fields (email and password)' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email or password is invalid' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email or password is invalid' });
    }

    if (user.fa_enable) {
      const tempToken = crypto.randomUUID();
      cache.set(`tempToken_${tempToken}`, user.id, parseInt(process.env.CACHE_TEMP_TOKEN_EXPIRATION!));
      return res.status(200).json({ tempToken, expiresInSeconds: process.env.CACHE_TEMP_TOKEN_EXPIRATION });
    } else {
      const accessToken = jwt.sign({ userId: user.id, name: user.name }, process.env.ACCESS_TOKEN_SECRET!, {
        subject: 'accessApi',
        expiresIn: '30m',
      });

      const refreshToken = jwt.sign({ userId: user.id, name: user.name}, process.env.REFRESH_TOKEN_SECRET!, {
        subject: 'refreshToken',
        expiresIn: '1w',
      });

      await prisma.user_refresh_token.create({
        data: {
          refresh_token: refreshToken,
          user_id: user.id,
        },
      });

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      });
    }
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }

    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

    const userRefreshToken = await prisma.user_refresh_token.findFirst({
      where: { refresh_token: refreshToken, user_id: (decodedRefreshToken as any).userId },
    });

    if (!userRefreshToken) {
      return res.status(401).json({ message: 'Refresh token invalid or expired' });
    }

    await prisma.user_refresh_token.delete({ where: { id: userRefreshToken.id } });

    const user = await prisma.user.findUnique({ where: { id: (decodedRefreshToken as any).userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAccessToken = jwt.sign({ userId: user.id, name: user.name}, process.env.ACCESS_TOKEN_SECRET!, {
      subject: 'accessApi',
      expiresIn: '30m',
    });

    const newRefreshToken = jwt.sign({ userId: user.id, name: user.name}, process.env.REFRESH_TOKEN_SECRET!, {
      subject: 'refreshToken',
      expiresIn: '1w',
    });

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

// CRUD Operations
// export const createUser = async (req: ValidationRequest, res: Response) => {
//   const { name, email, address } = req.body;
//   const result = await prisma.user.create({ data: { name, email, address } });

//   res.json({ data: result, message: 'User created' });
// };

// Get Current User
export const getCurrentUser = async (req: ValidationRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
  res.json({ data: result, message: 'User list' });
};


// export const updateUser = async (req: ValidationRequest, res: Response) => {
//   const { id } = req.params;
//   const { name, email, address } = req.body;

//   const result = await prisma.user.update({
//       data: { name, email, address },
//       where: { id: Number(id) },
//   });
//   res.json({ data: result, message: `User ${id} updated` });
// };

// export const deleteUser = async (req: ValidationRequest, res: Response) => {
//   const { id } = req.params;

//   await prisma.users.delete({ where: { id: Number(id) } });
//   res.json({ message: `User ${id} deleted` });
// };

// Logout User
export const logoutUser = async (req: ValidationRequest, res: Response) => {
  try {
    const userName = req.user?.name; // Ambil nama pengguna dari req.user

    await prisma.user_refresh_token.deleteMany({
      where: { user_id: req.user?.id }
    });

    return res.status(200).json({ message: `User ${userName} has been logged out` });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



export const authorize = (roles: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Pastikan bahwa req.user sudah terisi oleh middleware ensureAuthenticated
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    try {
      // Ambil role_id dari database berdasarkan id user
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role_id: true },
      });

      if (!user || !roles.includes(user.role_id)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Jika user memiliki role yang diizinkan, lanjutkan ke endpoint berikutnya
      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
};