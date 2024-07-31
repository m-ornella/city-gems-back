import { Router } from 'express';
import { createRestaurants, getRestaurants } from '../controllers/restaurantController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.get('/restaurants', getRestaurants);
router.post('/restaurants',authenticateUser, createRestaurants);

export default router;