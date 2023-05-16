import { EventCard, GenericEvent } from "../components/EventCard";
import React, { useCallback, useEffect, useState } from "react";

import { API_URL } from "@/utils/vars";
import { preferenceObjectToString } from "@/utils/helpers";
import useFetch from "@/utils/useFetch";
import { useRouter } from "next/router";
import { useSavedEvents } from ".";
import useToggleSave from "@/utils/useToggleSave";

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
  const { events: savedEvents, refetch } = useSavedEvents();
  const { mutate } = useToggleSave();
  const authedFetch = useFetch();

  const eventResultsWithSaveData: GenericEvent[] = eventResults.map((event) => {
    if (event.saved) {
      return event;
    }

    return {
      ...event,
      saved: savedEvents.some((e) => e.eventId === event.eventId),
    };
  });

  const fetchResults = async (fullReload?: boolean) => {
    fullReload && setEventResultsLoading(true);
    try {
      const searchParamString = preferenceObjectToString(router.query);
      const fetchUrl = `${API_URL}/events${
        searchParamString && `?${searchParamString}`
      }`;

      const res = await authedFetch(fetchUrl);
      const data: GenericEvent[] = await res.json();
      setEventResults(() => data);
      setEventResultsLoading(() => false);
    } catch (error) {
      setEventResultsLoading(false);
      setEventResultsError(true);
    }
  };

  useEffect(() => {
    if (router.query === undefined) return;

    fetchResults(true);
  }, [router.query]);

  const onSave = async (eventId: number, action: "SAVE" | "UNSAVE") => {
    try {
      await mutate(eventId, action);
      fetchResults();
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  const EventList = () => {
    if (!eventResults.length) {
      return <p className="font-bold text-rose-600">{"No Results Found :("}</p>;
    }

    return (
      <>
        {eventResultsWithSaveData.map((result) => (
          <EventCard
            key={result.eventId}
            event={result}
            eventSaved={result.saved}
            onSave={onSave}
          />
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col flex-1 h-full gap-6 py-12">
      <h1 className="text-3xl font-medium">Search Results</h1>
      {eventResultsLoading ? (
        <p>Loading...</p>
      ) : eventResultsError ? (
        <p className="font-bold text-rose-600">Error Loading Results!</p>
      ) : (
        <ul className="space-y-4">
          <EventList />
        </ul>
      )}
    </div>
  );
}
