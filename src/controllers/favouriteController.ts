import { Request, Response } from 'express';
import { prisma } from '../server';

export const addToFavourites = async (req: Request, res: Response) => {
    try {
        const { user, attraction } = req.body;

        if (!user || !attraction) {
            return res.status(400).json({ error: 'User ID and Attraction ID are required' });
        }

        const existingUser = await prisma.user.findUnique({ where: { id: user } });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingAttraction = await prisma.attraction.findUnique({ where: { id: attraction } });
        if (!existingAttraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }

        const favourite = await prisma.favourite.create({
            data: {
                user: {
                  connect: { id: user }
                },
                attraction: {
                  connect: { id: attraction }
                },
            }
        });

        return res.status(201).json(favourite);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error details:', error);
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            console.error('Unexpected error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const getFavourites = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      const favourites = await prisma.favourite.findMany({
        where: { user_id: userId },
        include: {
          attraction: true,
        },
      });
  
      return res.status(200).json(favourites);
    } catch (error) {
      console.error('Error fetching favourites:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };