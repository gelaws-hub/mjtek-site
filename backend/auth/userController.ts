import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const Welcome = (req: Request, res: Response) => {
    res.send("Welcome to MJ Tek API!");
};

export const Register = async (req: Request, res: Response) => {
    const { username, email, password, confPassword, alamat, no_hp } = req.body;

    // Memeriksa apakah password sesuai
    if (password !== confPassword) {
        return res.status(400).json({
            error: true,
            message: "Password tidak sesuai",
        });
    }

    try {
        // Memeriksa apakah email sudah dipakai sebelumnya
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({
                error: true,
                message: "Email has already been taken",
            });
        }

        // Jika email belum dipakai, lanjutkan dengan proses registrasi
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword,
                alamat: alamat,
                no_hp: no_hp,
                id_role: 1 // Default role (buyer)
            },
        });

        res.json({
            error: false,
            message: "Register Succeed!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Pemeriksaan apakah email dan password diberikan
        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan password dibutuhkan",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id_user: true,
                username: true,
                email: true,
                refresh_token: true, // Memastikan memilih refresh_token jika ada dalam skema
                password: true,
            },
        });

        // Pemeriksaan apakah pengguna ditemukan
        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Email tidak ditemukan",
            });
        }

        const match = await bcrypt.compare(password, user.password);

        // Pemeriksaan apakah password cocok
        if (!match) {
            return res.status(400).json({
                error: true,
                message: "Password salah!",
            });
        }

        const userId = user.id_user;
        const username = user.username;

        const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: '1h',
        });

        const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET!, {
            expiresIn: '180d',
        });

        // Update refreshToken pada database
        await prisma.user.update({
            where: {
                id_user: userId
            },
            data: {
                refresh_token: refreshToken
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            error: false,
            message: "success",
            loginResult: {
                userId,
                email,
                username,
                token: accessToken
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const Logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user) return res.sendStatus(204);

        const userId = user.id_user;

        await prisma.user.update({
            where: {
                id_user: userId
            },
            data: {
                refresh_token: null
            }
        });

        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getUsers = async(req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json({
            error: false,
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        // Mengambil ID pengguna dari parameter permintaan
        const userId = parseInt(req.params.id);

        // Mencari pengguna berdasarkan ID
        const user = await prisma.user.findUnique({
            where: {
                id_user: userId.toString()
            },
        });

        // Jika pengguna ditemukan, kirimkan data pengguna sebagai respons JSON
        if (user) {
            res.json({
                error: false,
                userData: {
                    id_user: user.id_user,
                    username: user.username,
                    email: user.email,
                    alamat: user.alamat,
                    no_hp: user.no_hp,
                    // tambahkan properti lainnya sesuai kebutuhan
                }
            });
        } else {
            // Jika pengguna tidak ditemukan, kirim respons dengan status 404
            res.status(404).json({
                error: true,
                message: "Pengguna tidak ditemukan"
            });
        }
    } catch (error) {
        // Tangani kesalahan dan kirim respons dengan status 500
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan server"
        });
    }
};


export const editProfile = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        const user = await prisma.user.findUnique({
            where: {
                id_user: userId.toString()
            }
        });

        if (user) {
            const { alamat, no_hp } = req.body;

            await prisma.user.update({
                where: {
                    id_user: userId.toString()
                },
                data: {
                    alamat: alamat,
                    no_hp: no_hp
                }
            });

            res.json({
                error: false,
                message: "Profil berhasil diperbarui"
            });
        } else {
            res.status(403).json({
                error: true,
                message: "Pengguna tidak ditemukan"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan server"
        });
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        // Mencari pengguna berdasarkan ID
        const user = await prisma.user.findUnique({
            where: {
                id_user: userId
            }
        });

        // Jika pengguna ditemukan, hapus akunnya
        if (user) {
            await prisma.user.delete({
                where: {
                    id_user: userId,
                },
            });

            res.json({
                error: false,
                message: "Akun berhasil dihapus",
            });
        } else {
            // Jika pengguna tidak ditemukan, kirim respons dengan status 404
            res.status(404).json({
                error: true,
                message: "Pengguna tidak ditemukan",
            });
        }
    } catch (error) {
        // Tangani kesalahan dan kirim respons dengan status 500
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan server",
        });
    }
};
