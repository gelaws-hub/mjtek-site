import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request, Response } from 'express';

export const Welcome = (req: Request, res: Response) => {
    res.send("Welcome to NutriZen API!");
};

export const Register = async (req: Request, res: Response) => {
    const { name, email, password, confPassword } = req.body;

    // Memeriksa apakah password sesuai
    if (password !== confPassword) {
        return res.status(400).json({
            error: true,
            message: "Password tidak sesuai",
        });
    }

    try {
      // Memeriksa apakah email sudah dipakai sebelumnya
        const existingUser = await Users.findOne({
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
    
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
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

        const user = await Users.findOne({
            where: {
                email: email,
            },
            attributes: ['id', 'name', 'email', 'password', 'photoUrl', 'birthDate', 'age', 'gender', 'weight', 'height', 'activity', 'goal', 'isDataCompleted'],
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

        const userId = user.id;
        const name = user.name;
        const photoUrl = user.photoUrl;
        const birthDate = user.birthDate;
        const age = user.age;
        const gender = user.gender;
        const weight = user.weight;
        const height = user.height;
        const activity = user.activity;
        const goal = user.goal;
        const isDataCompleted = user.isDataCompleted;

        const accessToken = jwt.sign({ name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '180d',
        });

        const refreshToken = jwt.sign({ name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '180d',
        });

        // Update refreshToken pada database
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
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
                name,
                photoUrl,
                birthDate,
                age,
                gender,
                weight,
                height,
                activity,
                goal,
                isDataCompleted,
                token: accessToken
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const Logout = async(req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(204);
        const userId = user[0].id;
        await Users.update({refresh_token: null},{
            where:{
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}

export const getUsers = async(req: Request, res: Response) => {
    try {
        const users = await Users.findAll();
        res.json({
            error: false,
            users: users});
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        // Mengambil ID pengguna dari parameter permintaan
        const userId = req.params.id;

        // Mencari pengguna berdasarkan ID
        const user = await Users.findByPk(userId);

        // Jika pengguna ditemukan, kirimkan data pengguna sebagai respons JSON
        if (user) {
            res.json({
                error: false,
                userData: user
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
        const userId = req.params.id;

        const user = await Users.findOne({
            where: {
                id: userId
            }
        });

        if (user) {
            const { photoUrl, birthDate, age, gender, weight, height, activity, goal } = req.body;

            await Users.update(
                {
                    photoUrl,
                    birthDate,
                    age,
                    gender,
                    weight,
                    height,
                    activity,
                    goal,
                    isDataCompleted: true
                },
                {
                    where: {
                        id: userId
                    }
                }
            );

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
        const user = await Users.findByPk(userId);

        // Jika pengguna ditemukan, hapus akunnya
        if (user) {
            await Users.destroy({
                where: {
                    id: userId,
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