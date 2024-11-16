import express from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/dummyaccount/userController';

const dummyUserRouter = express.Router();

dummyUserRouter.post('/users', createUser); // Create a new user
dummyUserRouter.get('/users/:id', getUserById); // Get a user by ID
dummyUserRouter.put('/users/:id', updateUser); // Update a user
dummyUserRouter.delete('/users/:id', deleteUser); // Delete a user
dummyUserRouter.get('/users', getAllUsers); // Get all users

export default dummyUserRouter;
