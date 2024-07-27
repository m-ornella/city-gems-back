import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../server';
import bcrypt from 'bcryptjs';

// Generate access token
function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '5m', // Token expires in 5 minutes
  });
}

// Generate refresh token
function generateRefreshToken(userId: number, jti: string) {
  return jwt.sign({ userId, jti }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '8h',
  });
}

// Middleware to handle token generation and response
export const generateTokensMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
  
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

   
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const jti = jwt.sign({}, process.env.JWT_REFRESH_SECRET!, { expiresIn: '1s' }); // Generate a unique identifier for refresh token
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id, jti);
    
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error generating tokens:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
