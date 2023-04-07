import express from "express";
import Filter from "../data/filter.js";
import Driver from "../data/driver.js";


const eventRouter = express.Router();


eventRouter.get("/", async (req, res) => {
    let filter = new Filter({startTime: 32 , endTime: 38} , {Town: "Hadley", Building: " "}, ["Educational", "Sports"], "None");
    let driver = new Driver(10, filter);
    let comp_events = driver.getCompatibleEvents();
    let returnArr = driver.getSortedEvents(comp_events , filter);
    res.json(returnArr);
});

export default eventRouter;