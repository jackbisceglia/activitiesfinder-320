import pkg from 'pg'
const { Client } = pkg

const credentials = {
    user: 'postgres',
    host: 'activities-finder.cxsdr7lmdwcg.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'activities1',
    port: 5432,
}

//gets all events
async function getEvents(request, response) {
    const client = new Client(credentials);
    await client.connect();
    client.query('SELECT * from public.events;', (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows);
        client.end();
    });
}

//get events based on time and location
//request : {location: string, startTime: Date, endTime: Date}
async function getEventsFiltered(request, response) {
    const location = request.query.location;
    const time = request.query.time;
    const startTime = time.startTime;
    const endTime = time.endTime;
    const client = new Client(credentials);
    await client.connect();
    client.query('SELECT * from public.events WHERE event_location = $1 AND event_time < $2 and event_time > $3', [location, endTime, startTime], (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows);
        client.end();
    });
}

export { getEvents, getEventsFiltered }