import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { authenticator } from 'otplib';
import crypto from 'crypto';
import NodeCache from 'node-cache';

const prisma = new PrismaClient();
const cache = new NodeCache();

// Register User
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({ message: 'Please fill in all fields (name, email, password)' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role ?? 'member',
        faEnable: false,
        faSecret: null,
        address: '', // add this
        phone_number: '', // add this
      },
    });

    return res.status(201).json({
      message: 'User registered successfully',
      id: newUser.id,
    });
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
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

    if (user.faEnable) {
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

      await prisma.userRefreshToken.create({
        data: {
          refreshToken,
          userId: user.id,
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

    const verified = authenticator.check(totp, user!.faSecret!);

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

    await prisma.userRefreshToken.create({
      data: {
        refreshToken,
        userId: user!.id,
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

    const userRefreshToken = await prisma.userRefreshToken.findFirst({
      where: { refreshToken, userId: (decodedRefreshToken as any).userId },
    });

    if (!userRefreshToken) {
      return res.status(401).json({ message: 'Refresh token invalid or expired' });
    }

    await prisma.userRefreshToken.delete({ where: { id: userRefreshToken.id } });

    const newAccessToken = jwt.sign({ userId: (decodedRefreshToken as any).userId }, process.env.ACCESS_TOKEN_SECRET!, {
      subject: 'accessApi',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    });

    const newRefreshToken = jwt.sign({ userId: (decodedRefreshToken as any).userId }, process.env.REFRESH_TOKEN_SECRET!, {
      subject: 'refreshToken',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
    });

    await prisma.userRefreshToken.create({
      data: {
        refreshToken: newRefreshToken,
        userId: (decodedRefreshToken as any).userId,
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
