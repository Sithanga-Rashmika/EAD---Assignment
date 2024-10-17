// sidebar.jsx file 
// IT21041716 Sandaruwan W.S.R
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Sidebar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  console.log(user.aRoleTyoe);
  return (
    <>
      <aside className="left-sidebar">
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <a href="/" className="text-nowrap logo-img">
              <img src="../assets/images/logos/logo1.png" width="180" alt="" />
            </a>
            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-8"></i>
            </div>
          </div>
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Home</span>
              </li>
              <li className="sidebar-item">
                <a
                  className={`sidebar-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  href="/"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-layout-dashboard"></i>
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </a>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Product Management</span>
              </li>
              <li className="sidebar-item">
                <a
                  className={`sidebar-link ${
                    location.pathname === "/products" ? "active" : ""
                  }`}
                  href="/products"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-package"></i>
                  </span>
                  <span className="hide-menu">Manage Product</span>
                </a>
              </li>
              {user && user.aRoleTyoe === "Admin" && (
                <li className="sidebar-item">
                  <a
                    className={`sidebar-link ${
                      location.pathname === "/categories" ? "active" : ""
                    }`}
                    href="/categories"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-tags"></i>
                    </span>
                    <span className="hide-menu">Manage Categories</span>
                  </a>
                </li>
              )}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Inventory Management</span>
              </li>

              <li className="sidebar-item">
                <a
                  className={`sidebar-link ${
                    location.pathname === "/inventory" ? "active" : ""
                  }`}
                  href="/inventory"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-box"></i>
                  </span>
                  <span className="hide-menu">Inventory Control</span>
                </a>
              </li>

              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Order Management</span>
              </li>

              <li className="sidebar-item">
                <a
                  className={`sidebar-link ${
                    location.pathname === "/orders" ? "active" : ""
                  }`}
                  href="/orders"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-receipt"></i>
                  </span>
                  <span className="hide-menu">Orders List</span>
                </a>
              </li>
              {user && user.aRoleTyoe != "Vendor" && (
                <li className="sidebar-item">
                  <a
                    className={`sidebar-link ${
                      location.pathname === "/cancel" ? "active" : ""
                    }`}
                    href="/cancel"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-trash"></i>
                    </span>
                    <span className="hide-menu">Cancellations Request</span>
                  </a>
                </li>
              )}
              {user && user.aRoleTyoe === "Admin" && (
                <>
                  <li className="nav-small-cap">
                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                    <span className="hide-menu">Vendor Management</span>
                  </li>
                  <li className="sidebar-item">
                    <a
                      className={`sidebar-link ${
                        location.pathname === "/vendor" ? "active" : ""
                      }`}
                      href="/vendor"
                      aria-expanded="false"
                    >
                      <span>
                        <i className="ti ti-briefcase"></i>
                      </span>
                      <span className="hide-menu">Vendor Registration</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      className={`sidebar-link ${
                        location.pathname === "/csr" ? "active" : ""
                      }`}
                      href="/csr"
                      aria-expanded="false"
                    >
                      <span>
                        <i className="ti ti-messages"></i>
                      </span>
                      <span className="hide-menu">CSR Registration</span>
                    </a>
                  </li>
                </>
              )}
              {user &&
                (user.aRoleTyoe != "Vendor") && (
                  <>
                    <li className="nav-small-cap">
                      <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                      <span className="hide-menu">User Management</span>
                    </li>

                    <li className="sidebar-item">
                      <a
                        className={`sidebar-link ${
                          location.pathname === "/active" ? "active" : ""
                        }`}
                        href="/active"
                        aria-expanded="false"
                      >
                        <span>
                          <i className="ti ti-user-check"></i>
                        </span>
                        <span className="hide-menu">Account Activation</span>
                      </a>
                    </li>
                    <li className="sidebar-item">
                      <a
                        className={`sidebar-link ${
                          location.pathname === "/reactive" ? "active" : ""
                        }`}
                        href="/reactive"
                        aria-expanded="false"
                      >
                        <span>
                          <i className="ti ti-user-plus"></i>
                        </span>
                        <span className="hide-menu">Account Reactivation</span>
                      </a>
                    </li>
                  </>
                )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
