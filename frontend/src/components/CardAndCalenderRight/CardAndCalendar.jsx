import React from "react";
import Calendar from "../Calender/Calendar";

const CardAndCalendar = () => {
  return (
    <div className=" flex flex-col space-y-[100px] justify-between items-center font-poppins ml-5 ">
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
      <Calendar />
    </div>
  );
};

export default CardAndCalendar;
