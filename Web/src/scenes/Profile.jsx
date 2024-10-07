import React, { useState, useEffect } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import userImage from "../assets/images/user.jpeg";
import { updateProfile, userByID } from "../actions/userAction";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Profile = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);
  const oneUser = useSelector((state) => state.user.oneUser);
  const id = user.aRoleID;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    document.title = "My Profile | BizCart";
  }, []);

  useEffect(() => {
    dispatch(userByID(id));
  }, [dispatch]);

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);

  useEffect(() => {
    if (oneUser) {
      setName(oneUser.arName);
      setEmail(oneUser.aRoleEmail);
      setContact(oneUser.arNumber);
      setPwd(oneUser.aRolePasswrod);
    }
  }, [oneUser]);

  const formSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      toast.error("Name required..!");
    } else if (contact === "") {
      toast.error("Contact Number required..!");
    } else if (email === "") {
      toast.error("Email required..!");
    } else if (pwd === "") {
      toast.error("Password required..!");
    } else if (name != "" && contact != "" && email != "" && pwd != "") {
      const form = {
        ARoleID: oneUser.aRoleID,
        ARName: name,
        ARNumber: contact,
        ARoleEmail: email,
        ARolePasswrod: pwd,
        ARoleTyoe: oneUser.aRoleTyoe,
      };

      dispatch(updateProfile(id, form));
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "3rem" }}>
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h5 className="card-title fw-semibold">My Profile</h5>
                </div>
                <img
                  src={userImage}
                  alt="User Image"
                  style={{
                    borderRadius: "50%",
                    marginBottom: "20px",
                    width: "150px",
                    height: "150px",
                  }}
                />
                <p>
                  <strong>User ID:</strong> {user?.aRoleID}
                </p>
                <p>
                  <strong>Name:</strong> {user?.arName}
                </p>
                <p>
                  <strong>Email:</strong> {user?.aRoleEmail}
                </p>
                <p>
                  <strong>Contact Number:</strong> {user?.arNumber}
                </p>
                <p>
                  <strong>Role:</strong> {user?.aRoleTyoe}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-semibold mb-4">Update Profile</h5>
                <div className="list-wrapper">
                  <form onSubmit={formSubmit} encType="multipart/form-data">
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Fullname"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Contact Number"
                        variant="outlined"
                        fullWidth
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="email"
                        label="Enter Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type={showPassword ? "text" : "password"}
                        label="Enter Password"
                        variant="outlined"
                        fullWidth
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary m-1">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
