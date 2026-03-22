import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /api/users/:id - Get a user profile
router.get('/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            include: {
                missions: {
                    where: {
                        date: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST /api/users - Create a new user mockup
router.post('/', async (req, res) => {
    try {
        const { email, name } = req.body;
        const user = await prisma.user.create({
            data: { email, name }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// PATCH /api/users/:id/settings - Update user settings
router.patch('/:id/settings', async (req, res) => {
    try {
        const { dailyApplicationGoal, reminderTime } = req.body;
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: { dailyApplicationGoal, reminderTime }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user settings' });
    }
});

export default router;
