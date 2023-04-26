import { CarIcon, ChevronDown, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

import { GenericEvent } from "./EventCard";
import Link from "next/link";
import { env } from "process";
import { preferenceObjectToString } from "@/utils/helpers";

type PagePaths = "/" | "/preferences" | `${"/results"}${string}`;

type PageLink = {
  title: string;
  href: PagePaths;
};

const clearMockEvents = () => {
  localStorage.removeItem("events");
};

const addMockEvent = () => {
  const e: GenericEvent = {
    eventId: Math.floor(Math.random() * 1000),
    date: Date().toLocaleUpperCase(),
    location: {
      Town: "Test Town",
      Building: "Test Building",
    },
    time: {
      start: 0,
      end: 0,
    },
    title: `Test Event ${Math.floor(Math.random() * 1000000)}`,
    tags: [],
    saves: 1,
    eventUrl: "https://www.umass.edu/",
  };

  const eventsFromStorage = localStorage.getItem("events") ?? "";

  const pastEvents = eventsFromStorage.length
    ? JSON.parse(eventsFromStorage)
    : [];

  localStorage.setItem("events", JSON.stringify([...pastEvents, e]));
};

const addMockPreferences = () => {
  console.log("ADDING MOCK PREFERENCES");
  const preferences = {
    area: "outdoors",
    type: "sports",
    location: "amherst",
  };

  localStorage.setItem("preferences", JSON.stringify(preferences));
};

const clearMockPrefs = () => {
  localStorage.removeItem("preferences");
};

const NavLink = (props: { href: PagePaths; children: React.ReactNode }) => (
  <Link
    href={props.href}
    className="self-stretch transition-colors duration-150 hover:text-sky-600"
  >
    {props.children}
  </Link>
);

const DevTools = () => {
  return (
    <li className="relative">
      <button className="flex items-center gap-2 py-2 transition-colors duration-150 text-neutral-900 hover:text-sky-600 peer">
        DEV TOOLS
        <ChevronDown />
      </button>
      <ul className="hover:flex absolute hidden px-6 pr-12 gap-4 py-5 text-left flex-col rounded-2xl rounded-tr-none shadow-lg w-[16rem] bg-gray-50 top-10 right-3 peer-hover:flex peer-hover:open open:flex">
        <button onClick={addMockEvent}>
          <li className="py-2">{"Add Mock Event"}</li>
        </button>
        <button onClick={clearMockEvents}>
          <li className="py-2">{"Clear Mock Event"}</li>
        </button>
        <hr className="border-gray-500" />
        <button onClick={addMockPreferences}>
          <li className="py-2">{"Add Mock Prefs"}</li>
        </button>
        <button onClick={clearMockPrefs}>
          <li className="py-2">{"Clear Mock Prefs"}</li>
        </button>
      </ul>
    </li>
  );
};

const Navbar = () => {
  const user = useUser();
  const [defaultPreferences, setDefaultPreferences] = useState<
    Record<string, string>
  >({});
  const searchParamString = preferenceObjectToString(defaultPreferences);

  const pages: Record<string, PageLink> = {
    home: { title: "Home", href: "/" },
    search: { title: "New Preferences", href: "/preferences" },
    results: {
      title: "Default Preferences",
      href: `/results${searchParamString && `?${searchParamString}`}`,
    },
  };

  useEffect(() => {
    const savedPreferencesOrEmpty = localStorage.getItem("preferences") ?? "{}";

    setDefaultPreferences(() => JSON.parse(savedPreferencesOrEmpty));
  }, []);

  return (
    <nav className="flex justify-between w-full h-20 text-base font-medium bg-transparent shadow-md shadow-black/5 text-neutral-900 px-28">
      {/* TITLE */}
      <Link
        href="/"
        className="my-auto text-xl font-extrabold transition-opacity duration-150 hover:opacity-80"
      >
        Activities<span className="font-extrabold text-sky-500">Finder</span>
      </Link>
      {/* LINKS */}
      {user.isLoaded && user.isSignedIn && (
        <ul className="flex gap-8 my-auto">
          {process.env.NEXT_PUBLIC_ISDEVMODE && <DevTools />}
          <NavLink href={pages.home.href}>
            <li className="py-2">{pages.home.title}</li>
          </NavLink>
          {/* Dropdown */}
          <li className="relative">
            <button className="flex items-center gap-2 py-2 transition-colors duration-150 text-neutral-900 hover:text-sky-600 peer">
              Find Events
              <ChevronDown />
            </button>
            <ul className="hover:flex absolute hidden px-6 pr-12 gap-4 py-5 text-left flex-col rounded-2xl rounded-tr-none shadow-lg w-[16rem] bg-gray-50 top-10 right-3 peer-hover:flex peer-hover:open open:flex">
              <NavLink href={pages.search.href}>
                <li className="transition-all duration-150 hover:pl-2">
                  {pages.search.title}
                </li>
              </NavLink>
              <NavLink href={pages.results.href}>
                <li className="transition-all duration-150 hover:pl-2">
                  {pages.results.title}
                </li>
              </NavLink>
            </ul>
          </li>
          <UserButton />
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
