import Event from './event.js';
import Filter from './filter.js';

//User goes to search with a given filter
//Return list of events in descending order by score
function createDummyData(s) {

    const rand = (a, b) => Math.floor(Math.random() * (b - a) + a);
    let tagsList = ["Sports", "Music", "Educational"];
    let towns = ["Amherst", "Hadley", "Sunderland", "Northampton"];
    let buildings = ["Mullins", "STU", "Library"];
    let areas = ["Outdoors", "Indoors"];
    let events = [];

    for (let i = 0; i < s; ++i) {
        let location = { Town: towns[rand(0, 4)], Building: buildings[rand(0, 3)] };
        let numTags = rand(0, 3);
        let area_i = rand(0, 2);
        let tags = [];
        let used = new Set();
        let count = 0;
        while (count < numTags) {
            let idx = rand(0, 3);
            let tagToAdd = tagsList[idx];
            if (!used.has(tagToAdd)) {
                tags.push(tagToAdd);
                used.add(tagToAdd);
                count++;
            }
        }
        //format => eventId, title, time, location, eventUrl, imageUrl, tags, saves,area
        events.push(new Event(i, "Event" + i.toString(), rand(30, 40), location, "https://Github.com", "", tags, 0, areas[area_i]));
    }
    return events;
}


export default class Driver {

    constructor(filter) {
        this.filter = filter;
        let eventData = createDummyData(10);
        this.eventData = eventData;
    }

    getCompatibleEvents = () => {
        let compatibleEvents = [];
        for (let i = 0; i < this.eventData.length; ++i) {
            //Time is just some random arbitrary number right now
            let event = this.eventData[i];
            let score = event.getScore(this.filter);
            console.log("Score: ", score);
            if (score != -1) {
                compatibleEvents.push({ event: event, score: score });
            }
        }
        //Sort the list
        compatibleEvents.sort((a, b) => b.score - a.score);
        return compatibleEvents;
    }

    transform = (events) => {
        let retArr = []
        for (let e of events) {
            let event = new Event(e.event_id, e.event_name, { startTime: e.event_time, endTime: e.event_time }, { Town: e.event_town, Building: e.event_location }, e.event_link, '', e.event_tags, '', e.event_area)
            retArr.push(event)
        }
        return retArr;
    }

    getSortedEvents = () => {
        let compatibleEvents = this.getCompatibleEvents();
        console.log("Filter Tags: ");
        //console.log(filter.getTags());
        let res = [];
        for (let i = 0; i < compatibleEvents.length; ++i) {
            res.push(compatibleEvents[i].event);
        }
        return res;
    }

}

let driver = new Driver(new Filter({startTime:{day:0 ,hours:1 ,minutes:2 ,am:true }, endTime:{day:1 ,hours:2 ,minutes:3 ,am:false }},{Town:"Amherst", Building: " "}, [], "Indoors"));
console.log(driver.getSortedEvents());



