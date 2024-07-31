import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Generate access token
function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_KEY!, {
    expiresIn: '5m',
  });
}

// Generate refresh token
function generateRefreshToken(userId: number, jti: string) {
  return jwt.sign({ userId, jti }, process.env.JWT_REFRESH_KEY!, {
    expiresIn: '8h',
  });
}

export const generateTokensMiddleware = (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not found' });
    }

    const jti = jwt.sign({}, process.env.JWT_REFRESH_KEY!, { expiresIn: '1s' });
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId, jti);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error generating tokens:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};