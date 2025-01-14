import React, { useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import homeBg from "../../assets/homeBg.png";

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-gray-100 bg-no-repeat w-full"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      {/* Header */}
      <header className="w-full flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-3xl font-bold text-orange-600">MOVO</div>
        <div className="relative space-x-4">
          {/* Login Button */}
          <Link to={"/login"}>
            {" "}
            <button className="px-4 py-2 border border-gray-300 rounded-lg">
              Login
            </button>
          </Link>

          {/* Sign Up Button with Dropdown */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Sign Up
            </button>
            {showDropdown && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-lg border border-gray-200 rounded-lg z-10">
                <Link to={"/register-admin"}>
                  <button className="block px-6 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                    Sign in as Admin
                  </button>
                </Link>
                <Link to={"/register-presenter"}>
                  <button className="block px-6 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                    Sign in as Presenter
                  </button>{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center text-center px-4 mt-12">
        <h1 className="text-4xl md:text-8xl font-bold mb-8">
          Make Your Presentation <br /> Management{" "}
          <span className="text-orange-500">Easier</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-md font-bold">
        Streamline your presentation process with ease and confidence. Our tool offers a seamless way to manage, track, and optimize your presentations, ensuring you stay organized and prepared for every session.
        </p>
        <button className="flex items-center px-6 py-3 bg-orange-500 shadow-lg shadow-gray-500/40 text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition duration-300 space-x-2">
          <span>Presentation Guide</span>
          <IoArrowForwardCircleOutline size={24} />
        </button>
      </main>

      {/* Footer or Other Sections */}
      <section className="mt-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gray-300 px-6 py-4 md:px-16 lg:px-24 rounded-lg shadow-2xl shadow-orange-500">
          About Tool
        </h1>
      </section>
    </div>
  );
};

export default Home;
