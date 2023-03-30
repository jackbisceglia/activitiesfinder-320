export default class Filter {
    //time
    constructor(time, location, tags) {
        this.timeRange = time //{startTime: endTime:}
        this.location = location//Location object (JSON)
        this.tags = tags
    }

    getTags = () => this.tags;
    setTags = (newTags) => {this.tags = newTags};

    addTag = (TagToAdd) => {this.tags.push(TagToAdd)};
    removeTag = (TagToRemove) => { this.tags = this.tags.filter(x => x !== TagToRemove); };

    getTime = () => this.time;
    setTime = (newTime) => {this.time = newTime};
    
    getLocation = () => this.location;
    setLocation = (newLocation) => {this.location = newLocation};

    isCompatible(event) {
        if (event.getTime() < this.timeRange.startTime || event.time > this.timeRange.endTime) {
            return false
        }
        if (this.location.town !== event.getLocation().town) {
            return false
        }
        return true;
    }

    getScore(event) {
        if (!this.isCompatible(event)) {return -1}
        const filter_set = new Set();
        for (let i = 0; i < this.tags.length; ++i){
            filter_set.add(this.tags[i]);
        }

        let score = 0;
        let arr = event.getTags();
        for (let i = 0; i < arr.length; ++i){
            if(filter_set.has(arr[i])){
                score++;
            }
        }
        return score;
    }
}

