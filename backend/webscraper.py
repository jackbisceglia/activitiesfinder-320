import requests
from datetime import date
from datetime import datetime
import datetime
import schedule
import time
import psycopg2
from dateutil import parser
from bs4 import BeautifulSoup
from serpapi import GoogleSearch

#Defining global variables:
Global_event_id = 1
last_run_date = None

#establishing connection to the database:
conn = psycopg2.connect(
    database = "postgres",
    user = "postgres",
    password = "activities1",
    host = "activities-finder.cxsdr7lmdwcg.us-east-2.rds.amazonaws.com",
    port = "5432"
)

#helper method for the webscrape method
def is_outdoor_location(location,description):
    outdoor_keywords = ['park', 'garden', 'courtyard', 'outdoor', 'outside', 'field', 'stadium','terrace','patio','plaza','beach','picnic','campground','trail','forest','mountain','lake','river','rooftop']
    for keyword in outdoor_keywords:
        if (keyword in location.lower()) or (keyword in description.lower()):
            return True
    return False

def replace_search_word(url, search_number):
    return url.replace("search", str(search_number))

def replace_strings(string_list):
    for i in range(len(string_list)):
        string_list[i] = string_list[i].replace("Free Food", "Food")
        string_list[i] = string_list[i].replace("ThoughtfulLearning", "Educational")
        
def format_event_time(time_string):
    if '–' in time_string:
        # Case: start time and end time are given
        start_time, end_time = time_string.split('–')
        try:
            start_datetime = datetime.datetime.strptime(start_time.strip(), "%a, %b %d, %I:%M %p")
            try:
                end_datetime = datetime.datetime.strptime(end_time.strip(), "%I:%M %p")
            except ValueError:
                end_datetime = datetime.datetime.strptime(end_time.strip(), "%I %p")
        except ValueError:
            try:
                start_datetime = datetime.datetime.strptime(start_time.strip(), "%a, %b %d, %I:%M")
                try:
                    end_datetime = datetime.datetime.strptime(end_time.strip(), "%I:%M %p")
                except ValueError:
                    end_datetime = datetime.datetime.strptime(end_time.strip(), "%I %p")
            except ValueError:
                try:
                    start_datetime = datetime.datetime.strptime(start_time.strip(), "%a, %b %d, %I %p")
                    try:
                        end_datetime = datetime.datetime.strptime(end_time.strip(), "%I:%M %p")
                    except ValueError:
                        end_datetime = datetime.datetime.strptime(end_time.strip(), "%I %p")
                except ValueError:
                    start_datetime = datetime.datetime.strptime(start_time.strip(), "%a, %b %d, %I")
                    try:
                        end_datetime = datetime.datetime.strptime(end_time.strip(), "%I:%M %p")
                    except ValueError:
                        end_datetime = datetime.datetime.strptime(end_time.strip(), "%I %p")

        formatted_start_time = start_datetime.strftime("%Y-%m-%d %H:%M:%S")
        formatted_end_time = start_datetime.replace(hour=end_datetime.hour, minute=end_datetime.minute).strftime("%Y-%m-%d %H:%M:%S")
        return formatted_start_time
    else:
        # Case: only start time is given
        try:
            start_datetime = datetime.datetime.strptime(time_string.strip(), "%a, %b %d, %I:%M %p")
        except ValueError:
            try:
                start_datetime = datetime.datetime.strptime(time_string.strip(), "%a, %b %d, %I %p")
            except ValueError:
                start_datetime = datetime.datetime.strptime(time_string.strip(), "%a, %b %d, %I")
        formatted_start_time = start_datetime.strftime("%Y-%m-%d %H:%M:%S")
        return formatted_start_time

