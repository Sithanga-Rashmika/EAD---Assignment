import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="app-header">
        <nav className="navbar navbar-expand-lg navbar-light"  >
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
          <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
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
                  style={{ width: "20rem", zIndex:"10" }}
                >
                  <div className="notification-body p-3">
                    <h4 style={{ fontSize: "1.25rem", color: "#007bff" }}>
                      Notifications
                    </h4>
                    <a href="javascript:void(0)" className="dropdown-item">
                      New comment on your post
                    </a>
                    <a href="javascript:void(0)" className="dropdown-item">
                      You have 5 new messages
                    </a>
                    <a href="javascript:void(0)" className="dropdown-item">
                      Your profile has been updated
                    </a>
                    <a href="javascript:void(0)" className="dropdown-item">
                      New friend request
                    </a>
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
