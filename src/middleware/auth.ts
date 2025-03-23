import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isTokenRevoked } from '../utils/token';



export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!) as jwt.JwtPayload;

    const isRevoked = await isTokenRevoked(token);
    if (isRevoked) {
      return res.status(403).json({ message: 'Token has been revoked' });
    }

    req.body.userId = decoded.userId;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(403).json({ message: 'Invalid token, authorization denied' });
  }
};
