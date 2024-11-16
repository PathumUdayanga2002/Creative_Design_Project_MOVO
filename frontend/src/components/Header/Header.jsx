import React from "react";
import profile from "../../assets/images/profile.jpg";
import aipower from "../../assets/images/aipower.png";


const Header = () => {
  return (
    <div className="flex justify-between w-[1000px] items-center mt-4 font-poppins">
      <div className="flex flex-row items-center gap-3 ">
        <img
          className=" flex object-cover w-[100px] h-[100px] rounded-full"
          src={profile}
          alt="profile logo"
        />
        <div className="flex flex-col space-y-2 mt-2 w-[200px] ">
          <h1 className="text-sm ">Hi, Pathum Udayanga</h1>
          <h1 className="text-sm ">Welcome Back to</h1>
          <h1 className="text-4xl font-bold text-orange-600 ">MOVO</h1>
        </div>
        <div className=" flex ml-[300px]">
          <img src={aipower} className=" h-[150px] w-[500px]" alt=" powered by ai" />
        </div>
      </div>
    </div>
  );
};

export default Header;
