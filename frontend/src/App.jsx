import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminCountdown from "./Admin/AdminCountdown/AdminCountdown";
import AdminDashboard from "./Admin/AdminDashboardSample/AdminDashboard";
import SignInAdmin from "./Admin/SignInAdmin/SignInAdmin";
import SigninPresenter from "./Presenter/Signin/SigninPresenter";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import PresenterDashBoard from "./components/PresenterDashboard/PresenterDashBoard";
import UserCountdown from "./Presenter/UserCountdown/UserCountdown";
import Upload from "./components/Upload/Upload";  
//import Upload from "./components/Upload/Upload.css";

const App = () => {
  const isAuthenticated = () => !!localStorage.getItem("token");
  return (
    <div>
      {/* <SignInAdmin/>
    <SigninPresenter/>
    <Home/>
    <PresenterDashBoard/> */}
      {/* <GoogleCalende/>
    <Events/> */}

      <Router>
        <Routes>
          <Route path="/calendar" element={<MyCalendar />} />
          <Route
            path="/presenter-dashboard"
            element={
              isAuthenticated() ? (
                <PresenterDashBoard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/start-presentation"
            element={
              isAuthenticated() ? 
              <AdminCountdown /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/presenter/join-presentation"
            element={
              isAuthenticated() ? 
              <UserCountdown/> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register-admin" element={<SignInAdmin />} />
          <Route path="/register-presenter" element={<SigninPresenter />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Upload/>

    
    </div>
  );
};

export default App;
