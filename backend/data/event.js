class Event {

    constructor(eventId, title, time, location, eventUrl, eventImage, tags, saves){
        //mandatory
        if(eventId === undefined || title === undefined || time === undefined || location === undefined || eventUrl === undefined || saves === undefined){
            throw new Error("A Mandatory Parameter is Undefined");
        }
        this.eventId = eventId; //number
        this.title = title; //String
        this.time = time; //String
        this.location = location; //Location object (JSON) => {town: "Amherst" , building: "Mullins"}
        this.eventUrl = eventUrl; //String
        this.saves = saves; //number

        //Optional
        this.tags = (tags === undefined)? [] : tags; //array
        this.eventImage = (eventImage === undefined)? {} : eventImage; //Image object (JSON)
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

    getSaves = () => this.saves;
    incrementSaves = () => {this.saves++};
    decrementSaves = () => {this.saves--};

    getTags = () => this.tags;
    setTags = (newTags) => {this.tags = newTags};

    addTag = (TagToAdd) => {this.tags.push(TagToAdd)};
    removeTag = (TagToRemove) => { this.tags = this.tags.filter(x => x !== TagToRemove); };
}

// eventId, title, time, location, eventUrl, eventImage, tags, saves
let e1 = new Event(5, "Test Event", "3:45" , {Town: "Amherst", Building:"Mullins"}, "https://Github.com", undefined, ["basketball", "fun"], 0);
console.log(e1.getEventId());
e1.setEventId(11);
console.log(e1.getEventId());
console.log(e1.getTitle());
console.log(e1.getTime());
console.log(e1.getLocation());
console.log(e1.getUrl());
console.log(e1.getTags());
e1.removeTag("basketball");
console.log(e1.getTags());