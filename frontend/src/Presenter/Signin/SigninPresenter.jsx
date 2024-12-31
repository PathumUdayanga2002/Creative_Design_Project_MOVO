import React from "react";
import { Link } from "react-router-dom";
import sbg from "../../assets/signbg.png";
import simage from "../../assets/simage.png";
import axiosInstance from "../../utils/axios";

const SigninPresenter = () => {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const registerPresenter = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/auth/register-presenter", {
        id,
        name,
        email,
        password,
      });
      console.log("Presenter registered successfully:", data);
      alert("Presenter registered successfully!");
    } catch (error) {
      console.error(
        "Error registering presenter:",
        error.response?.data || error
      );
      alert("Failed to register presenter. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen font-poppins flex flex-col items-center bg-gray-100 bg-no-repeat w-full"
      style={{
        backgroundImage: `url(${sbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center mt-[50px]">
        <div className="bg-white flex justify-between p-10 w-[1000px] h-[550px] rounded-xl shadow-lg">
          {/* Image side */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold space-y-5 text-orange-500">
              Welcome to <br /> MOVO
            </h1>
            <img
              className="h-[400px] w-[400px]"
              src={simage}
              alt="Presenter Illustration"
            />
          </div>

          {/* Form side */}
          <div>
            <h1 className="text-3xl font-semibold">Sign Up as a Presenter</h1>
            <form className="mt-5">
              <div className="flex flex-col gap-3">
                <label htmlFor="id">ID</label>
                <input
                  className="border-b border-black p-2"
                  type="text"
                  placeholder="Enter your presenter ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
                <label htmlFor="name">Name</label>
                <input
                  className="border-b border-black p-2"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="email">Email</label>
                <input
                  className="border-b border-black p-2"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  className="border-b border-black p-2"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>
            <Link to="/">
              <button
                onClick={registerPresenter}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg items-center text-center mt-5 hover:bg-orange-600 transition duration-200"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPresenter;
