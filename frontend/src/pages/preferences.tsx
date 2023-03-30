import Link from "next/link";

export default function Preferences() {
  return (
    <div className="text-center">
      <h1 className="text-4xl mb-10">Choose Preferences</h1>
      <div className="flex flex-col items-center gap-2">
        <label>
          <input type="checkbox" />
          <span className="ml-2">Indoor</span>
        </label>
        <label>
          <input type="checkbox" />
          <span className="ml-2">Outdoor</span>
        </label>
      </div>
      <Link href="/results">
        <a className="px-4 py-2 bg-blue-500 text-white font-bold text-center rounded mt-10">
          Show Search Results
        </a>
      </Link>
    </div>
  );
}