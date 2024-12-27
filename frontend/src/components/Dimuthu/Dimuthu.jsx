import React from 'react'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import AsideMenu from '../AsideMenu/AsideMenu'
import Dashboard from '../Dashboard/Dashboard'
import StudentList from '../StudentList.jsx/StudentList'
import AsideRight from '../AsideRight/AsideRight'
import MyCalendar from '../MyCalendar/MyCalendar'

export default function Dimuthu() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <HeaderAdmin/>
      <div style={{ display: "flex" }}>
        <AsideMenu/>
        <Dashboard/>
        <AsideRight/>
        <MyCalendar/>
      </div>
      {/* <StudentList/> */}
    </div>
  )
}