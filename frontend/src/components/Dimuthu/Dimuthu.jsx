import React from 'react';
import './Dimuthu.css';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import AsideMenu from '../AsideMenu/AsideMenu';
import Dashboard from '../Dashboard/Dashboard';
import AsideRight from '../AsideRight/AsideRight';
import StudentList from '../StudentList/StudentList';

export default function Dimuthu() {
  return (
    <div className="container">
      <div className="one">
        <HeaderAdmin />
      </div>
      <div className="two">
        <AsideMenu />
      </div>
      <div className="three">
        <Dashboard />
      </div>
      <div className="four">
        <StudentList />
      </div>
      <div className="five">
        <AsideRight />
      </div>
    </div>
  );
}

