import express from 'express';
import { 
    registerUser,
    activateUser, 
    login,
    requestResetPassword,
    resetPassword,  
    refreshToken,
    getCurrentUser, 
    logoutUser,
    ensureAuthenticated,
    authorize,
    validateSession
} from '../auth/userController';

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

// LOGOUT USER (Protected route - user must be authenticated)
userRoutes.post('/logout', ensureAuthenticated, logoutUser);

// EXAMPLE ROUTE WITH ROLE-BASED AUTHORIZATION (Add roles based on your app's needs)
// Only accessible to users with admin role
userRoutes.get('/admin', ensureAuthenticated, authorize(["admin"]), (req, res) => {
  res.json({ message: 'Admin route accessed!' });
});

userRoutes.get("/validate-session", ensureAuthenticated, validateSession);

export default userRoutes