import { Router } from 'express';
import { createRestaurants, getRestaurants } from '../controllers/restaurantController';

const router = Router();

router.get('/restaurants', getRestaurants);
router.post('/restaurants', createRestaurants);

export default router;