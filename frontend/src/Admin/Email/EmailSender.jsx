import React, { useState } from "react";
import Sidebar from "../../components/SIdebar/Sidebar";
import axiosInstance from "../../utils/axios";

const EmailSender = () => {
  const [searchId, setSearchId] = useState("");
  const [user, setUser] = useState(null);
  //const [mail, setMail] = useState("");
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
    attachment: null,
  });

  // const handleSearch = async () => {
  //   try {
  //     const response = await axiosInstance.get(`email/search-user?id=${searchId}`);
  //     setUser(response.data); // Set the user details in state
  //   } catch (error) {
  //     alert("User not found!");
  //     setUser(null);
  //   }
  // };
  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(
        `/email/search-user?id=${encodeURIComponent(searchId)}`
      );
      setUser(response.data); // Set the user details in state
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User not found!");
      } else {
        alert("Failed to fetch user details!");
      }
      setUser(null);
    }
  };

  // const handleEmailSend = async () => {
  //   const formData = new FormData();
  //   formData.append("email", user.email);
  //   formData.append("subject", emailData.subject);
  //   formData.append("message", emailData.message);
  //   if (emailData.attachment) {
  //     formData.append("attachment", emailData.attachment);
  //   }

  //   try {
  //     await axiosInstance.post("/email/send-email", formData);
  //     alert("Email sent successfully!");
  //     console.log(emailData);
  //   } catch (error) {
  //     alert("Failed to send email!");
  //     console.log(user.email);
  //   }
  // };

  const handleEmailSend = async () => {
    const formData = new FormData();
    formData.append("email", user.email); // Ensure user.email exists
    formData.append("subject", emailData.subject);
    formData.append("message", emailData.message);

    if (emailData.attachment) {
      formData.append("attachment", emailData.attachment); // Add file if present
    }

    try {
      await axiosInstance.post("/email/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Explicitly set the content type
        },
      });
      alert("Email sent successfully!");
      console.log(emailData);
    } catch (error) {
      alert("Failed to send email!");
      console.error(error.response || error.message);
    }

  };

  const userName = localStorage.getItem("name") || "User";

  return (
    <div className=" flex flex-row font-poppins">
      {/* sidebar */}
      <div>
        <Sidebar />
      </div>
      {/* email sender */}
      <div className=" flex w-max h-auto">

        <div className="flex flex-col gap-6 bg-white  border-l-2 rounded-lg p-6 w-[900px]">
        <h1 >
Hello, {userName}
            </h1>
          <h2 className="text-xl font-semibold text-orange-600">
            Send Your Massage
            By E-Mail
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter ID (e.g., EC/2021/039)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition"
            >
              Search
            </button>
          </div>

          {user && (
            <div className="flex flex-col gap-6 mt-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">
                  User Details
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">ID:</span>{" "}
                  {user.id}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Name:</span>{" "}
                  {user.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Email:</span>{" "}
                  {user.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Role:</span>{" "}
                  {user.role}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-orange-600">
                  Send Email
                </h3>
                <div className="flex flex-col gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={emailData.subject}
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <textarea
                    placeholder="Message"
                    value={emailData.message}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    rows={4}
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      setEmailData({
                        ...emailData,
                        attachment: e.target.files[0],
                      })
                    }
                    className="w-full text-gray-500"
                  />
                  <button
                    onClick={handleEmailSend}
                    className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSender;
