import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (request, response) => {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    const trx = await db.transaction();
    
    try {
        const [user_id] = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        });

        const [class_id] = await trx('classes').insert({
            subject,
            cost,
            user_id
        });

        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to)
            };
        });

        await trx('class_schedule').insert(classSchedule);

        await trx.commit();

        return response.status(201).send();
    } catch (err) {
        console.log(err);

        await trx.rollback();

        return response.status(400).json({
            error: 'Unexpected error while creating new class'
        });
    }
});

export default routes;
