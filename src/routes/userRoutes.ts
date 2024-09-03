import { Router } from 'express';
import { getUsers, deleteUser, getUserById } from '../controllers/userController';
import { authenticateUser } from '../middleware/auth';
import { prisma } from '../server';

const router = Router();

router.get('/user/:id', authenticateUser, getUserById);
router.get('/users', getUsers);
router.delete('/user/:id', authenticateUser, deleteUser);
router.get('/current', authenticateUser, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.body.userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
