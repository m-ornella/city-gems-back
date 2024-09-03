import { Request, Response } from 'express';
import { prisma } from '../server';
import { upload } from '../utils/multerConfig';


export const getAttractions = async (req: Request, res: Response) => {
    try {
        const attractions = await prisma.attraction.findMany({
            include: {
                images: true, 
            },
        });
        return res.status(200).json(attractions);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const createAttraction = async (req: Request, res: Response) => {


  try {
  
    const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path) || [];

 
    const { name, address, category_id, budget, website_link } = req.body;

    const categoryIdInt = parseInt(category_id, 10);

    const attraction = await prisma.attraction.create({
      data: {
        name,
        address,
        category_id: categoryIdInt,
        budget,
        website_link,
        images: {
          create: imageUrls.map(url => ({
            url,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return res.status(201).json(attraction);
  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



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
