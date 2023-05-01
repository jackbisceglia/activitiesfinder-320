import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { preferenceObjectToString } from "@/utils/helpers";

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
    <div className="text-center">
      <h1 className="text-4xl mb-10">Choose Preferences</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center p-4 border-2 border-blue-500 rounded-md">
          <h2 className="text-2xl mb-4">Area</h2>
          <label className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="area"
              value="indoor"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Indoor</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="area"
              value="outdoor"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Outdoor</span>
          </label>
        </div>
        <div className="flex flex-col items-center p-4 border-2 border-blue-500 rounded-md">
          <h2 className="text-2xl mb-4">Type</h2>
          <label className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="type"
              value="music"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Music</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="type"
              value="education"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Education</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="type"
              value="sports"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Sports</span>
          </label>
        </div>
        <div className="flex flex-col items-center p-4 border-2 border-blue-500 rounded-md">
          <h2 className="text-2xl mb-4">Location</h2>
          <label className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="location"
              value="Amherst"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Amherst</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="location"
              value="Hadley"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Hadley</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="checkbox"
              name="location"
              value="Sunderland"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Sunderland</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="location"
              value="Northampton"
              className="text-blue-500"
              onChange={handleChange}
            />
            <span className="ml-2">Northampton</span>
          </label>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="inline-block px-6 py-3 mt-10 font-medium transition-colors duration-300 rounded-md shadow-md text-white bg-blue-500 hover:bg-blue-600"
      >
        Show Search Results
      </button>
    </div>
  );
}
             
