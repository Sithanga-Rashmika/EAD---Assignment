import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { retriveDeactivates, acceptAccount } from "../actions/clientAction";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Reactive = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.client.loading);
  const deactivates = useSelector((state) => state.client.deactivates);

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
    dispatch(retriveDeactivates());
  }, [dispatch]);

  //accept  function
  const acceptFunction = (email) => {
    Swal.fire({
      title: `Are you sure you want to Reactive this User Account?`,
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

  /*search function */

  const [serQuary, setSerQuary] = useState("");

  const search = (event) => {
    setSerQuary(event.target.value.toLowerCase());
  };

  const filteredDeactivates = deactivates.filter(
    (obj) =>
      obj.name.toLowerCase().includes(serQuary) ||
      obj.contact.toLowerCase().includes(serQuary) ||
      obj.gender.toLowerCase().includes(serQuary) ||
      obj.email.toLowerCase().includes(serQuary) ||
      obj.address.toLowerCase().includes(serQuary)
  );
  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title fw-semibold">Deactivated Accounts</h3>
            <p className="mb-0">
              All the deactivated accounts list display as below.
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
                  {deactivates.length > 0 ? (
                    filteredDeactivates.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.name}</td>
                        <td>{data.contact}</td>
                        <td>{data.gender}</td>
                        <td>{data.email}</td>
                        <td>{data.address}</td>
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Re-active Account">
                            <CheckBoxIcon
                              style={{
                                cursor: "pointer",
                                marginRight: "15px",
                              }}
                              onClick={() => acceptFunction(data.email)}
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
                        No deactivated accounts
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

export default Reactive;
