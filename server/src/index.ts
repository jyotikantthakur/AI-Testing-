import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

import userRoutes from './routes/users';
import applicationRoutes from './routes/applications';
import aiRoutes from './routes/ai';
import { prisma } from './prisma';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/ai', aiRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Agentic Job Tracker API is running' });
});

// Setup cron job for the daily time-bound reminder (Feature 22)
// This simulates scanning for users whose reminderTime matches the current hour/minute
cron.schedule('* * * * *', async () => {
    const now = new Date();
    const currentHourMin = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    try {
        const usersToRemind = await prisma.user.findMany({
            where: { reminderTime: currentHourMin },
            include: {
                missions: { where: { date: new Date(new Date().setHours(0, 0, 0, 0)) } },
                applications: {
                    where: { status: 'Interviewing' }
                }
            }
        });

        for (const user of usersToRemind) {
            const todayMission = user.missions[0];
            console.log(`\n[CRON - FEATURE 22] Sending daily summary to ${user.email}`);
            console.log(`- Daily Target Progress: ${todayMission ? todayMission.completed : 0}/${user.dailyApplicationGoal}`);
            console.log(`- Upcoming Interviews: ${user.applications.length}`);
            // In production, send with Resend/Nodemailer here
        }
    } catch (error) {
        console.error('[CRON ERROR]', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
