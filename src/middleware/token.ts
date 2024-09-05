import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken, validateToken } from '../utils/token';


export const generateTokensMiddleware = (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not found' });
    }

    const jti = jwt.sign({}, process.env.JWT_REFRESH_KEY!, { expiresIn: '1s' });
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId, jti);

    res.json({
      accessToken,
      refreshToken,
      id: userId,
      firstName,
      lastName,
    });
    
  } catch (error) {
    console.error('Error generating tokens:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};