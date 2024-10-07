import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signin } from "../actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);
  const loading = useSelector((state) => state.user.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "") {
      toast.error("Email required..!");
    } else if (password === "") {
      toast.error("Password required..!");
    } else if (email != "" && password != "") {
      const form = {
        ARoleEmail: email,
        ARolePasswrod: password,
      };
      dispatch(signin(form));
      setEmail("");
      setPassword("");
    }
  };

  if (authenticated) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a
                      href="#"
                      className="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <img src={logo} width="180" alt="" />
                    </a>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label for="exampleInputPassword1" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                        type="submit"
                      >
                        Sign In
                      </button>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check"></div>
                        <a className="text-primary fw-bold" href="#">
                          Forgot Password ?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
