import { Router } from 'express';
import { createRestaurants, getRestaurants, getRestaurantById } from '../controllers/restaurantController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.get('/restaurants', getRestaurants);
router.get('/restaurants/:id', getRestaurantById);
router.post('/restaurants',authenticateUser, createRestaurants);

export default router;