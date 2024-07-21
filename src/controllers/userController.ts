import { Request, Response } from 'express';
import { prisma } from '../server'; 


export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
  
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }


    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    console.log('User exists:', userExists);

    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }


    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    console.log('Created user:', user);

    return res.status(201).json(user);
  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsers = async(req: Request, res: Response) => {

  const users = await prisma.user.findMany();
  return res.status(200).json(users);
} 