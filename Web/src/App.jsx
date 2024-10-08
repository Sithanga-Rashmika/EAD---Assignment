import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/custom.css";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "./actions/userAction";

import Layout from "./componants/layout";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import Dashboard from "./scenes/Dashboard";
import Products from "./scenes/Products";
import Categories from "./scenes/Categories";
import Inventory from "./scenes/Inventory";
import Orders from "./scenes/Orders";
import Cancel from "./scenes/Cancel";
import Vendor from "./scenes/Vendor";
import Active from "./scenes/Active";
import Reactive from "./scenes/Reactive";
import Items from "./scenes/Items";
import Profile from "./scenes/profile";
import CSR from "./scenes/CSR";
import AuthLayout from "./scenes/authLayout";

function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, [dispatch, authenticated]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={authenticated ? <AuthLayout /> : <Login />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/active" element={<Active />} />
            <Route path="/reactive" element={<Reactive />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/csr" element={<CSR />} />
            <Route path="/category/:type" element={<Items />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
