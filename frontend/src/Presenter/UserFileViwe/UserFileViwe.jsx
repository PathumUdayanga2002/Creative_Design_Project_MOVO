import React, { useEffect, useState } from "react";

const UserFileViwe = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files`);
        const data = await response.json();
        setFiles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Available Files
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-center text-gray-500">No files available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {files.map((file) => (
            <div key={file._id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium text-lg mb-2 text-gray-700">
                {file.name}
              </h3>
              {file.type === "document" ? (
                // <a
                //   href={file.url}
                //   target="_blank"
                //   rel="noopener noreferrer"
                //   className="text-blue-600 hover:underline"
                // >
                //   View Document
                // </a>
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}${file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-blue-500 text-white p-2 rounded">
                    View Document
                  </button>
                </a>
              ) : (
                // <video controls className="w-full mt-2 rounded-md">
                //   <source src={file.url} type="video/mp4" />
                //   Your browser does not support the video tag.
                // </video>
                <video width="600" controls>
                  <source
                    src={`${import.meta.env.VITE_BACKEND_URL}${file.url}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFileViwe;
