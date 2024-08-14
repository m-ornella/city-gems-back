import { Request, Response } from 'express';
import { prisma } from '../server';

// Get all attractions
export const getAttractions = async (req: Request, res: Response) => {
    try {
        const attractions = await prisma.attraction.findMany();
        return res.status(200).json(attractions);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Create a new attraction
export const createAttraction = async (req: Request, res: Response) => {
    try {
        const { name, address, category_id, budget, website_link } = req.body;
        const attraction = await prisma.attraction.create({
            data: {
                name,
                address,
                category_id,
                budget,
                website_link
            }
        });
        return res.status(201).json(attraction);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Get an attraction by ID
export const getAttractionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const attraction = await prisma.attraction.findUnique({ where: { id: Number(id) } });
        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        return res.status(200).json(attraction);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
