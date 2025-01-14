import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminCountdown from "./Admin/AdminCountdown/AdminCountdown";
import AdminDashboard from "./Admin/AdminDashboardSample/AdminDashboard";
import AdminFileUpload from "./Admin/AdminUpload/AdminFileUpload";
import EmailSender from "./Admin/Email/EmailSender";
import SignInAdmin from "./Admin/SignInAdmin/SignInAdmin";
import Timer from "./Admin/Timer/Timer";
import ViwePresentation from "./Admin/ViwePresentation/ViwePresentation";
import SigninPresenter from "./Presenter/Signin/SigninPresenter";
import UploadPresentation from "./Presenter/UploadPresentation/UploadPresentation";
import UserCountdown from "./Presenter/UserCountdown/UserCountdown";
import UserFileViwe from "./Presenter/UserFileViwe/UserFileViwe";
import AiBot from "./components/AiBot/AiBot";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyCalendar from "./components/MyCalendar/MyCalendar";
import PresenterDashBoard from "./components/PresenterDashboard/PresenterDashBoard";
import UserCountdown from "./Presenter/UserCountdown/UserCountdown";

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
            path="/uplod-presentation"
            element={
              isAuthenticated() ? (
                <UploadPresentation />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/viwe-presentation"
            element={
              isAuthenticated() ? (
                <ViwePresentation />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/email/send-message"
            element={
              isAuthenticated() ? <EmailSender /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/presenter/train-with-ai"
            element={isAuthenticated() ? <AiBot /> : <Navigate to="/login" />}
          />
          <Route
            path="/presenter-view-guidances"
            element={
              isAuthenticated() ? <UserFileViwe /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin-upload-file"
            element={
              isAuthenticated() ? <AdminFileUpload /> : <Navigate to="/login" />
            }
          />
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
              isAuthenticated() ? <AdminCountdown /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/presenter/join-presentation"
            element={
              isAuthenticated() ? <UserCountdown /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register-admin" element={<SignInAdmin />} />
          <Route path="/register-presenter" element={<SigninPresenter />} />
          <Route path="/get-timer" element={<Timer />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Navigate to="/" />} />
        </Routes>
      </Router>

    
    </div>
  );
};

export default App;
