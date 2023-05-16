import Link from "next/link";
import { preferenceObjectToString } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Preferences() {
  const [preferences, setPreferences] = useState<Record<string, string[]>>({});
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setPreferences((prevPreferences) => {
      const currentPreferences = prevPreferences[name] || [];
      const updatedPreferences = checked
        ? [...currentPreferences, value]
        : currentPreferences.filter((pref) => pref !== value);
      return { ...prevPreferences, [name]: updatedPreferences };
    });
  };

  const handleClick = () => {
    router.push(`/results?${preferenceObjectToString(preferences)}`);
  };

  return (
    <div className="flex flex-col flex-1 h-full gap-6 py-12">
      <h1 className="text-3xl font-medium">Choose Preferences</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center justify-start gap-2 pt-6 pb-8 border-2 rounded-md border-sky-600">
          <h2 className="mb-4 text-2xl">Area</h2>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="area"
              value="indoor"
              id="indoor"
              className="w-4 h-4 text-white accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="indoor" className="ml-2">
              Indoor
            </label>
          </div>
          <div className="inline-flex items-center">
            <input
              type="checkbox"
              name="area"
              value="outdoor"
              id="outdoor"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="outdoor" className="ml-2">
              Outdoor
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-2 pt-6 pb-8 border-2 rounded-md border-sky-600">
          <h2 className="mb-4 text-2xl">Type</h2>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="type"
              id="music"
              value="music"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="music" className="ml-2">
              Music
            </label>
          </div>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="type"
              value="educational"
              id="educational"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="educational" className="ml-2">
              Educational
            </label>
          </div>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="type"
              value="cultural"
              id="cultural"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="cultural" className="ml-2">
              Cultural
            </label>
          </div>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="type"
              value="arts"
              id="arts"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="arts" className="ml-2">
              Arts
            </label>
          </div>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="type"
              value="food"
              id="food"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="food" className="ml-2">
              Food
            </label>
          </div>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="type"
              value="social"
              id="social"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="social" className="ml-2">
              Social
            </label>
          </div>
          <div className="inline-flex items-center">
            <input
              type="checkbox"
              name="type"
              value="sports"
              id="sports"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="sports" className="ml-2">
              Sports
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-2 pt-6 pb-8 border-2 rounded-md border-sky-600">
          <h2 className="mb-4 text-2xl">Location</h2>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="location"
              value="amherst"
              id="amherst"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="amherst" className="ml-2">
              Amherst
            </label>
          </div>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="location"
              value="hadley"
              id="hadley"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="hadley" className="ml-2">
              Hadley
            </label>
          </div>
          <div className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="location"
              value="sunderland"
              id="sunderland"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="sunderland" className="ml-2">
              Sunderland
            </label>
          </div>
          <div className="inline-flex items-center">
            <input
              type="checkbox"
              name="location"
              value="northampton"
              id="northampton"
              className="w-4 h-4 accent-sky-600"
              onChange={handleChange}
            />
            <label htmlFor="northampton" className="ml-2">
              Northampton
            </label>
          </div>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="inline-block px-6 py-3 mt-10 font-medium transition-colors duration-200 rounded-md shadow-md bg-gradient-to-tr from-violet-500 to-sky-500 text-neutral-100"
      >
        Show Search Results
      </button>
    </div>
  );
}
