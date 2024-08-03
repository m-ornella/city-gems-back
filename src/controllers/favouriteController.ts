import { Request, Response } from 'express';
import { prisma } from '../server';

export const addToFavourites = async (req: Request, res: Response) => {
    try {
        const { user, restaurant } = req.body;
        const favourite = await prisma.favourite.create({
            data: {
                user: {
                  connect: { id: user }
                },
                restaurant: {
                  connect: { id: restaurant }
                },
            }
        });
        return res.status(201).json(favourite);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint failed on the constraint')) {
                return res.status(400).json({ error: 'Already added to favourites' });
            }
            console.error('Error details:', error);
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            console.error('Unexpected error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};
