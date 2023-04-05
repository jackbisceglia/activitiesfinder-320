export default class Event {

    constructor(eventId, title, time, location, eventUrl, eventImage, tags, saves){
        if(eventId === undefined || title === undefined || time === undefined || location === undefined || eventUrl === undefined){
            throw new Error("A Mandatory Parameter is Undefined");
        }
        //mandatory
        this.eventId = eventId; //number
        this.title = title; //String
        this.time = time; // {Month: day: , hour: minute:}
        this.location = location; //Location object (JSON)
        this.eventUrl = eventUrl; //String
        this.saves = saves; //number

        //Optional
        this.tags = (tags === undefined)?[]: tags;
        this.eventImage = (eventImage === undefined)? {}: eventImage;
        // this.eventUrl = (eventUrl === undefined)? "" : eventUrl;
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
    setSaves = (newCount) => {this.saves = newCount};
    incrementSaves = () => {this.saves++};
    decrementSaves = () => {this.saves--};

    getTags = () => this.tags;
    setTags = (newTags) => {this.tags = newTags};
    addTag = (TagToAdd) => {this.tags.push(TagToAdd)};
    removeTag = (TagToRemove) => { this.tags = this.tags.filter(x => x !== TagToRemove); };

    isCompatible = (filter) => {
        if (this.getTime() < filter.getTime().startTime || this.getTime() > filter.getTime().endTime) {
            //console.log("Time out of range");
            return false;
        }
        if (filter.getLocation().Town !== this.getLocation().Town) {
            //console.log("Location out of range");
            return false;
        }
        return true;
    }

    getScore = (filter) => {
        if (!this.isCompatible(filter)) {return -1; }
        
        const filter_set = new Set();
        let temp = filter.getTags();
        for (let i = 0; i < temp.length; ++i){
            filter_set.add(temp[i]);
        }

        let score = 0;
        let arr = this.getTags();
        for (let i = 0; i < arr.length; ++i){
            if(filter_set.has(arr[i])){
                score++;
            }
        }
        return score;
    }

    print = () => {
        let returnString = "";
        
        // console.log("Event ID: " + this.eventId);
        // console.log("Title: " + this.title);
        // console.log("Time: " + this.time);
        // console.log("Location: " + this.location.Building + ", " + this.location.Town);
        // console.log("Tags: " + this.tags);

        returnString += "Event ID: " + this.eventId;
        returnString += "\nTitle: " + this.title;
        returnString += "\nTime: " + this.time;
        returnString += "\nLocation: " + this.location.Building + ", " + this.location.Town;
        returnString += "\nTags: " + this.tags
        return returnString;

    }
}