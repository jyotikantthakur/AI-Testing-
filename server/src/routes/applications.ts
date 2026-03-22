import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /api/applications?userId=... - List applications
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;

        const userId = req.query.userId || 'guest';

        // Auto-create guest for local testing if not exists
        await prisma.user.upsert({
            where: { id: 'guest' },
            update: {},
            create: { id: 'guest', email: 'guest@local.com', name: 'Guest User' }
        });

        const applications = await prisma.jobApplication.findMany({
            where: {
                userId: String(userId),
                ...(status ? { status: String(status) } : {})
            },
            orderBy: { lastUpdate: 'desc' }
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// POST /api/applications - Create a new application
router.post('/', async (req, res) => {
    try {
        const { companyName, jobTitle, jobUrl, location, salaryRange, status, notes, hrEmail, technology, feedback, platform } = req.body;
        const userId = req.body.userId || 'guest';

        const app = await prisma.jobApplication.create({
            data: {
                userId,
                companyName,
                jobTitle,
                jobUrl,
                location,
                salaryRange,
                status: status || 'Applied',
                notes,
                hrEmail,
                technology,
                feedback,
                platform,
                appliedDate: new Date()
            }
        });

        // If a new app is created, increment today's daily mission
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (user) {
            await prisma.dailyMission.upsert({
                where: { userId_date: { userId, date: today } },
                update: { completed: { increment: 1 } },
                create: {
                    userId,
                    date: today,
                    target: user.dailyApplicationGoal,
                    completed: 1
                }
            });
        }

        res.json(app);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create application' });
    }
});

// PATCH /api/applications/:id/status - Update app status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const app = await prisma.jobApplication.update({
            where: { id: req.params.id },
            data: { status, lastUpdate: new Date() }
        });
        res.json(app);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update status' });
    }
});

export default router;
