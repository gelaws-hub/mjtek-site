import { Router } from 'express';
import { 
    registerUser, 
    login, 
    login2FA, 
    refreshToken, 
    generate2FAQRCode, 
    validate2FA, 
    getCurrentUser, 
    logoutUser,
    ensureAuthenticated,
    authorize 
} from '../auth/userController';

import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    role_id: number;
  };
}

const router = Router();

// REGISTER USER
router.post('/register', registerUser);

// LOGIN USER
router.post('/login', login);

// LOGIN 2FA
router.post('/login-2fa', login2FA);

// REFRESH TOKEN
router.post('/refresh-token', refreshToken);

// GENERATE 2FA QR CODE (Protected route - user must be authenticated)
router.get('/2fa/qrcode', ensureAuthenticated, generate2FAQRCode);

// VALIDATE 2FA (Protected route - user must be authenticated)
router.post('/2fa/validate', ensureAuthenticated, validate2FA);

// GET CURRENT USER (Protected route - user must be authenticated)
router.get('/me', ensureAuthenticated, getCurrentUser);

// LOGOUT USER (Protected route - user must be authenticated)
router.post('/logout', ensureAuthenticated, logoutUser);

// EXAMPLE ROUTE WITH ROLE-BASED AUTHORIZATION (Add roles based on your app's needs)
// Only accessible to users with role_id 1 (admin)
router.get('/admin', ensureAuthenticated, authorize([1]), (req, res) => {
  res.json({ message: 'Admin route accessed!' });
});

export default router;
