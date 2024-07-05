import express from "express";
import { getUsers, Login, Logout, Register, getUser, editProfile, Welcome, deleteAccount } from "../auth/userController";
import { verifyToken } from "../auth/verifyToken";
import { refreshToken } from "../auth/refreshToken";

const userRoutes = express.Router();

//user
userRoutes.get('/', Welcome);
userRoutes.post('/register', Register);
userRoutes.post('/login', Login);
userRoutes.get('/token', refreshToken);
userRoutes.post('/logout', Logout);
userRoutes.get('/users', verifyToken, getUsers);
userRoutes.get('/users/:id', verifyToken, getUser);
userRoutes.put('/profile/:id', verifyToken, editProfile);
userRoutes.post('/users/delete', verifyToken, deleteAccount);

export default userRoutes;
