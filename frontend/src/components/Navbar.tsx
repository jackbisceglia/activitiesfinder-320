import { CarIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

type PagePaths = "/" | "/search" | "/results";

type PageLink = {
  title: string;
  href: PagePaths;
};

const pages: Record<string, PageLink> = {
  home: { title: "Home", href: "/" },
  search: { title: "New Preferences", href: "/search" },
  results: { title: "Default Preferences", href: "/results" },
};

const NavLink = (props: { href: PagePaths; children: React.ReactNode }) => (
  <Link
    href={props.href}
    className="self-stretch transition-colors duration-150 hover:text-sky-600"
  >
    {props.children}
  </Link>
);

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full h-20 text-base font-medium bg-transparent shadow-md shadow-black/5 text-neutral-900 px-28">
      {/* <nav className="flex justify-between w-full h-16 text-base font-medium text-neutral-900 px-28"> */}
      {/* TITLE */}
      <Link
        href="/"
        className="my-auto text-xl font-extrabold transition-opacity duration-150 hover:opacity-80"
      >
        Activities<span className="font-extrabold text-sky-500">Finder</span>
      </Link>
      {/* LINKS */}
      <ul className="flex gap-8 my-auto">
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
      </ul>
    </nav>
  );
};

export default Navbar;
