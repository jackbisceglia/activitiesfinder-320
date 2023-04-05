import express from "express";
import Filter from "../data/filter.js";
import Driver from "../data/driver.js";


const eventRouter = express.Router();


eventRouter.get("/", async (req, res) => {
    let filter = new Filter({startTime: 32 , endTime: 38} , {Town: "Amherst", Building: " "}, ["basketball", "fan" , "hello", "reading", "food", "active"]);
    let driver = new Driver(10, filter)

    let events = driver.getCompatibleEvents();
    let returnString = "";
    for (let i = 0; i < events.length; ++i) {
        returnString += events[i].event.print();
        console.log("");
    }


    res.send(returnString);
});

export default eventRouter;