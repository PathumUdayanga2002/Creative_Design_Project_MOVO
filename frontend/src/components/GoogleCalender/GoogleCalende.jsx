import React from 'react'
import axiosInstance from "../../utils/axios";

const GoogleCalende = () => {
    const handleGoogleAuth = async () => {
        try {
          const response = await axiosInstance.get("/google/auth-url");
          window.location.href = response.data.url; // Redirect to Google OAuth
        } catch (error) {
          console.error("Error fetching auth URL:", error);
        }};
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    <button
      onClick={handleGoogleAuth}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Connect to Google Calendar
    </button>
  </div>
  )
}

export default GoogleCalende