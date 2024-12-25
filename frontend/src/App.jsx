import React from "react";
import PresenterDashBoard from "./components/PresenterDashboard/PresenterDashBoard";
import Home from "./components/Home/Home";
import SigninPresenter from "./Presenter/Signin/SigninPresenter";
import SignInAdmin from "./Admin/SignInAdmin/SignInAdmin";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Login";
import GoogleCalende from "./components/GoogleCalender/GoogleCalende";
import Events from "./components/events/events";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import AiBot from "./components/AiBot/AiBot";

const App = () => {

  const isAuthenticated = () => !!localStorage.getItem("token");
  return <div>
    {/* <SignInAdmin/>
    <SigninPresenter/>
    <Home/>
    <PresenterDashBoard/> */}
    {/* <GoogleCalende/>
    <Events/> */}
    <AiBot/>

<Router>
  <Routes>
  <Route path="/calendar" element={<MyCalendar/>} />
    <Route path="/presenter-dashboard" element={isAuthenticated() ?<PresenterDashBoard/>:<Navigate to="/login" />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register-admin" element={<SignInAdmin/>} />
    <Route path="/register-presenter" element={<SigninPresenter/>} />
    <Route path="/" element={<Home />} />
  </Routes>
</Router>
    
  </div>;
};

export default App;
