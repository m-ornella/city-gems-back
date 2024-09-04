import { Router } from 'express';
import { createAttraction, getAttractions, getAttractionById } from '../controllers/attractionController';
import { authenticateUser } from '../middleware/auth';
import { upload } from '../utils/multerConfig';

const router = Router();

router.get('/attractions', authenticateUser, getAttractions);
router.get('/attractions/:id', getAttractionById);
router.post('/attractions', upload.array('images', 10), authenticateUser, createAttraction);

export default router;
