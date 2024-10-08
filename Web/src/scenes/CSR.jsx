import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { TextField, MenuItem, InputBase, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { createVendor, DeleteVendor } from "../actions/vendorAction";
import { retriveUsers } from "../actions/userAction";

const CSR = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.vendor.loading);
  const csr = useSelector((state) => state.user.csr);

  const [serQuary, setSerQuary] = useState("");
  const [shmodal, setShmodal] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    document.title = "Vendors | BizCart";
  }, []);

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
    dispatch(retriveUsers());
  }, [dispatch]);

  //add modal functions

  const showModal = (data) => {
    setShmodal(true);
  };

  const closeModal = () => {
    setShmodal(false);
    setName("");
    setContact("");
    setEmail("");
    setPwd("");
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validateMobileNumber = (contact) => {
    const contactPattern = /^[0-9]{10}$/;
    return contactPattern.test(contact);
  };

  const handleSubmit = () => {
    if (name === "") {
      toast.error("Name required..!", { id: 1 });
    } else if (contact === "") {
      toast.error("Contact Number required..!", { id: 2 });
    } else if (!validateMobileNumber(contact)) {
      toast.error("Contact Number must be a 10-digit number!", { id: 5 });
    } else if (email === "") {
      toast.error("Email required..!", { id: 3 });
    } else if (!validateEmail(email)) {
      toast.error("Invalid Email Format!", { id: 6 });
    } else if (pwd === "") {
      toast.error("Password required..!", { id: 4 });
    } else if (name !== "" && contact !== "" && email !== "" && pwd !== "") {
      const prefix = "UID";
      const suffix = Math.floor(100000 + Math.random() * 900000);
      const UID = prefix + "_" + suffix;

      const form = {
        ARoleID: UID,
        ARName: name,
        ARNumber: contact,
        ARoleEmail: email,
        ARolePasswrod: pwd,
        ARoleTyoe: "CSR",
      };
      dispatch(createVendor(form));
      closeModal();
    }
  };

  const AddModal = () => {
    return (
      <div>
        <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Create New CSR Account</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="list-wrapper">
                  <form encType="multipart/form-data">
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
                        type="password"
                        label="Enter Password"
                        variant="outlined"
                        fullWidth
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <button class="btn btn-outline-dark m-1" onClick={closeModal}>
                  Close
                </button>
                <button onClick={handleSubmit} class="btn btn-primary m-1">
                  Submit
                </button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  };

  /*search function */

  const search = (event) => {
    setSerQuary(event.target.value.toLowerCase());
  };

  const filteredCsr = csr.filter(
    (obj) =>
      obj.aRoleID.toLowerCase().includes(serQuary) ||
      obj.arName.toLowerCase().includes(serQuary) ||
      obj.arNumber.toLowerCase().includes(serQuary) ||
      obj.aRoleEmail.toLowerCase().includes(serQuary)
  );

  //delete vendor
  const deleteVendor = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete this CSR?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(DeleteVendor(id));
      }
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title fw-semibold">
              Customer Service Representatives
            </h3>
            <p className="mb-0">
              All the available Customer Service Representatives Accounts
              details display as below.
            </p>
            <hr />
            <div className="head-section">
              <button className="btn btn-info m-1" onClick={showModal}>
                Add New CSR
              </button>
              <div className="input-group" id="searchh">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={serQuary}
                  onChange={search}
                />
              </div>
            </div>
            <div className="table-responsive" style={{ marginTop: "40px" }}>
              <MDBTable hover>
                <MDBTableHead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">UID</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Email</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Actions
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {csr.length > 0 ? (
                    filteredCsr.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.aRoleID}</td>
                        <td>{data.arName}</td>
                        <td>{data.arNumber}</td>
                        <td>
                          <a style={{ cursor: "pointer" }}>{data.aRoleEmail}</a>
                        </td>
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Delete CSR">
                            <DeleteForeverRoundedIcon
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => deleteVendor(data.aRoleID)}
                            />
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No CSR accounts available.
                      </td>
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
      {AddModal()}
    </>
  );
};

export default CSR;
