import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { generateTokensMiddleware } from '../middleware/token';
import { logoutUser } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser, generateTokensMiddleware);
router.post('/login', loginUser, generateTokensMiddleware);
router.post('/logout', logoutUser);

export default router;
