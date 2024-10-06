import { Route, Routes } from "react-router-dom";
import'./assets/custom.css'

import Layout from "./componants/layout";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import Dashboard from "./scenes/Dashboard";
import Products from './scenes/Products';
import Categories from './scenes/Categories';
import Inventory from './scenes/Inventory';
import Orders from './scenes/Orders';
import Cancel from './scenes/Cancel';
import Vendor from './scenes/Vendor';
import Active from './scenes/Active';
import Reactive from './scenes/Reactive';




function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
