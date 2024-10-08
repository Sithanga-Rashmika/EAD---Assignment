// user accounts active.jsx File
// IT21041716 Sandaruwan W.S.R
import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import {
  retrivePendings,
  rejectAccount,
  acceptAccount,
} from "../actions/clientAction";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import Swal from "sweetalert2";

const Active = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.client.loading);
  const pendings = useSelector((state) => state.client.pendings);

  useEffect(() => {
    document.title = "User Accounts | BizCart";
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
    dispatch(retrivePendings());
  }, [dispatch]);

  //accept  function
  const acceptFunction = (email) => {
    Swal.fire({
      title: `Are you sure you want to Accept this User?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(acceptAccount(email));
      }
    });
  };

  //reject  function
  const rejectFunction = (email) => {
    Swal.fire({
      title: `Are you sure you want to Reject this User?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(rejectAccount(email));
      }
    });
  };

  /*search function */

  const [serQuary, setSerQuary] = useState("");

  const search = (event) => {
    setSerQuary(event.target.value.toLowerCase());
  };

  const filteredPendings = pendings.filter(
    (pending) =>
      pending.name.toLowerCase().includes(serQuary) ||
      pending.contact.toLowerCase().includes(serQuary) ||
      pending.gender.toLowerCase().includes(serQuary) ||
      pending.email.toLowerCase().includes(serQuary) ||
      pending.address.toLowerCase().includes(serQuary)
  );
  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title fw-semibold">Customors</h3>
            <p className="mb-0">
              All the customer who waiting for account acception display as
              below.
            </p>
            <hr />
            <div className="head-section">
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
                    <th scope="col">Name</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Actions
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {pendings.length > 0 ? (
                    filteredPendings.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.name}</td>
                        <td>{data.contact}</td>
                        <td>{data.gender}</td>
                        <td>
                          <a style={{ cursor: "pointer" }}>{data.email}</a>
                        </td>
                        <td>{data.address}</td>
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Activate">
                            <CheckBoxIcon
                              style={{
                                cursor: "pointer",
                                marginRight: "15px",
                              }}
                              onClick={() => acceptFunction(data.email)}
                            />
                          </Tooltip>
                          <Tooltip title="Reject">
                            <DoNotDisturbIcon
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => rejectFunction(data.email)}
                            />
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        No pendings accounts
                      </td>
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Active;
