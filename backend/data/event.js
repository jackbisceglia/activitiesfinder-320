class Event {

    constructor(eventId, title, time, location, eventUrl, eventImage, tags){
        //mandatory
        this.eventId = eventId; //number
        this.title = title; //String
        this.time = time; //String
        this.location = location; //Location object (JSON)
        this.eventUrl = eventUrl; //String

        //Optional
        this.tags = (tags === undefined)? [] : tags; //array
        this.eventImage = (eventImage === undefined)? new Image() : eventImage; //Image object (JSON)
    }

    getEventId = () => this.eventId;
    setEventId = (newId) => {this.eventId = newId};

    getTitle = () => this.title;
    setTitle = (newTitle) => {this.title = newTitle};

    getTime = () => this.time;
    setTime = (newTime) => {this.time = newTime};
    
    getLocation = () => this.location;
    setLocation = (newLocation) => {this.location = newLocation};

    getUrl = () => this.eventUrl;
    setUrl = (newUrl) => {this.Url = newUrl};

    getImage = () => this.image;
    setImage = (newImg) => {this.image = newImg};
}

let e1 = new Event(0,"Test Event", "3:45" , {Town: "Amherst", Building:"Mullins"}, ["basketball", "fun"],"Github.com", undefined, undefined);
console.log(e1.getEventId());
e1.setEventId(11);
console.log(e1.getEventId());
console.log(e1.getTitle());
console.log(e1.getTime());
console.log(e1.getLocation());
console.log(e1.getUrl());