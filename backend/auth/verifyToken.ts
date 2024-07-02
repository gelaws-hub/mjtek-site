import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define a custom interface extending Express Request interface
interface CustomRequest extends Request {
    email?: string; // Add email property to Request object
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.sendStatus(403);
        }
        
        // If decoding is successful, add decoded data to request object
        if (decoded && decoded.email) {
            req.email = decoded.email; // Assign decoded email to req.email
        }

        next();
    });
};
