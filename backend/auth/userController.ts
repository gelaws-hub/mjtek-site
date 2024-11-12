import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { authenticator } from 'otplib';
import crypto from 'crypto';
import NodeCache from 'node-cache';
import qrcode from 'qrcode';

const prisma = new PrismaClient();
const cache = new NodeCache();

// interface CustomRequest extends Request {
//   user: {
//     id: string;
    
//     // Add other properties of the user object if needed
//   };
// }

interface CustomRequest extends Request {
  user: {
    id: string;
    role_id: number;
    name: string;
    email: string;
  };
}


// REGISTER USER
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

// Login User
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
      const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        subject: 'accessApi',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
      });

      const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
        subject: 'refreshToken',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
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

// TOTP (2FA) Login
export const login2FA = async (req: Request, res: Response) => {
  try {
    const { tempToken, totp } = req.body;

    if (!tempToken || !totp) {
      return res.status(422).json({ message: 'Please fill in all fields (tempToken and totp)' });
    }

    const userId = cache.get(`tempToken_${tempToken}`) as string;

    if (!userId) {
      return res.status(401).json({ message: 'The provided temporary token is incorrect or expired' });
    }
    
    
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const verified = authenticator.check(totp, user!.fa_secret!);

    if (!verified) {
      return res.status(401).json({ message: 'The provided TOTP is incorrect or expired' });
    }

    const accessToken = jwt.sign({ userId: user!.id }, process.env.ACCESS_TOKEN_SECRET!, {
      subject: 'accessApi',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    });

    const refreshToken = jwt.sign({ userId: user!.id }, process.env.REFRESH_TOKEN_SECRET!, {
      subject: 'refreshToken',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
    });

    await prisma.user_refresh_token.create({
      data: {
        refresh_token: refreshToken,
        user_id: user!.id,
      },
    });

    return res.status(200).json({
      id: user!.id,
      name: user!.name,
      email: user!.email,
      accessToken,
      refreshToken,
    });
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
};

// Refresh Token
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

    const newAccessToken = jwt.sign({ userId: (decodedRefreshToken as any).userId }, process.env.ACCESS_TOKEN_SECRET!, {
      subject: 'accessApi',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    });

    const newRefreshToken = jwt.sign({ userId: (decodedRefreshToken as any).userId }, process.env.REFRESH_TOKEN_SECRET!, {
      subject: 'refreshToken',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
    });

    await prisma.user_refresh_token.create({
      data: {
        refresh_token: newRefreshToken,
        user_id: (decodedRefreshToken as any).userId,
      },
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
};

// Generate 2FA QR Code
export const generate2FAQRCode = async (req: CustomRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const secret = authenticator.generateSecret();
    const uri = authenticator.keyuri(user.email, 'yourapp.com', secret);

    // Simpan 2FA secret di database user
    await prisma.user.update({
      where: { id: user.id },
      data: { fa_secret: secret }
    });

    const qrCode = await qrcode.toBuffer(uri, { type: 'png', margin: 1 });

    res.setHeader('Content-Disposition', 'attachment; filename=qrcode.png');
    return res.status(200).type('image/png').send(qrCode);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Validate 2FA
export const validate2FA = async (req: CustomRequest, res: Response) => {
  try {
    const { totp } = req.body;

    if (!totp) {
      return res.status(422).json({ message: 'TOTP is required' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = authenticator.check(totp, user.fa_secret!);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid or expired TOTP' });
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { fa_enable: true }
    });

    return res.status(200).json({ message: 'TOTP validated successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Current User
export const getCurrentUser = async (req: CustomRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
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

// Role-based authorization
export const authorize = (roles: number[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user || !roles.includes(user.role_id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};

// Ensure authentication middleware
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

// Logout User
export const logoutUser = async (req: CustomRequest, res: Response) => {
  try {
    await prisma.user_refresh_token.deleteMany({
      where: { user_id: req.user.id }
    });

    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
