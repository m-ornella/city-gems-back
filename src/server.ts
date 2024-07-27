import express, { Request, Response } from 'express';
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import restaurantRoutes from './routes/restaurantRoutes';

export const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(express.json());


app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', restaurantRoutes);

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
console.log('Routes mounted');