export default class Filter {
    //time
    constructor(time, location, tags, area, location) {
        this.time = time; //{startTime: endTime:}
        this.location = location; //Location object (JSON)
        this.tags = tags;
        this.area = area;
        this.location = location;
        this.type = type;
    }

    getTags = () => this.tags;
    setTags = (newTags) => {this.tags = newTags};

    addTag = (TagToAdd) => {this.tags.push(TagToAdd)};
    removeTag = (TagToRemove) => { this.tags = this.tags.filter(x => x !== TagToRemove); };

    getTime = () => this.time;
    setTime = (newTime) => {this.time = newTime};
    
    getLocation = () => this.location;
    setLocation = (newLocation) => {this.location = newLocation};

    getLocation = () => this.location;
    setLocation = (newLocation) => {this.location = newLocation};

    getArea = () => this.area;
    setArea = (newArea) => {this.area = newArea};

}

