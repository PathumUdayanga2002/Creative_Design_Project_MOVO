import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/SIdebar/Sidebar";
const AdminFileUpload = () => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("document");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  // Fetch the list of uploaded files
  useEffect(() => {
  
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setFiles(data);
        } else {
          setFiles([]);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        setFiles([]);
      }
    };

    fetchFiles();
  }, []);

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
          Authorization: "Bearer admin-token", // Replace with real token logic
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded successfully!");
        setFile(null);
        setType("document");
        const updatedFiles = await response.json();
        setFiles(updatedFiles); // Update file list after successful upload
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
          Authorization: "Bearer admin-token", // Replace with real token logic
        },
      });

      if (response.ok) {
        setMessage("File deleted successfully!");
        setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
      } else {
        setMessage("Failed to delete the file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      setMessage("An error occurred while deleting the file.");
    }
  };

  return (
    <div className=" flex flex-row  bg-gray-100 ">
      {/* sidedbar */}
      <div>
<Sidebar/>
      </div>
      {/* upload file */}
      <div className="flex flex-col items-center p-8 bg-gray-100 rounded-md shadow-md w-[800px] ">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
         Upload Guidances
      </h2>
      <h3>Upload the presentation guidances as the video or document</h3>
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

      <form onSubmit={handleUpload} className="flex flex-col w-full">
        <label className="text-sm font-medium text-gray-600 mb-2">Select File</label>
        <input
          type="file"
          className="p-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label className="text-sm font-medium text-gray-600 mb-2">File Type</label>
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
          className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition duration-200"
        >
          Upload
        </button>
      </form>

      <div className="mt-8 w-full">
        <h3 className="text-xl font-semibold text-gray-700">Uploaded Files</h3>
        {files.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No files available</p>
        ) : (
          <ul className="list-disc pl-4">
            {files.map((file) => (
              <li key={file._id} className="mb-4">
                <div className="flex items-center justify-between">
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
                      <button className="bg-blue-500 text-white p-2 rounded mt-2"
                        View Document
                      ></button>
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">Unsupported file type</p>
                  )}
                </div>

                <button
                  className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(file._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminFileUpload;
