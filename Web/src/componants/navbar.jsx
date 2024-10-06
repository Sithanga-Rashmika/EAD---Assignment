import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { vendorNotification } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const notifications = useSelector((state) => state.product.notifications);

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);

  const id = "UID_12256";

  useEffect(() => {
    dispatch(vendorNotification(id));
  }, [dispatch]);
  return (
    <>
      <header className="app-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item d-block d-xl-none">
              <a
                className="nav-link sidebartoggler nav-icon-hover"
                id="headerCollapse"
                href="javascript:void(0)"
              >
                <i className="ti ti-menu-2"></i>
              </a>
            </li>
          </ul>
          <div
            className="navbar-collapse justify-content-end px-0"
            id="navbarNav"
          >
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              <li className="nav-item dropdown">
                <a
                  className="nav-link nav-icon-hover"
                  href="javascript:void(0)"
                  id="notificationDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="ti ti-bell-ringing"></i>
                  <div className="notification bg-primary rounded-circle"></div>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                  aria-labelledby="notificationDropdown"
                  style={{
                    width: "20rem",
                    maxHeight: "600px",
                    overflowY: "auto",
                    zIndex: "10",
                  }}
                >
                  <div className="notification-body p-3">
                    <h4
                      style={{
                        fontSize: "1.25rem",
                        color: "#007bff",
                        textAlign: "center",
                      }}
                    >
                      Notifications
                    </h4>
                    {/* Map each notification to its own div */}
                    {notifications.map((data, index) => (
                      <div
                        key={index}
                        className="notification-item"
                        style={{
                          border: "1px solid #ddd",
                          padding: "10px",
                          marginBottom: "8px",
                          borderRadius: "5px",
                          backgroundColor: "#f9f9f9",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f2f2f2")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f9f9f9")
                        }
                      >
                        <strong>Low Stock Alert:</strong> '{data.name}' (
                        {data.productID}) has only{" "}
                        <strong>{data.stockQuantity}</strong> units left. Please
                        top up to avoid running out.
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link nav-icon-hover"
                  href="javascript:void(0)"
                  id="drop2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="../assets/images/profile/user.jpeg"
                    alt=""
                    width="35"
                    height="35"
                    className="rounded-circle"
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                  aria-labelledby="drop2"
                >
                  <div className="message-body">
                    <a
                      href="javascript:void(0)"
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-user fs-6"></i>
                      <p className="mb-0 fs-3">My Profile</p>
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-mail fs-6"></i>
                      <p className="mb-0 fs-3">My Account</p>
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-list-check fs-6"></i>
                      <p className="mb-0 fs-3">My Task</p>
                    </a>
                    <a
                      href="./authentication-login.html"
                      className="btn btn-outline-primary mx-3 mt-2 d-block"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
