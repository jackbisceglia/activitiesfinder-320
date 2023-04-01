import Event from './event.js';
import Filter from './filter.js';

//User goes to search with a given filter
//Return list of events in descending order by score

// let e1 = new Event(0, "Test Event", 41 , {Town: "Amherst", Building:" "}, "https://Github.com", undefined, ["basketball", "fun"], 0);
// let e2 = new Event(0, "Game",41, {Town: "!Amherst", Building:"A"}, "https://Github.com", undefined, ["basketball", "garbage", "hello"], 0);
// let e3 = new Event(0, "hockey", 41 , {Town: "Hadley", Building:" "}, "https://Github.com", undefined, ["hockey", "fun", "indoors"], 0);
// let e4 = new Event(0, "Test Event", 41 , {Town: "Amherst", Building:" "}, "https://Github.com", undefined, [], 0);
// let e5 = new Event(0, "Game", 41 , {Town: "!Amherst", Building:"A"}, "https://Github.com", undefined, ["garbage", "hello"], 0);
// let e6 = new Event(0, "Test Event", 41 , {Town: "Amherst", Building:" "}, "https://Github.com", undefined, ["learning", "outdoors"], 0);
//let eventData = [e1,e2,e3,e4,e5,e6];

const rand = (a,b) => Math.floor(Math.random()*(b-a)+a);

let tagsList = ["outdoors","indoors", "sports", "educational", "reading", "community", "active", "sitting down", "food"];
let towns = ["Amherst", "Hadley"];
let buildings = ["Mullins","STU", "Library"];
let events = []

for (let i = 0; i < 10; ++i){
    let location = {Town: towns[rand(0,2)], Building: buildings[rand(0,3)]};

    let numTags = rand(0,5);
    let tags = [];
    let used = new Set();
    for (let j = 0; j < numTags; ++j) {
        let tagToAdd = tagsList[rand(0,10)];
        if (!used.has(tagToAdd)){
            tags.push(tagToAdd);
            used.add(tagToAdd)
        }
        
    }

    //let e1 = new Event(0, "Test Event", 41 , {Town: "Amherst", Building:" "}, "https://Github.com", undefined, ["basketball", "fun"], 0);
    events.push(new Event(i,"Event" + i.toString(),rand(30,40),location, "https://Github.com", undefined, tags, 0));
}


let filter = new Filter({startTime: 32 , endTime: 38} , {Town: "Amherst", Building: " "}, ["basketball", "fan" , "hello", "reading", "food", "active"]);
let compatibleEvents = []; //{event: score:}



//console.log(events)

for (let i = 0; i < events.length; ++i) {
    let event = events[i];
    //console.log(event)
    let score = event.getScore(filter);

    console.log(score);
    if (score != -1){
        compatibleEvents.push({event: event, score: score});
    }
}



//Sort the list
compatibleEvents.sort((a,b) => b.score - a.score);
console.log("Compatible Events:")
for (let i = 0; i < compatibleEvents.length; ++i) {
    compatibleEvents[i].event.print();
    console.log("");
}

console.log(filter.getTags());
//console.log("Rand between 30 and 40 " + rand(30,40).toString())
