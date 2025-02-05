import express from 'express';
import { 
    registerUser,
    activateUser, 
    login,
    requestResetPassword,
    resetPassword,
    requestChangePassword,  
    refreshToken,
    getCurrentUser, 
    logoutUser,
    ensureAuthenticated,
    authorize,
    validateSession
} from '../auth/userController';

import { createRole, getAllRoles, getRoleById, updateRole, deleteRole } from '../auth/roleController';
import { getUsers } from '../auth/BuyerController';

const userRoutes = express.Router();

// REGISTER USER
userRoutes.post('/register', registerUser);

// ACTIVATE USER
userRoutes.post('/activate', activateUser);

// LOGIN USER
userRoutes.post('/login', login);

// RESET PASSWORD REQUEST
userRoutes.post('/request-reset-password', requestResetPassword);

// SAVE NEW PASSWORD
userRoutes.post('/reset-password', resetPassword);

// REFRESH TOKEN
userRoutes.post('/refresh-token', refreshToken);

// GET CURRENT USER (Protected route - user must be authenticated)
userRoutes.get('/me', ensureAuthenticated, getCurrentUser);

userRoutes.get('/users', ensureAuthenticated, authorize(["admin", "owner"]), getUsers);

// CHANGE PASSWORD
userRoutes.post('/change-password', ensureAuthenticated,requestChangePassword);

// LOGOUT USER (Protected route - user must be authenticated)
userRoutes.post('/logout', ensureAuthenticated, logoutUser);

// EXAMPLE ROUTE WITH ROLE-BASED AUTHORIZATION (Add roles based on your app's needs)
// Only accessible to users with role_id 1 (admin)
userRoutes.get('/admin', ensureAuthenticated, authorize(["admin"]), (req, res) => {
  res.json({ message: 'Admin route accessed!' });
});

userRoutes.post('/role', createRole);
userRoutes.get('/role', getAllRoles);
userRoutes.get('/role/:id', getRoleById);
userRoutes.put('/role/:id', updateRole);
userRoutes.delete('/role/:id', deleteRole);

userRoutes.get("/validate-session", ensureAuthenticated, validateSession);

export default userRoutes