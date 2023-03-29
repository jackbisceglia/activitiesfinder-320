class Event {

    constructor(eventId,title, time, location, eventUrl, eventImage, tags){
        //mandatory
        this.eventId = eventId
        this.title = title
        this.time = time
        this.location = location
        this.eventUrl = eventUrl
        //Optional
        if (tags === undefined) {
            this.tags = []
        }
        else {
            this.tags = tags
        }
        if (eventImage === undefined) {
            this.eventImage = new Image()
        }
        else{
            this.eventImage = eventImage
        }
    }

    getTitle(){
        return this.title
    }
    getTime(){
        return this.time
    }
    getLocation() {return this.location}
    getUrl(){return this.eventUrl}
    getImage(){return this.image}
}

let e1 = new Event(0,"Test Event","3:45" , {Town: "Amherst", Building:"Mullins"}, ["basketball", "fun"],"Github.com", undefined, undefined)
console.log(e1.getTitle())