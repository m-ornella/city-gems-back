import express, { Request, Response } from 'express';
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';


export const prisma = new PrismaClient();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the user routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

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