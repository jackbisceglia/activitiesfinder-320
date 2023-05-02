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
    let conditions = buildQuery(req.query);
    let sqlQuery = 'SELECT * from public.events' + conditions.text;
    let eventsQuery = {
        name: 'fetch-events',
        text: sqlQuery,
        values: conditions.values
    }
    const client = new Client(credentials);
    await client.connect();
    client.query(eventsQuery, (error, results) => {
        if (error) throw error
        //Only do scoring if has types
        if (typeof (req.query.type) !== 'undefined') {
            let type = req.query.type.toString().split(",");
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
        } else {
            let eventDriver = new Driver({}, results.rows);
            let returnArray = eventDriver.transform(results.rows);
            res.status(200).json(returnArray);
        }
        client.end();
    });
});

const buildQuery = (queryObj) => {
    let conditions = []
    let itr = 1;
    let values = []
    if (typeof (queryObj.location) !== 'undefined') {
        conditions.push(`event_town = ANY($${itr})`);
        values.push(queryObj.location.toString().split(","))
        itr += 1;
    }
    if (typeof (queryObj.area) !== 'undefined') {
        conditions.push(`event_area = ANY($${itr})`);
        values.push(queryObj.area.toString().split(","))
        itr += 1;
    }
    if (typeof (queryObj.type) !== 'undefined') {
        conditions.push(`($${itr} && event_tags) = true`);
        values.push(queryObj.type.toString().split(","))
        itr += 1;
    }
    return {
        text: conditions.length ? ' WHERE ' + conditions.join(' AND ') : '',
        values: values
    }
}

export default eventRouter;