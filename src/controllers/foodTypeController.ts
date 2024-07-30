import { Request, Response } from 'express';
import { prisma } from '../server';


export const getFoodTypes = async (req: Request, res: Response) => {
    try {
        const foodTypes = await prisma.foodType.findMany();
        return res.status(200).json(foodTypes);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const createFoodType = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const foodType = await prisma.foodType.create({
            data: {
                name
            }
        });
        return res.status(201).json(foodType);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}