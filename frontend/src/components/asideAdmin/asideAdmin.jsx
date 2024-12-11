import React from 'react';
import './asideAdmin.css';
import Dashboard from '../../assets/images/dashboard.svg';
import Calendar from '../../assets/images/calender.svg';
import Notification from '../../assets/images/notification.svg';
import Presentation from '../../assets/images/users.svg';
import Home from '../../assets/images/home.svg';
import Profile from '../../assets/images/pajamas_profile.svg';
import Settings from '../../assets/images/settings.svg';
import LogOut from '../../assets/images/logout.svg';
import Help from '../../assets/images/symbols_help.svg';

const AsideMenu = () => {
  return (
    <aside className="aside-menu">
      <div className="menu-section">
        <h3>Main Menu</h3>
        <ul>
          <li className="active"><img className="icon" src={Dashboard} alt="Dashboard" /> Dashboard</li>
          <li><img className="icon" src={Calendar} alt="Calendar" /> Calendar</li>
          <li><img className="icon" src={Notification} alt="Notification" /> Notification</li>
          <li><img className="icon" src={Presentation} alt="Presentation" /> Presenters</li>
          <li><img className="icon" src={Home} alt="Home" /> Home</li>
        </ul>
      </div>

      <div className="menu-section">
        <h3>Other Menu</h3>
        <ul>
          <li><img className="icon" src={Profile} alt="Profile" /> Profile</li>
          <li><img className="icon" src={Settings} alt="Settings" /> Settings</li>
          <li><img className="icon" src={LogOut} alt="Log Out" /> Log Out</li>
          <li><img className="icon" src={Help} alt="Help" /> Help and Center</li>
        </ul>
      </div>
    </aside>
  );
};

export default AsideMenu;