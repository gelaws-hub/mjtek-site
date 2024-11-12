// import { PrismaClient } from '@prisma/client';
// import jwt, { VerifyErrors } from 'jsonwebtoken';
// import { Request, Response } from 'express';

// const prisma = new PrismaClient();

// export const refreshToken = async (req: Request, res: Response) => {
//     try {
//         const refreshToken = req.cookies.refreshToken;
//         if (!refreshToken) return res.sendStatus(401);

//         const user = await prisma.user.findUnique({
//             where: {
//                 refresh_token: refreshToken
//             }
//         });

//         if (!user) return res.sendStatus(403);

//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: VerifyErrors | null, decoded: any) => {
//             if (err) return res.sendStatus(403);

//             const { username, email } = user;

//             const accessToken = jwt.sign({ username, email }, process.env.ACCESS_TOKEN_SECRET!, {
//                 expiresIn: '1h'
//             });

//             res.json({ accessToken });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };
