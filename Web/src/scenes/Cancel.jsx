import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import { cancelReqOrders, changeStatus } from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

const Cancel = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const cancels = useSelector((state) => state.order.cancels);


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
    dispatch(cancelReqOrders());
  }, [dispatch]);

  //accept cancel Order
  const cancelOrder = (data) => {
    const id = data.orderID;
    const form = new FormData();
    form.append("orderStatus", "cancel");

    Swal.fire({
      title: `Are you sure you want to cancel this order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(changeStatus(form, id));
      }
    });
  };
  return (
    <>
      <>
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-semibold">Order Cancel Request</h3>
              <p className="mb-0">
                All the available orders cancellation requests display as below.
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
                  />
                </div>
              </div>
              <div className="table-responsive" style={{ marginTop: "40px" }}>
                <MDBTable hover>
                  <MDBTableHead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">CartID</th>
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
                    {cancels.length > 0 ? (
                      cancels.map((data, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{data.cartID}</td>
                          <td>{data.userID}</td>
                          <td>{parseFloat(data.price).toFixed(2)}</td>
                          <td>{new Date(data.orderDate).toLocaleString()}</td>
                          <td>{data.orderStatus}</td>
                          <td
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Tooltip title="Cancel Order">
                              <DoNotDisturbIcon
                                style={{
                                  cursor: "pointer",
                                  marginRight: "15px",
                                }}
                                onClick={() => cancelOrder(data)}
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
                          No Order Cancellation Requests
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
    </>
  );
};

export default Cancel;
