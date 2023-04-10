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


// eventRouter.get("/", async (req, res) => {
//     let filter = new Filter({ startTime: 32, endTime: 38 }, { Town: "Hadley", Building: " " }, ["Educational", "Sports"], "None");
//     let driver = new Driver(10, filter);
//     let comp_events = driver.getCompatibleEvents();
//     let returnArr = driver.getSortedEvents(comp_events, filter);
//     res.json(returnArr);
// });

eventRouter.get("/", async (req, res) => {
    // Need to set filter from req params
    let filter = new Filter({ startTime: 0, endTime: 100 }, { Town: "Amherst", Building: " " }, ["educational", "sports", "indoors"], "None");
    const client = new Client(credentials);
    await client.connect();
    client.query('SELECT * from public.events;', (error, results) => {
        if (error) throw error
        let driver = new Driver(filter, results.rows);
        let comp_events = driver.getCompatibleEvents();
        let returnArr = driver.getSortedEvents(comp_events, filter);
        res.status(200).json(returnArr);
        client.end();
    });
});


export default eventRouter;