def extract_event_tags(description, title):
    tags = []
    common_words = {
        'Music': ['music', 'concert', 'performance', 'band', 'live', 'songs', 'song','acoustic'],
        'Educational': ['education', 'workshop', 'seminar', 'lecture'],
        'Cultural': ['culture', 'heritage', 'tradition', 'celebration', 'rituals'],
        'Arts': ['art', 'painting', 'exhibition', 'gallery','theatre'],
        'Food': ['food', 'cuisine', 'tasting', 'culinary','restaurant','eatery'],
        'Sports': ['sports', 'game', 'tournament', 'competition', 'match']
    }
    
    tags.append('Social')
    for tag, words in common_words.items():
        for word in words:
            if word.lower() in description.lower() or word.lower() in title.lower():
                tags.append(tag)
                break

    return tags

def webscrape():
    global last_run_date
    global Global_event_id
    base_url = "https://umassamherst.campuslabs.com/engage/event/search"
    url = "https://umassamherst.campuslabs.com/engage/api/discovery/event/search"
    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-4)))
    ends_after = now.strftime("%Y-%m-%dT%H:%M:%S%z")
    all_events_json = []
    
    querystring = {"endsAfter":ends_after,
                   "orderByField":"endsOn",
                   "orderByDirection":"ascending",
                   "status":"Approved",
                   "take":"30","query":"","skip":"0"}

    headers = {
        "cookie": "ARRAffinity=ad0748392c025af5aa98e52f557ef5c94ed9f8c53e0066f7370223f3edc6b13d; ARRAffinitySameSite=ad0748392c025af5aa98e52f557ef5c94ed9f8c53e0066f7370223f3edc6b13d",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Cookie": ".AspNetCore.Antiforgery.Pnjfq5WAl6o=CfDJ8Az9GcAD4TpIm2NmyW6ywWHDijs89NFLKvrrV77knufHuvo1_7xj6hO3vnSUC-ysjK1C-CI4L-8NfHx-2OVAsCfN5nwj199-MRBxyEbIUwR_4eisy_JSvkXiYHxCMHsH4DkG1IYpJ_SX3maPmELZiCA; ARRAffinity=1eba3c85693cc4165d210fbb33dd0e86bf38e81e92bef2a9921ec79851231039; ARRAffinitySameSite=1eba3c85693cc4165d210fbb33dd0e86bf38e81e92bef2a9921ec79851231039; ai_user=xSTxh7ilBGDe14MqPJB8Ed|2023-05-13T04:18:54.515Z; _gid=GA1.2.696029992.1684103287; _clck=94ya2u|2|fbm|0|1228; _clsk=xh59rc|1684194062877|2|1|www.clarity.ms/eus2-b-sc/collect; _ga=GA1.1.2013760888.1683951536; ai_session=z++F04YwesT/QQ2rQBQnFm|1684194050053|1684194877430; _ga_6VXTC1Y945=GS1.1.1684194060.6.1.1684194938.0.0.0; _ga_6FM4123XLW=GS1.1.1684194060.6.1.1684194938.0.0.0",
        "DNT": "1",
        "Referer": "https://umassamherst.campuslabs.com/engage/events",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36",
        "accept": "application/json",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "request-id": "|583941bbc3fb4d9597a0b710cc5df1c5.e0e5a39b4b9f474c",
        "sec-ch-ua": '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "'Android'",
        "traceparent": "00-583941bbc3fb4d9597a0b710cc5df1c5-e0e5a39b4b9f474c-01",
        "x-javascript-version": "undefined",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token": "CfDJ8Az9GcAD4TpIm2NmyW6ywWG4tUd7fVELsXf9dgjVhgfuk6_9UsKdpiFE2eho6mTXHdx-zFpD39oe7Xd0homVzQyYMVwLY3_asWcnA5_H0IgZBmDvXhmT4NBKqko1TwL1z4bAszQZs5QZVLw4KhT7skw"
    }
    
    while True:
        response = requests.request("GET", url, headers=headers, params=querystring)
        jsonobj = response.json()
        events = jsonobj['value']
        total_events = jsonobj['@odata.count']
        all_events_json.extend(events)
        if len(all_events_json) >= total_events:
            break
        querystring["skip"] = str(len(all_events_json))

    #print("Total events:", len(all_events_json))
    last_run_date = date.today()
    events_database = []
    
    #pushing the event to the database:
    # Create a cursor object
    cur = conn.cursor()

    for i in range (len(all_events_json)):
        event_id = Global_event_id 
        print("printing eventid")
        print(event_id)
        event_name = all_events_json[i]['name']
        print(event_name)
        event_link = replace_search_word(base_url, all_events_json[i]['id'])
        
        html_string = all_events_json[i]['description']
        soup = BeautifulSoup(html_string, 'html.parser')
        event_description = soup.get_text()
        
        event_location = all_events_json[i]['location']
                
        time_string = all_events_json[i]['startsOn']
        parsed_time = parser.parse(time_string)
        formatted_time = parsed_time.strftime("%Y-%m-%d %H:%M:%S")
        event_start_time = formatted_time
        
        event_town = "Amherst"
        if (is_outdoor_location(event_location, event_description)):
            event_area = "outdoor"
        else:
            event_area = "indoor" 
        
        event_tags = []
        event_tags.append(all_events_json[i]['theme'])       
        for j in (all_events_json[i]['categoryNames']): 
            event_tags.append(j)  
        for j in (all_events_json[i]['benefitNames']):
            event_tags.append(j)
            
        replace_strings(event_tags)
        #print(event_tags)
                
        """
        # column1: event_id
        # column2: event_name
        # column3: event_link
        # column4: event_description
        # column5: event_location
        # column6: event_tags
        # column7: event_time
        # column8: event_town
        # column9: event_area
        """ 

        events_database.append({'event_id': event_id, 'event_name': event_name, 'event_link': event_link, 'event_description': event_description, 'event_location': event_location, 'event_tags': event_tags, 'event_start_time': event_start_time, 'event_town': event_town, 'event_area': event_area})         
      
        # Define the SQL statement
        sql = "INSERT INTO events(event_id, event_name, event_link, event_description, event_location, event_tags, event_time, event_town, event_area) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        # Define the data to be inserted
        data = [
            (event_id, event_name, event_link, event_description, event_location, event_tags, event_start_time, event_town, event_area)
        ]
        
        # Execute the SQL statement with multiple sets of parameters
        cur.executemany(sql, data)
        # Commit the transaction
        conn.commit()   
        Global_event_id += 1
        print("printing Global_event_id")
        print(Global_event_id)
        
    paramsNH = {
      "engine": "google_events",
      "q": "Events in Northampton",
      "google_domain": "google.com",
      "hl": "en",
      "gl": "us",
      "location": "Northampton, Massachusetts, United States",
      "api_key": "c2fd7d0d035e44b7f6e34d8d444903406dcb42e9ae8fd88975719f365c618c83"
    }

    search = GoogleSearch(paramsNH)
    results = search.get_dict()
    
    eventsNH = results['events_results']
   
    for i in range (len(eventsNH)):
        """
        # column1: event_id
        # column2: event_name
        # column3: event_link
        # column4: event_description
        # column5: event_location
        # column6: event_tags
        # column7: event_time
        # column8: event_town
        # column9: event_area
        """ 
        event_id = Global_event_id 
        print("printing eventid")
        print(event_id)
        event_name = eventsNH[i]['title']
        print(event_name)
        event_link = eventsNH[i]['link']
        event_description = eventsNH[i]['description']
        event_location = ' '.join(eventsNH[i]['address'])
    
        event_tags = extract_event_tags(event_description, event_name)  #using event title, event description assign tags
        #print(event_tags)
    
        event_start_time = format_event_time(eventsNH[i]['date']['when']) 
        event_town = "Northampton"
    
        if (is_outdoor_location(event_location, event_description)):
           event_area = "outdoor"
        else:
           event_area = "indoor"
           
        events_database.append({'event_id': event_id, 'event_name': event_name, 'event_link': event_link, 'event_description': event_description, 'event_location': event_location, 'event_tags': event_tags, 'event_start_time': event_start_time, 'event_town': event_town, 'event_area': event_area})         
      
        # Define the SQL statement
        sql = "INSERT INTO events(event_id, event_name, event_link, event_description, event_location, event_tags, event_time, event_town, event_area) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        # Define the data to be inserted
        data = [
            (event_id, event_name, event_link, event_description, event_location, event_tags, event_start_time, event_town, event_area)
        ]
        
        # Execute the SQL statement with multiple sets of parameters
        cur.executemany(sql, data)
        # Commit the transaction
        conn.commit() 
        Global_event_id += 1
        print("printing Global_event_id")
        print(Global_event_id)

    paramsHadley = {
       "engine": "google_events",
       "q": "Events in Hadley",
       "google_domain": "google.com",
       "hl": "en",
       "gl": "us",
       "location": "Hadley, Massachusetts, United States",
       "api_key": "c2fd7d0d035e44b7f6e34d8d444903406dcb42e9ae8fd88975719f365c618c83"
    }

    searchHadley = GoogleSearch(paramsHadley)
    resultsHadley = searchHadley.get_dict()
    eventsHadley = resultsHadley['events_results']
   
    for i in range (len(eventsHadley)):
        """
        # column1: event_id
        # column2: event_name
        # column3: event_link
        # column4: event_description
        # column5: event_location
        # column6: event_tags
        # column7: event_time
        # column8: event_town
        # column9: event_area
        """ 
        event_id = Global_event_id 
        print("printing eventid")
        print(event_id)
        event_name = eventsHadley[i]['title']
        print(event_name)
        event_link = eventsHadley[i]['link']
        event_description = eventsHadley[i]['description']
        event_location = ' '.join(eventsHadley[i]['address'])
    
        event_tags = extract_event_tags(event_description, event_name)  #using event title, event description assign tags
        #print(event_tags)
    
        event_start_time = format_event_time(eventsHadley[i]['date']['when']) 
        event_town = "Hadley"
    
        if (is_outdoor_location(event_location, event_description)):
           event_area = "outdoor"
        else:
           event_area = "indoor"
           
        events_database.append({'event_id': event_id, 'event_name': event_name, 'event_link': event_link, 'event_description': event_description, 'event_location': event_location, 'event_tags': event_tags, 'event_start_time': event_start_time, 'event_town': event_town, 'event_area': event_area})         
      
        # Define the SQL statement
        sql = "INSERT INTO events(event_id, event_name, event_link, event_description, event_location, event_tags, event_time, event_town, event_area) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        # Define the data to be inserted
        data = [
            (event_id, event_name, event_link, event_description, event_location, event_tags, event_start_time, event_town, event_area)
        ]
        
        # Execute the SQL statement with multiple sets of parameters
        cur.executemany(sql, data)
        # Commit the transaction
        conn.commit() 
        Global_event_id += 1
        print("printing Global_event_id")
        print(Global_event_id)
        
    paramsSunderland = {
        "engine": "google_events",
        "q": "Events in Sunderland",
        "google_domain": "google.com",
        "hl": "en",
        "gl": "us",
        "location": "Sunderland, Massachusetts, United States",
        "api_key": "secret_api_key"
    }
    search = GoogleSearch(paramsSunderland)
    results = search.get_dict()
    eventsSunderland = results['events_results']
   
    for i in range (len(eventsSunderland)):
        """
        # column1: event_id
        # column2: event_name
        # column3: event_link
        # column4: event_description
        # column5: event_location
        # column6: event_tags
        # column7: event_time
        # column8: event_town
        # column9: event_area
        """ 
        event_id = Global_event_id 
        print("printing eventid")
        print(event_id)
        event_name = eventsSunderland[i]['title']
        print(event_name)
        event_link = eventsSunderland[i]['link']
        event_description = eventsSunderland[i]['description']
        event_location = ' '.join(eventsSunderland[i]['address'])
    
        event_tags = extract_event_tags(event_description, event_name)  #using event title, event description assign tags
        #print(event_tags)
    
        event_start_time = format_event_time(eventsSunderland[i]['date']['when']) 
        event_town = "Sunderland"
    
        if (is_outdoor_location(event_location, event_description)):
           event_area = "outdoor"
        else:
           event_area = "indoor"
           
        events_database.append({'event_id': event_id, 'event_name': event_name, 'event_link': event_link, 'event_description': event_description, 'event_location': event_location, 'event_tags': event_tags, 'event_start_time': event_start_time, 'event_town': event_town, 'event_area': event_area})         
      
        # Define the SQL statement
        sql = "INSERT INTO events(event_id, event_name, event_link, event_description, event_location, event_tags, event_time, event_town, event_area) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        # Define the data to be inserted
        data = [
            (event_id, event_name, event_link, event_description, event_location, event_tags, event_start_time, event_town, event_area)
        ]
        
        # Execute the SQL statement with multiple sets of parameters
        cur.executemany(sql, data)
        # Commit the transaction
        conn.commit() 
        Global_event_id += 1
        
    paramsAmherst = {
        "engine": "google_events",
        "q": "Events in Amherst",
        "google_domain": "google.com",
        "hl": "en",
        "gl": "us",
        "location": "Amherst, Massachusetts, United States",
        "api_key": "secret_api_key"
    }
    search = GoogleSearch(paramsAmherst)
    results = search.get_dict()
    eventsAmherst = results['events_results']
   
    for i in range (len(eventsAmherst)):
        """
        # column1: event_id
        # column2: event_name
        # column3: event_link
        # column4: event_description
        # column5: event_location
        # column6: event_tags
        # column7: event_time
        # column8: event_town
        # column9: event_area
        """ 
        event_id = Global_event_id 
        print("printing eventid")
        print(event_id)
        event_name = eventsAmherst[i]['title']
        print(event_name)
        event_link = eventsAmherst[i]['link']
        event_description = eventsAmherst[i]['description']
        event_location = ' '.join(eventsAmherst[i]['address'])
    
        event_tags = extract_event_tags(event_description, event_name)  #using event title, event description assign tags
        #print(event_tags)
    
        event_start_time = format_event_time(eventsAmherst[i]['date']['when']) 
        event_town = "Amherst"
    
        if (is_outdoor_location(event_location, event_description)):
           event_area = "outdoor"
        else:
           event_area = "indoor"
           
        events_database.append({'event_id': event_id, 'event_name': event_name, 'event_link': event_link, 'event_description': event_description, 'event_location': event_location, 'event_tags': event_tags, 'event_start_time': event_start_time, 'event_town': event_town, 'event_area': event_area})         
      
        # Define the SQL statement
        sql = "INSERT INTO events(event_id, event_name, event_link, event_description, event_location, event_tags, event_time, event_town, event_area) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        # Define the data to be inserted
        data = [
            (event_id, event_name, event_link, event_description, event_location, event_tags, event_start_time, event_town, event_area)
        ]
        
        # Execute the SQL statement with multiple sets of parameters
        cur.executemany(sql, data)
        # Commit the transaction
        conn.commit() 
        Global_event_id += 1
               
    # Close the cursor and connection
    cur.close()
    conn.close()  
        
def run_daily():
    global last_run_date
    # Check if the scraper has already run today
    if last_run_date == date.today():
        print("Scraper has already run today.")
    else:
        # Schedule the task to run once a day at 2:30 AM in the US/Eastern time zone
        schedule.every().day.at("10:22", "US/Eastern").do(webscrape)
        # Set the last run date to today
        last_run_date = date.today()

run_daily()

start_time = time.time()
timeout_timer = 1000

while True:
    # Check if there are any pending tasks to run
    schedule.run_pending()  
    # Wait for 1 second before checking again
    time.sleep(1)    
    elapsed_time = time.time() - start_time
    if elapsed_time >= timeout_timer:
        print("timeout; scheduled jobs have either been completed or interrupted by this timeout timer, which is currently set to: " + str(timeout_timer) + "seconds")
        break  
