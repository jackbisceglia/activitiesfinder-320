export default function Results() {
    // A sample list of search results
    const searchResults = [
      { title: "Activity 1", description: "This is a description for Activity 1" },
      { title: "Activity 2", description: "This is a description for Activity 2" },
      { title: "Activity 3", description: "This is a description for Activity 3" },
      { title: "Activity 4", description: "This is a description for Activity 4" },
      { title: "Activity 5", description: "This is a description for Activity 5" },
    ];
  
    const handleAddClick = (eventTitle: string) => {
      console.log(`Adding ${eventTitle}`);
      // Add functionality to handle adding events here
    };
  
    return (
      <div className="text-center">
        <h1 className="text-4xl mb-10">Search Results</h1>
        <ul className="space-y-4">
          {searchResults.map((result, index) => (
            <li key={index} className="text-left">
              <h2 className="text-2xl">{result.title}</h2>
              <p>{result.description}</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
                onClick={() => handleAddClick(result.title)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }