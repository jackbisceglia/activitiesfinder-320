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

const eventRouter = express.Router();

eventRouter.get("/", async (req, res) => {
    let area = req.query.area;
    let type = req.query.type.split(',');
    let location = req.query.location;
    const eventsQuery = {
        name: 'fetch-events',
        text: `SELECT * from public.events WHERE event_town = $1 AND event_area = $2 AND ($3 && event_tags) = true;`,
        values: [location, area, type]
    }
    const client = new Client(credentials);
    await client.connect();
    client.query(eventsQuery, (error, results) => {
        if (error) throw error
        let eventArray = []
        for (let e of results.rows) {
            let tagsInCommon = e.event_tags.filter(value => type.includes(value))
            eventArray.push({ event: e, score: tagsInCommon.length })
        }
        eventArray.sort((a, b) => parseInt(b.score) - parseInt(a.score))
        let returnArray = eventArray.map(element => element.event)
        let eventDriver = new Driver({}, returnArray)
        returnArray = eventDriver.transform(returnArray);
        res.status(200).json(returnArray);
        client.end();
    });
});

export default eventRouter;