import express, { Request, Response } from 'express';
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import attractionRoutes from './routes/attractionRoutes';
import attractionCategoryRoutes from './routes/attractionCategoryRoutes';
import favouriteRoutes from './routes/favouriteRoutes';
import { authenticateUser } from './middleware/auth';

export const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(express.json());

// Mounting routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', attractionRoutes);
app.use('/api', attractionCategoryRoutes);
app.use('/api', authenticateUser, favouriteRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!!');
});

app.listen(port, (err?: Error) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Example app listening on port ${port}`);
    console.log('Routes mounted');
  }
});
