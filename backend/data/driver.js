import Event from './event.js';
import Filter from './filter.js';

//User goes to search with a given filter
//Return list of events in descending order by score

class Driver{

    constructor(eventData , filter){
        this.eventData = eventData;
        this.filter = filter;
    }

    getCompatibleEvents = () => {
        let compatibleEvents = [];
        for (let i = 0; i < eventData.length; ++i) {
            let event = eventData[i];
            //console.log(event)
            let score = event.getScore(filter);
            console.log("Score: " , score);
            if (score != -1){
                compatibleEvents.push({event: event, score: score});
            }
        }
        //Sort the list
        compatibleEvents.sort((a,b) => b.score - a.score);
        return compatibleEvents;
    }
}



// ======================= TESTING ========================= //

const createDummyData = (size) =>{

    const rand = (a,b) => Math.floor(Math.random()*(b-a)+a);
    let tagsList = ["outdoors","indoors", "sports", "educational", "reading", "community", "active", "sitting down", "food"];
    let towns = ["Amherst", "Hadley"];
    let buildings = ["Mullins","STU", "Library"];
    let events = [];

    for (let i = 0; i < size; ++i){
        let location = {Town: towns[rand(0,2)], Building: buildings[rand(0,3)]};
        let numTags = rand(1,5);
        let tags = [];
        let used = new Set();
        let count = 0;
        while(count < numTags) {
            let tagToAdd = tagsList[rand(0,10)];
            if (!used.has(tagToAdd)){
                tags.push(tagToAdd);
                used.add(tagToAdd);
                count++;
            } 
        }
        events.push(new Event(i,"Event" + i.toString(), rand(30,40), location, "https://Github.com", undefined, tags, 0));
    }
    return events;
}

const printSortedEvents = (compatibleEvents , filter) =>{
    console.log("Compatible Events:");
    for (let i = 0; i < compatibleEvents.length; ++i) {
        compatibleEvents[i].event.print();
        console.log("");
    }
    console.log("Filter Tags: ");
    console.log(filter.getTags());
}

let filter = new Filter({startTime: 32 , endTime: 38} , {Town: "Amherst", Building: " "}, ["basketball", "fan" , "hello", "reading", "food", "active"]);
let eventData = createDummyData(10);
let drive = new Driver(eventData , filter);
let compatibleEvents = drive.getCompatibleEvents(); //{event: , score:}
printSortedEvents(compatibleEvents , filter);