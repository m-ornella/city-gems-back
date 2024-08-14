import { Request, Response } from 'express';
import { prisma } from '../server';

export const getAttractionCategories = async (req: Request, res: Response) => {
    try {
        const attractionCategories = await prisma.attractionCategory.findMany();
        return res.status(200).json(attractionCategories);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const createAttractionCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const attractionCategory = await prisma.attractionCategory.create({
            data: {
                name
            }
        });
        return res.status(201).json(attractionCategory);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
