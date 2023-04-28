import { EventCard, GenericEvent } from "../components/EventCard";
import React, { useCallback, useEffect, useState } from "react";

import { API_URL } from "@/utils/vars";
import { preferenceObjectToString } from "@/utils/helpers";
import { useRouter } from "next/router";

// Fake search results
const fakeSearchResults = [
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
  const router = useRouter();
  const [eventResultsLoading, setEventResultsLoading] = useState(true);
  const [eventResultsError, setEventResultsError] = useState(false);
  const [eventResults, setEventResults] = useState<GenericEvent[]>([]);

  useEffect(() => {
    if (router.query === undefined) return;

    const fetchResults = async () => {
      try {
        const searchParamString = preferenceObjectToString(router.query);
        const res = await fetch(`${API_URL}/events?${searchParamString}`);
        console.log(res);
        const data: GenericEvent[] = await res.json();
        console.log(data);
        setEventResults(() => data);
        setEventResultsLoading(() => false);
      } catch (error) {
        setEventResultsLoading(false);
        setEventResultsError(true);
      }
    };

    fetchResults();
  }, [router.query]);

  return (
    <div className="flex flex-col flex-1 h-full gap-6 py-12">
      <h1 className="text-3xl font-medium">Search Results</h1>
      {eventResultsLoading ? (
        <p>Loading...</p>
      ) : eventResultsError ? (
        <p className="font-bold text-rose-600">Error Loading Results!</p>
      ) : (
        <ul className="space-y-4">
          {eventResults.map((result) => (
            <EventCard key={result.eventId} event={result} eventSaved={false} />
          ))}
        </ul>
      )}
    </div>
  );
}
