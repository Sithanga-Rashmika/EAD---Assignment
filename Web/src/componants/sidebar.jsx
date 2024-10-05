import React from "react";

const Sidebar = () => {
  return (
    <>
      <aside class="left-sidebar">
        <div>
          <div class="brand-logo d-flex align-items-center justify-content-between">
            <a href="/" class="text-nowrap logo-img">
              <img src="../assets/images/logos/logo1.png" width="180" alt="" />
            </a>
            <div
              class="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i class="ti ti-x fs-8"></i>
            </div>
          </div>
          <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li class="nav-small-cap">
                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span class="hide-menu">Home</span>
              </li>
              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Dashboard</span>
                </a>
              </li>
              <li class="nav-small-cap">
                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span class="hide-menu">Product Management</span>
              </li>
              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/products"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-package"></i>
                  </span>
                  <span class="hide-menu">Manage Product</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/categories"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-tags"></i>
                  </span>
                  <span class="hide-menu">Manage Categories</span>
                </a>
              </li>

              <li class="nav-small-cap">
                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span class="hide-menu">Inventory Management</span>
              </li>

              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/inventory"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-box"></i>
                  </span>
                  <span class="hide-menu">Inventory Control</span>
                </a>
              </li>

              <li class="nav-small-cap">
                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span class="hide-menu">Order Management</span>
              </li>

              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/orders"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-receipt"></i>
                  </span>
                  <span class="hide-menu">Orders List</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/cancel"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-trash"></i>
                  </span>
                  <span class="hide-menu">Cancellations Request</span>
                </a>
              </li>

              <li class="nav-small-cap">
                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span class="hide-menu">Vendor Management</span>
              </li>
              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/vendor"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-briefcase"></i>
                  </span>
                  <span class="hide-menu">Vendor Registration</span>
                </a>
              </li>

              <li class="nav-small-cap">
                <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span class="hide-menu">User Management</span>
              </li>

              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/active"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-user-check"></i>
                  </span>
                  <span class="hide-menu">Account Activation</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a
                  class="sidebar-link"
                  href="/reactive"
                  aria-expanded="false"
                >
                  <span>
                    <i class="ti ti-user-plus"></i>
                  </span>
                  <span class="hide-menu">Account Reactivation</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
