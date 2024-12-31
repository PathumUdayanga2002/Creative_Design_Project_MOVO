// src/components/MyCalendar.jsx
import React from "react";

const MyCalendar = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=7b60592c95df5e72fce905bda24f75c6aa7a6c70c74ff558cd1b0f774f46a254%40group.calendar.google.com&ctz=Asia%2FColombo"
        style={{ border: "0" }}
        width="800"
        height="600"
        frameborder="0"
        scrolling="no"
        title="Google Calendar"
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default MyCalendar;
