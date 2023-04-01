import Filter from './filter.js';

export default class Event {

    constructor(eventId, title, time, location, eventUrl, eventImage, tags, saves){
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

    getTags = () => this.tags;
    setTags = (newTags) => {this.tags = newTags};

    addTag = (TagToAdd) => {this.tags.push(TagToAdd)};
    removeTag = (TagToRemove) => { this.tags = this.tags.filter(x => x !== TagToRemove); };

    isCompatible = (filter) => {
        if (this.getTime() < filter.timeRange.startTime || this.getTime() > filter.timeRange.endTime) {
            //console.log("Time out of range");
            return false;
        }
        if (filter.getLocation().town !== this.getLocation().town) {
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
}


// ==================== TESTING ===================== //

// eventId, title, time, location, eventUrl, eventImage, tags, saves

