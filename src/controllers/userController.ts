import { Request, Response } from 'express';
import { prisma } from '../server';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};