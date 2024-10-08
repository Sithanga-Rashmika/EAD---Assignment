// layout.jsx file 
// IT21041716 Sandaruwan W.S.R
import React from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div
        class="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <Sidebar />
        <div class="body-wrapper" >
          <Navbar />

          <div class="container" style={{ paddingTop: "70px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
