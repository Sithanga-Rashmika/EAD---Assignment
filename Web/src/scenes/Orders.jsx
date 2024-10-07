import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import { retriveOrdersForAdmin } from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import Swal from "sweetalert2";

const Orders = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const orders = useSelector((state) => state.order.orders);

  console.log(orders);
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
    dispatch(retriveOrdersForAdmin());
  }, [dispatch]);
  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title fw-semibold">Orders</h3>
            <p className="mb-0">All the available orders display as below.</p>
            <hr />
            <div className="head-section">
              <div className="input-group" id="searchh">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
              </div>
            </div>
            <div className="table-responsive" style={{ marginTop: "40px" }}>
              <MDBTable hover>
                <MDBTableHead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">OrderID</th>
                    <th scope="col">CartID</th>
                    <th scope="col">VendorID</th>
                    <th scope="col">UserID</th>
                    <th scope="col">Total Price </th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Actions
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {orders.length > 0 ? (
                    orders.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.orderID}</td>
                        <td>{data.cartID}</td>
                        <td>{data.vendorID}</td>
                        <td>{data.userID}</td>
                        <td>{data.price}</td>
                        <td>{data.orderDate}</td>
                        <td>{data.orderStatus}</td>
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Change Status">
                            <SettingsApplicationsRoundedIcon
                              style={{
                                cursor: "pointer",
                                marginRight: "15px",
                              }}
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
                        No Orders
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

export default Orders;
