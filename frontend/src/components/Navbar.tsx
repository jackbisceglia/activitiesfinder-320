import Link from "next/link";

type PageData = {
  title: string;
  href: string;
};

const pages: PageData[] = [
  { title: "Home", href: "/" },
  { title: "Default Search", href: "/results" },
  { title: "Search", href: "/preferences" },
];

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full h-16 text-base font-medium bg-transparent shadow-md shadow-black/5 text-neutral-900 px-28">
      {/* <nav className="flex justify-between w-full h-16 text-base font-medium text-neutral-900 px-28"> */}
      {/* TITLE */}
      <Link
        href="/"
        className="my-auto text-xl font-extrabold transition-opacity duration-150 hover:opacity-80"
      >
        Activities<span className="font-extrabold text-sky-500">Finder</span>
      </Link>
      {/* LINKS */}
      <ul className="flex gap-4 my-auto">
        {pages.map(({ href, title }) => (
          <Link
            key={title}
            href={href}
            className="transition-colors duration-150 hover:text-sky-600 "
          >
            <li className="px-2">{title}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
