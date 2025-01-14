import React, { useEffect, useState } from "react";

const ViwePresentation = () => {
  const [presentations, setPresentations] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredPresentation, setFilteredPresentation] = useState(null);

  // Fetch all uploaded presentations on component load
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload-details`)
      .then((res) => res.json())
      .then((data) => setPresentations(data))
      .catch((err) => console.error("Error fetching presentations:", err));
  }, []);

  // Search presentation by presenter ID
  const handleSearch = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload-details/search-presentation?id=${searchId}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Presentation not found");
        }
        return res.json();
      })
      .then((data) => setFilteredPresentation(data))
      .catch((err) => {
        console.error(err.message);
        setFilteredPresentation(null);
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Search Section */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter Presenter ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {filteredPresentation ? (
        <div className="p-4 bg-white shadow-md rounded-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Search Result
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Type:</strong>{" "}
              {filteredPresentation.isGroup ? "Group" : "Individual"}
            </p>
            {filteredPresentation.isGroup && (
              <div>
                <p>
                  <strong>Group Members:</strong>
                </p>
                <ul className="list-disc ml-6">
                  {filteredPresentation.groupMembers.map((member, index) => (
                    <li key={index}>
                      {member.id} - {member.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p>
              <strong>Description:</strong> {filteredPresentation.description}
            </p>
            <p>
              <strong>File:</strong>{" "}
              {filteredPresentation.file && (
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}/uploads/${filteredPresentation.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-blue-500 text-white p-2 rounded">
                    View Document
                  </button>
                </a>
              )}
            </p>
          </div>
        </div>
      ) : (
        searchId && (
          <p className="text-red-500">
            No presentation found for ID: {searchId}
          </p>
        )
      )}

      {/* All Presentations */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        All Presentations
      </h2>
      <div className="space-y-6">
        {/* Group Presentations */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Group Presentations
          </h3>
          {presentations.filter((p) => p.isGroup).length > 0 ? (
            <div className="space-y-4">
              {presentations
                .filter((p) => p.isGroup)
                .map((presentation, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white shadow-md rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Group Members:</strong>
                      </p>
                      <ul className="list-disc ml-6">
                        {presentation.groupMembers.map((member, i) => (
                          <li key={i}>
                            {member.id} - {member.name}
                          </li>
                        ))}
                      </ul>
                      <p>
                        <strong>Description:</strong> {presentation.description}
                      </p>
                    </div>
                    {presentation.file && (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/uploads/${presentation.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No group presentations uploaded yet.
            </p>
          )}
        </div>

        {/* Individual Presentations */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Individual Presentations
          </h3>
          {presentations.filter((p) => !p.isGroup).length > 0 ? (
            <div className="space-y-4">
              {presentations
                .filter((p) => !p.isGroup)
                .map((presentation, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white shadow-md rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Presenter ID:</strong>{" "}
                        {presentation.presenterId}
                      </p>
                      <p>
                        <strong>Description:</strong> {presentation.description}
                      </p>
                    </div>
                    {presentation.file && (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/uploads/${presentation.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No individual presentations uploaded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViwePresentation;
