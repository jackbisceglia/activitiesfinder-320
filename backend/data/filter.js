export default class Filter {
    //time {Hours: Minutes: AM: Date:}
    constructor(dateTime, location, tags, area) {
        //04 Dec 1995 00:12:00 GMT
        
        this.dateTime = dateTime; //{startTime: endTime:}
        this.location = location; //Location object (JSON)
        this.tags = tags;
        this.area = area;
    }

    getTags = () => this.tags;
    setTags = (newTags) => {this.tags = newTags};

    addTag = (TagToAdd) => {this.tags.push(TagToAdd)};
    removeTag = (TagToRemove) => { this.tags = this.tags.filter(x => x !== TagToRemove); };

    getTime = () => this.dateTime;
    setTime = (newTime) => {this.dateTime = newTime};

    getStartSeconds = () => {
        Date.parse(timeRange.startTime.day + " Apr 2023 " + ( timeRange.startTime.am? timeRange.startTime.hours:
            (this.timeRange.startTime.hours+12) % 24) + 
        ":" + timeRange.startTime.minutes + ":00 EST");
    }

    getEndSeconds = () => {
        Date.parse(timeRange.EndTime.day + " Apr 2023 " + ( timeRange.EndTime.am? timeRange.EndTime.hours:
            (this.timeRange.EndTime.hours+12) % 24) + 
        ":" + timeRange.EndTime.minutes + ":00 EST");
    }

    
    getLocation = () => this.location;
    setLocation = (newLocation) => {this.location = newLocation};

    getLocation = () => this.location;
    setLocation = (newLocation) => {this.location = newLocation};

    getArea = () => this.area;
    setArea = (newArea) => {this.area = newArea};

}

