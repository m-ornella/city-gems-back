import { Router } from 'express';
import { createAttraction, getAttractions, getAttractionById } from '../controllers/attractionController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.get('/attractions', getAttractions);
router.get('/attractions/:id', getAttractionById);
router.post('/attractions', authenticateUser, createAttraction);

export default router;
