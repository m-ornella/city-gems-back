import { Request, Response } from 'express';
import { prisma } from '../server';

export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        return res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const createRestaurants = async (req: Request, res: Response) => {
    try {
        const { name, address, category_id, budget, website_link } = req.body;
        const restaurant = await prisma.restaurant.create({
            data: {
                name,
                address,
                category_id,
                budget,
                website_link
            }
        });
        return res.status(201).json(restaurant);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}