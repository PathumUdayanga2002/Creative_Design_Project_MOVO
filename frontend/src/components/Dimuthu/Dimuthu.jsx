import React from 'react'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import AsideMenu from '../AsideMenu/AsideMenu'
import Dashboard from '../Dashboard/Dashboard'

export default function Dimuthu() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <HeaderAdmin/>
      <div style={{ display: "flex" }}>
        <AsideMenu/>
        <Dashboard/>
      </div>
    </div>
  )
}