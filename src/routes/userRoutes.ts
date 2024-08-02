import { Router } from 'express';
import { getUsers, deleteUser, getUserById } from '../controllers/userController';
import { authenticateUser } from '../middleware/auth';

const router = Router();

router.get('/user/:id', getUserById);
router.get('/users', getUsers);
router.delete('/user/:id', authenticateUser, deleteUser);

export default router;
