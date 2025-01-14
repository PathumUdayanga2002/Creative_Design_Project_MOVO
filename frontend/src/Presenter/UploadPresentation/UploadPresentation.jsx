import React, { useState } from "react";

const UploadPresentation = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [groupMembers, setGroupMembers] = useState([{ id: "", name: "" }]);
  const [file, setFile] = useState(null);
  const [discription, setDescription] = useState("");

  const handleAddMember = () => {
    setGroupMembers([...groupMembers, { id: "", name: "" }]);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = groupMembers.filter((_, i) => i !== index);
    setGroupMembers(updatedMembers);
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("isGroup", isGroup);
    formData.append("groupMembers", JSON.stringify(groupMembers));
    formData.append("description", discription); // Replace with actual description input

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload-details/upload-presentation`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Presentation uploaded successfully!");
      })
      .catch((err) => {
        console.error("Error uploading presentation:", err);
        alert("Failed to upload presentation.");
      });
  };

  return (
    <div className="flex flex-col p-6 space-y-6 bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800">
        Upload Your Presentation Details
      </h2>
      <div>
        <label className="flex items-center space-x-4">
          <input
            type="radio"
            name="presentationType"
            value="individual"
            onChange={() => setIsGroup(false)}
            className="text-orange-500"
          />
          <span>Individual</span>
        </label>
        <label className="flex items-center space-x-4">
          <input
            type="radio"
            name="presentationType"
            value="group"
            onChange={() => setIsGroup(true)}
            className="text-orange-500"
          />
          <span>Group</span>
        </label>
      </div>

      {isGroup && (
        <div>
          <h3 className="text-lg font-medium text-gray-700">Group Details</h3>
          {groupMembers.map((member, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Member ID"
                value={member.id}
                onChange={(e) =>
                  setGroupMembers(
                    groupMembers.map((m, i) =>
                      i === index ? { ...m, id: e.target.value } : m
                    )
                  )
                }
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Member Name"
                value={member.name}
                onChange={(e) =>
                  setGroupMembers(
                    groupMembers.map((m, i) =>
                      i === index ? { ...m, name: e.target.value } : m
                    )
                  )
                }
                className="p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveMember(index)}
                className="p-2 text-white bg-red-500 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMember}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Add Member
          </button>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium text-gray-700">
          Upload Presentation
        </h3>
        <input
          type="file"
          accept=".pptx,.pdf,.docx"
          onChange={handleFileUpload}
          className="block p-2 border border-gray-300 rounded-md"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 text-white bg-orange-500 rounded-md"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadPresentation;
