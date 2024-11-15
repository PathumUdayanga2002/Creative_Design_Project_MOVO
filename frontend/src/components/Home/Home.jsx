import React from 'react';
import homeBg from '../../assets/homeBg.png';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import guider from '../../assets/guider.png';
import student from '../../assets/student.png';

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 bg-no-repeat w-full" style={{ backgroundImage: `url(${homeBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Header */}
        <header className="w-full flex justify-between items-center p-6 bg-white shadow-md">
          <div className="text-3xl font-bold text-orange-600">MOVO</div>
          <div className="space-x-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg">Login</button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">Sign Up</button>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex flex-col items-center text-center px-4 mt-12">
          <h1 className="text-4xl md:text-8xl font-bold mb-8">
            Make Your Presentation <br />Management <span className="text-orange-500">Easier</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Maneesha Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>
          <button className="flex items-center px-6 py-3 bg-orange-500 shadow-lg shadow-gray-500/40 text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition duration-300 space-x-2">
            <span>Presentation Guide</span>
            <IoArrowForwardCircleOutline size={24} />
          </button>
        </main>

        {/* Footer or Other Sections */}
        <section className="mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gray-300 px-6 py-4 md:px-16 lg:px-24 rounded-lg shadow-2xl shadow-orange-500">About Tool</h1>
        </section>
      </div>

      {/* Guider and Presenter Section */}
      <div className="min-h-screen flex flex-col items-center bg-gray-100 bg-no-repeat w-full">
        <section className="mt-16 flex flex-col items-center">
          <div className="flex flex-row items-start space-x-16">
            {/* Guider */}
            <div className="flex items-center space-x-6">
              <div className="w-40 h-40 bg-orange-200 flex items-center justify-center rounded-lg shadow-lg">
                <img src={guider} alt="Guider" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Guider</h3>
                <p className="text-gray-600 mt-2 max-w-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
            </div>

            {/* Presenter */}
            <div className="flex items-center space-x-6">
              <div className="w-40 h-40 bg-yellow-200 flex items-center justify-center rounded-lg shadow-lg">
                <img src={student} alt="Presenter" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Presenter</h3>
                <p className="text-gray-600 mt-2 max-w-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
