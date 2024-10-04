import { Route, Routes } from "react-router-dom";

import Layout from "./componants/layout";
import Home from "./scenes/home";
import Login from "./scenes/Login";
import Register from "./scenes/Register";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
