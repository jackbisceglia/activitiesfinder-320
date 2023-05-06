export default class Event {

    constructor(eventId, title, dateTime, location, eventUrl, imageUrl, tags, saves, area) {

        if (eventId === undefined || title === undefined || dateTime === undefined || location === undefined || eventUrl === undefined) {
            throw new Error("A Mandatory Parameter is Undefined");
        }

        //mandatory
        this.eventId = eventId; //number
        this.title = title; //String
        this.dateTime = dateTime; // {day: ,hours: ,minutes: ,am: }
        this.location = location; //{Town: " " , Building: " "}
        this.eventUrl = eventUrl; //String
        this.saves = saves; //number
        this.area = area; //String

        //Optional
        this.tags = (tags === undefined) ? [] : tags; //Array<String>
        this.imageUrl = imageUrl; //String
    }

    getEventId = () => this.eventId; 
    setEventId = (newId) => { this.eventId = newId }; 

    getTitle = () => this.title; 
    setTitle = (newTitle) => { this.title = newTitle };

    getTime = () => this.dateTime;
    setTime = (newTime) => { this.dateTime = newTime };

    getSeconds = () => {
        return Date.parse(this.dateTime.day + " Apr 2023 " + ( this.dateTime.am? this.dateTime.hours:(this.dateTime.hours+12) % 24) + 
        ":" + this.dateTime.minutes + ":00 EST");
    }

    getLocation = () => this.location;
    setLocation = (newLocation) => { this.location = newLocation };

    getUrl = () => this.eventUrl;
    setUrl = (newUrl) => { this.Url = newUrl };

    getImageUrl = () => this.imageUrl;
    setImageUrl = (newUrl) => { this.newUrl = newUrl };

    getSaves = () => this.saves;
    setSaves = (newCount) => { this.saves = newCount };
    incrementSaves = () => { this.saves++ };
    decrementSaves = () => { this.saves-- };

    getArea = () => this.area;
    setArea = (newArea) => { this.area = newArea };

    getTags = () => this.tags;
    setTags = (newTags) => { this.tags = newTags };
    addTag = (TagToAdd) => { this.tags.push(TagToAdd) };
    removeTag = (TagToRemove) => { this.tags = this.tags.filter(x => x !== TagToRemove); };

    isCompatible = (filter) => {
        let status = 1;
        if (this.getSeconds() < filter.getStartSeconds() || this.getSeconds() > filter.getEndSeconds()) {
            console.log("Time out of range");
            status--;
        }

        if (filter.getLocation().Town !== this.getLocation().Town) {
            console.log("Filter town: " + filter.getLocation().Town + " Event town: " + this.getLocation().Town);
            status--;
        }

        if (filter.getArea() !== "None" && filter.getArea() !== this.getArea()) {
            console.log("Area doesn't match");
            status--;
        }

        return status;
    }

    getScore = (filter) => {
        let status = this.isCompatible(filter);
        let score = 1;

        if (status < 0) {return -1;}
        //Score of 0 indicates its almost compatible
        else if (status === 0) {return 0}

        const filter_set = new Set();
        let temp = filter.getTags();
        for (let i = 0; i < temp.length; ++i) {
            filter_set.add(JSON.stringify(temp[i]));
        }

        
        let arr = this.getTags();
        for (let i = 0; i < arr.length; ++i) {
            if (filter_set.has(JSON.stringify(arr[i]))) {
                score++;
            }
        }
        return score;
    }

    print = () => {
        console.log("Event ID: " + this.eventId);
        console.log("Title: " + this.title);
        console.log("Time: " + this.time);
        console.log("Location: " + this.location.Building + ", " + this.location.Town);
        console.log("Tags: " + this.tags);
    }
}