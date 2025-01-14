import React, { useEffect, useState } from "react";
import axios from "axios";
const AdminFileUpload = () => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("document");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]); // Initialize as an empty array

  // Fetch the list of uploaded files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files`);
        const data = await response.json();
        console.log(data);

        // Ensure files is an array before updating state
        if (data && Array.isArray(data)) {
          setFiles(data);
        } else {
          setFiles([]); // Default to empty array if no files
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        setFiles([]); // Set to empty array if there's an error
      }
    };

    fetchFiles();
  }, []); // Empty dependency array ensures this runs only on mount

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          Authorization: "Bearer admin-token", // Replace with your real token logic
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded successfully!");
        setFile(null);
        setType("document");

        // After uploading the file, re-fetch the files to update the list
        fetchFiles(); // This will refresh the file list
      } else {
        setMessage("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin-token", // Use real token for authentication
        },
      });

      if (response.ok) {
        setMessage("File deleted successfully!");
        alert("File deleted successfully!");
        setFiles(files.filter((file) => file._id !== id)); // Remove file from the UI
      } else {
        setMessage("Failed to delete the file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setMessage("An error occurred while deleting the file.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Admin Upload
      </h2>
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

      <form onSubmit={handleUpload} className="flex flex-col w-full">
        <label className="text-sm font-medium text-gray-600 mb-2">
          Select File
        </label>
        <input
          type="file"
          className="p-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label className="text-sm font-medium text-gray-600 mb-2">
          File Type
        </label>
        <select
          className="p-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="document">Document</option>
          <option value="video">Video</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Upload
        </button>
      </form>

      <div className="mt-8 w-full">
        <h3 className="text-xl font-semibold text-gray-700">Uploaded Files</h3>
        {console.log(files.length)} {files.length === 0 ? (
          <p>No files available</p>
          
        ) : (
          files.map((file) => (
            <div key={file._id} className="mb-4 p-4 border rounded-md bg-white">
              <h4 className="font-semibold text-gray-700">{file.name}</h4>
              {file.type === "video" ? (
                <video width="600" controls>
                  <source
                    src={`${import.meta.env.VITE_BACKEND_URL}${file.url}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : file.type === "document" ? (
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}${file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-blue-500 text-white p-2 rounded mt-2">
                    View Document
                  </button>
                </a>
              ) : (
                <p>Unsupported file type</p>
              )}

              <button
                className="bg-red-500 text-white py-2 px-4 rounded mt-2"
                onClick={() => handleDelete(file._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFileUpload;
