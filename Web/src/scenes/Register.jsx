// register.jsx File
// IT21041716 Sandaruwan W.S.R
import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { register } from "../actions/userAction";

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
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

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validateMobileNumber = (contact) => {
    const contactPattern = /^[0-9]{10}$/;
    return contactPattern.test(contact);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "") {
      toast.error("Name required..!");
    } else if (contact === "") {
      toast.error("Contact Number required..!");
    } else if (!validateMobileNumber(contact)) {
      toast.error("Invalid Contact Number. Must be a 10-digit number.");
    } else if (email === "") {
      toast.error("Email required..!");
    } else if (!validateEmail(email)) {
      toast.error("Invalid Email Address.");
    } else if (password === "") {
      toast.error("Password required..!");
    } else {
      const prefix = "AID";
      const suffix = Math.floor(100000 + Math.random() * 9000000);
      const AID = prefix + "_" + suffix;
      const form = {
        ARoleID: AID,
        ARName: name,
        ARNumber: contact,
        ARoleEmail: email,
        ARolePasswrod: password,
        ARoleTyoe: "Admin",
      };
      dispatch(register(form));

      setName("");
      setContact("");
      setEmail("");
      setPassword("");
    }
  };

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
                      href="./index.html"
                      className="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <img src={logo} width="180" alt="" />
                    </a>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputtext1"
                          className="form-label"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputtext1"
                          aria-describedby="textHelp"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputContact1"
                          className="form-label"
                        >
                          Contact Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputContact1"
                          aria-describedby="contactHelp"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                      >
                        Sign Up
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">
                          Already have an Account?
                        </p>
                        <a className="text-primary fw-bold ms-2" href="/login">
                          Sign In
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

export default Register;
