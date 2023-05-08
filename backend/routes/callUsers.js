import express from "express";
import Filter from "../data/filter.js";
import Driver from "../data/driver.js";

import pkg from 'pg'
const { Client } = pkg

const credentials = {
    user: 'postgres',
    host: 'activities-finder.cxsdr7lmdwcg.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'activities1',
    port: 5432,
}

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
    let userId = 1;
    let eventId = req.query.eventId;
    let userQueryInsert = {
        name: 'save-event',
        text: `INSERT INTO public.takes (user_id, event_id) VALUES ($1, $2) ON CONFLICT DO NOTHING;`,
        values: [userId, eventId]
    }
    const client = new Client(credentials);
    await client.connect();
    client.query(userQueryInsert, (error, results) => {
        if (error) throw error;
        res.status(200).send('Success')
        client.end();
    });
});

userRouter.delete('/', async (req, res) => {
    let userId = 1;
    let eventId = req.query.eventId;
    let userQueryDelete = {
        name: 'unsave-event',
        text: `DELETE from public.takes WHERE user_id = $1 AND event_id = $2`,
        values: [userId, eventId]
    }
    const client = new Client(credentials);
    await client.connect();
    client.query(userQueryDelete, (error, results) => {
        if (error) throw error;
        res.status(200).send('Success')
        client.end();
    });
});

userRouter.get('/', async (req, res) => {
    let userId = 1;
    let getSavedEventsQuery = {
        name: 'get-saved-events',
        text: `SELECT * from takes, events where takes.user_id = $1 AND takes.event_id = events.event_id;`,
        values: [userId]
    }
    const client = new Client(credentials);
    await client.connect();
    client.query(getSavedEventsQuery, (error, results) => {
        if (error) throw error;
        let driver = new Driver({}, results.rows);
        let returnArray = driver.transform(results.rows);
        res.status(200).json(returnArray);
        client.end();
    });
});

export default userRouter;