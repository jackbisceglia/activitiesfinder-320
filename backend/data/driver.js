import Event from './event.js';
import Filter from './filter.js';

//User goes to search with a given filter
//Return list of events in descending order by score

let e1 = new Event(0, "Test Event", 41 , {Town: "Amherst", Building:" "}, "https://Github.com", undefined, ["basketball", "fun"], 0);
let e2 = new Event(0, "Game",41, {Town: "!Amherst", Building:"A"}, "https://Github.com", undefined, ["basketball", "garbage", "hello"], 0);
let e3 = new Event(0, "hockey", 41 , {Town: "Hadley", Building:" "}, "https://Github.com", undefined, ["hockey", "fun", "indoors"], 0);
let e4 = new Event(0, "Test Event", 41 , {Town: "Amherst", Building:" "}, "https://Github.com", undefined, [], 0);
let e5 = new Event(0, "Game", 41 , {Town: "!Amherst", Building:"A"}, "https://Github.com", undefined, ["garbage", "hello"], 0);
let e6 = new Event(0, "Test Event", 41 , {Town: "Amherst", Building:" "}, "https://Github.com", undefined, ["learning", "outdoors"], 0);




let eventData = [e1,e2,e3,e4,e5,e6];
let filter = new Filter({startTime: 34 , endTime: 40} , {Town: "Amherst", Building: " "}, ["basketball", "fan" , "hello"]);
let compatibleEvents = []; //{event: score:}

for (let i = 0; i < eventData.length; ++i) {
    let event = eventData[i];
    let score = event.getScore(filter);

    if (score != -1){
        compatibleEvents.push({event: event, score: score});
    }
}

//Sort the list
compatibleEvents.sort((a,b) => b.score - a.score);
console.log(compatibleEvents);
