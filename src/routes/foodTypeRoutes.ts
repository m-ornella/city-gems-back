import { Router } from 'express';
import { getFoodTypes, createFoodType } from '../controllers/foodTypeController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.get('/food-types', getFoodTypes);
router.post('/food-types',authenticateUser, createFoodType);

export default router;