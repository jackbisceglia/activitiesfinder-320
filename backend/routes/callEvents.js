import express from "express";
import Filter from "../data/filter.js";
import Driver from "../data/driver.js";


const eventRouter = express.Router();

let filter = new Filter({startTime: 32 , endTime: 38} , {Town: "Amherst", Building: " "}, ["basketball", "fan" , "hello", "reading", "food", "active"]);
let driver = new driver(10, filter)

events = driver.getCompatibleEvents();
returnString = driver.print(events)
eventRouter.get("/", async (req, res) => 
    res.send(returnString);
);

export default eventRouter;