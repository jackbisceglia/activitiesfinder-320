class Event {

    constructor(eventId, title, time, location, eventUrl, eventImage, tags){
        //mandatory
        this.eventId = eventId;
        this.title = title;
        this.time = time;
        this.location = location;
        this.eventUrl = eventUrl;
        //Optional
        this.tags = (tags === undefined)? [] : tags;
        this.eventImage = (eventImage === undefined)? new Image() : eventImage;
    }

    getTitle = () => this.title;

    getTime = () => this.time;
    
    getLocation = () => this.location;

    getUrl = () => this.eventUrl;

    getImage = () => this.image;
}


let e1 = new Event(0,"Test Event", "3:45" , {Town: "Amherst", Building:"Mullins"}, ["basketball", "fun"],"Github.com", undefined, undefined);
console.log(e1.getTitle());
console.log(e1.getTime());
console.log(e1.getLocation());
console.log(e1.getUrl());