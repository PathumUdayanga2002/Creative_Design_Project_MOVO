import React from "react";

const CardAndCalendar = () => {
  return (
    <div className=" flex flex-col gap-4 justify-between items-center font-poppins ml-5 ">
      <div className="p-4 bg-white shadow shadow-orange-600 h-[150px] rounded-xl w-[300px] ">
        <div className="flex flex-row  justify-between">
          {/* paragraph and topic */}
          <div className="flex flex-col gap-4">
            <h1 className=" text-3xl font-semibold">Today Presentation</h1>
          </div>
          {/* Total presentation  */}
          <div className="flex text-6xl font-bold text-orange-500">04</div>
        </div>
      </div>
      <div className=" flex flex-col items-center ">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=7b60592c95df5e72fce905bda24f75c6aa7a6c70c74ff558cd1b0f774f46a254%40group.calendar.google.com&ctz=Asia%2FColombo"
          style={{ border: "0" }}
          width="300"
          height="300"
          frameborder="0"
          scrolling="no"
          title="Google Calendar"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default CardAndCalendar;
