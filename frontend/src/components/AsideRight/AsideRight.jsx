import React from 'react'
import './AsideRight.css'
import MyCalendar from '../MyCalendar/MyCalendar'

function AsideRight() {
return (
 <div className="menu-right">
    <div className="menu-grid">
       <span>Total Presentation</span>
        <span style={{ color: 'orange', fontSize:40 }}>50</span>
    </div>
    <div className="menu-grid">
        <span>Today Presentation </span>
        <span style={{ color: 'orange', fontSize:40 }}>50</span>
    </div>
    <div className="menu-grid">
       <MyCalendar/>
    </div>
 </div>
)
}

export default AsideRight
