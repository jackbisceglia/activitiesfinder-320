class Event {
    constructor(eventId){
        this.eventId = eventId
        this.title = title
        this.time = time
        this.location = location

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

        if (eventUrl === undefined) {
            this.eventUrl = ""
        }
        else{
            this.eventUrl = eventUrl
        }
    }
}

console.log("Hello World")