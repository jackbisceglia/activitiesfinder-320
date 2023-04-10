import React, { useCallback } from "react";
import { EventCard, GenericEvent } from "../components/EventCard";

// Fake search results
const fakeSearchResults: GenericEvent[] = [
  {
    id: "1",
    title: "Fake Event 1",
    location: "Amherst",
    date: "2023-05-01",
    time: "18:00",
    url: "https://example.com/event1",
  },
  {
    id: "2",
    title: "Fake Event 2",
    location: "Hadley",
    date: "2023-05-10",
    time: "20:00",
    url: "https://example.com/event2",
  },
  {
    id: "3",
    title: "Fake Event 3",
    location: "Sunderland",
    date: "2023-05-15",
    time: "19:00",
    url: "https://example.com/event3",
  },
  {
    id: "4",
    title: "Fake Event 4",
    location: "Northampton",
    date: "2023-05-20",
    time: "21:00",
    url: "https://example.com/event4",
  },
  {
    id: "5",
    title: "Fake Event 5",
    location: "Amherst",
    date: "2023-05-25",
    time: "17:00",
    url: "https://example.com/event5",
  },
];

export default function Results() {
  const handleSaveEvent = useCallback((event: GenericEvent) => {
    console.log("Event saved:", event);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl mb-10">Search Results</h1>
      <ul className="space-y-4">
        {fakeSearchResults.map((result) => (
          <li key={result.id} className="text-left">
            <EventCard event={result} showSaveButton onSave={handleSaveEvent} />
          </li>
        ))}
      </ul>
    </div>
  );
}


