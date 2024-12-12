import React from "react";
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import Dashboard from "./components/Dashboard/Dashboard";


const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <HeaderAdmin/>
      <div style={{ display: "flex" }}>
        <AsideMenu/>
        <Dashboard/>
      </div>
    </div>
  );
};

export default App;