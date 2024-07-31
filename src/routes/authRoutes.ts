import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { generateTokensMiddleware } from '../middleware/token';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser, generateTokensMiddleware);

export default router;
