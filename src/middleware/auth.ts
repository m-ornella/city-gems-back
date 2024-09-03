import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  jwt.verify(token, process.env.JWT_KEY!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token, authorization denied' });
    }

   
    req.body.userId = (decoded as any).userId;
    next();
  });
};
