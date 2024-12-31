import React from "react";

import CardAndCalendar from "../../components/CardAndCalenderRight/CardAndCalendar";

import Header from "../../components/Header/Header";
import PresentationList from "../../components/PresentationList/PresentationList";
import Sidebar from "../../components/SIdebar/Sidebar";

import {Link} from "react-router-dom"

//images
import aichat from "../../assets/images/aichat.jpg";
import guideVideo from "../../assets/images/guideVideo.png";
import myPresentation from "../../assets/images/mypresentation.webp";
import uploadDetails from "../../assets/images/uploadDetails.png";
const AdminDashboard = () => {
  return (
    <div className=" flex flex-row bg-orange-100 ">
      <Sidebar />
      <div className="flex flex-col ml-4">
        <div className="w-[900px]">
          <Header />
        </div>

        <div className="flex flex-row justify-between">
          <div className=" w-[700px]">
            {/* <DashboardCards /> */}
            <div className=" font-poppins grid grid-cols-2 lg:grid-cols-2 gap-4 mt-4  ">
              {/* my presentation card */}
              <Link to={"/admin/start-presentation"}>
              <div className="p-4 h-[150px] bg-white shadow shadow-orange-600 rounded-xl cursor-pointer hover:scale-105 ">
                <div className="flex flex-row gap-2">
                  {/* paragraph and topic */}
                  <div className="flex flex-col gap-4 ">
                    <h1 className=" text-xl font-semibold">Start Presentation</h1>
                    <p className=" text-[14px] text-gray-600">
                      Start your presetation here..
                    </p>
                  </div>
                  {/* image */}
                  <div className="flex object-cover">
                    <img
                      className=" object-cover w-[500px] h-[100px]"
                      src={myPresentation}
                      alt="card image"
                    />
                  </div>
                </div>
              </div>
              </Link>
              {/* upload card */}
              <div className="p-4 bg-white shadow shadow-orange-600 rounded-xl h-[150px] ">
                <div className="flex flex-row gap-2">
                  {/* paragraph and topic */}
                  <div className="flex flex-col gap-4">
                    <h1 className=" text-xl font-semibold">Upload Details</h1>
                    <p className=" text-sm text-gray-600">
                      Upload your presentation details (group detais,
                      presentation...)
                    </p>
                  </div>
                  {/* image */}
                  <div className="flex object-cover">
                    <img
                      className=" object-cover w-[200px] h-[100px]"
                      src={uploadDetails}
                      alt="card image"
                    />
                  </div>
                </div>
              </div>
              {/* guidance of presentatoin card */}
              <div className="p-4 bg-white shadow shadow-orange-600 rounded-xl h-[150px]">
                <div className="flex flex-row gap-2">
                  {/* paragraph and topic */}
                  <div className="flex flex-col gap-4">
                    <h1 className=" text-xl font-semibold">
                      Guidance Of Presentations
                    </h1>
                    <p className=" text-sm text-gray-600">
                      Guide for your presentations
                    </p>
                  </div>
                  {/* image */}
                  <div className="flex  object-cover">
                    <img
                      className=" object-cover w-[300px] h-[100px] "
                      src={guideVideo}
                      alt="card image"
                    />
                  </div>
                </div>
              </div>
              {/* train with ai chat bot */}
              <div className="p-4 bg-white shadow shadow-orange-600 rounded-xl h-[150px]">
                <div className="flex flex-row gap-2">
                  {/* paragraph and topic */}
                  <div className="flex flex-col gap-4">
                    <h1 className=" text-xl font-semibold">
                      Guide with AI chat bot
                    </h1>
                    <p className=" text-sm text-gray-600">
                      Practice the presentation with AI chat bot
                    </p>
                  </div>
                  {/* image */}
                  <div className="flex object-cover">
                    <img
                      className=" object-cover  w-[100px] h-[90px]"
                      src={aichat}
                      alt="card image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <PresentationList />
          </div>
          <div className=" mt-[16px] w-[300px]">
            <CardAndCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
