import { Router } from 'express';
import { getAttractionCategories, createAttractionCategory } from '../controllers/attractionCategoryController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.get('/attraction-categories', getAttractionCategories);
router.post('/attraction-categories', authenticateUser, createAttractionCategory);

export default router;
