import { Router } from 'express';
import { getFoodTypes, createFoodType } from '../controllers/foodTypeController';

const router = Router();

router.get('/food-types', getFoodTypes);
router.post('/food-types', createFoodType);

export default router;