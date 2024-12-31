import React from "react";
import { useNavigate } from "react-router-dom";
import lbg from "../../assets/lbg.png";
import limage from "../../assets/logimage.png";
import axiosInstance from "../../utils/axios";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      if (data.role === "admin") {
        navigate("/admin-dashboard");
        console.log("admin dashboard");
      } else if (data.role === "presenter") {
        navigate("/presenter-dashboard");
        console.log("presenter dashboard");
        console.log(data);
      }
    } catch (error) {
      // console.log(error.massage);
      console.error("Login Failed", error.response.data);
    }
  };

  return (
    <div
      className="min-h-screen font-poppins flex flex-col items-center bg-gray-100 bg-no-repeat w-full"
      style={{
        backgroundImage: `url(${lbg})`,
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
              src={limage}
              alt="Presenter Illustration"
            />
          </div>

          {/* Form side */}
          <div>
            <h1 className="text-3xl font-semibold">User Login</h1>
            <form className="mt-5">
              <div className="flex flex-col gap-3">
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

            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg items-center text-center mt-5 hover:bg-orange-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
