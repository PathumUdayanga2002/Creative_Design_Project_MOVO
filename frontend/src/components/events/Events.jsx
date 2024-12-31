import { default as React, useState } from "react";
import axiosInstance from "../../utils/axios";

const Events = () => {
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    start: "",
    end: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/google/schedule-event",
        formData
      );
      alert("Event scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling event:", error);
      alert("Failed to schedule event");
    }
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="summary"
          placeholder="Event Title"
          value={formData.summary}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Schedule Event
        </button>
      </form>
    </div>
  );
};

export default Events;
