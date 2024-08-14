import { Router } from 'express';
import { getAttractionCategories, createAttractionCategory } from '../controllers/attractionCategoryController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// Routes for handling attraction categories
router.get('/attraction-categories', getAttractionCategories);
router.post('/attraction-categories', authenticateUser, createAttractionCategory);

export default router;
