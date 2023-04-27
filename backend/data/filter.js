export default class Filter {
    constructor(dateTime, location, tags, area) {
        this.dateTime = dateTime; // {startTime: {day: ,hours: ,minutes: ,am: } , endTime: {...} } //04 Dec 1995 00:12:00 GMT
        this.location = location; // {Town: " " , Building: " "}
        this.tags = tags; // Array<String>
        this.area = area; //String
    }

    getTags = () => this.tags;
    setTags = (newTags) => {this.tags = newTags};

    addTag = (TagToAdd) => {this.tags.push(TagToAdd)};
    removeTag = (TagToRemove) => { this.tags = this.tags.filter(x => x !== TagToRemove); };

    getTime = () => this.dateTime;
    setTime = (newTime) => {this.dateTime = newTime};

    getStartSeconds = () => {
        return Date.parse(this.dateTime.startTime.day + " Apr 2023 " + (this.dateTime.startTime.am? this.dateTime.startTime.hours:
            (this.dateTime.startTime.hours+12) % 24) + 
        ":" + this.dateTime.startTime.minutes + ":00 EST");
    }

    getEndSeconds = () => {
        return Date.parse(this.dateTime.endTime.day + " Apr 2023 " + (this.dateTime.endTime.am? this.dateTime.endTime.hours:
            (this.dateTime.endTime.hours+12) % 24) + 
        ":" + this.dateTime.endTime.minutes + ":00 EST");
    }

    
    getLocation = () => this.location;
    setLocation = (newLocation) => {this.location = newLocation};

    getLocation = () => this.location;
    setLocation = (newLocation) => {this.location = newLocation};

    getArea = () => this.area;
    setArea = (newArea) => {this.area = newArea};

}