import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import {
  retriveOrdersForAdmin,
  ordersVendor,
  changeStatus,
} from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import Swal from "sweetalert2";
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

const Orders = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.user.user);

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
    if (user.aRoleTyoe === "Admin" || user.aRoleTyoe === "CSR") {
      dispatch(retriveOrdersForAdmin());
    } else if (user.aRoleTyoe === "Vendor") {
      const id = user.aRoleID;
      dispatch(ordersVendor(id));
    }
  }, [dispatch, user]);

  //display orders belongs to cart id Group orders by `cartID`
  const groupedOrders = orders.reduce((acc, order) => {
    const { cartID } = order;
    if (!acc[cartID]) {
      acc[cartID] = [];
    }
    acc[cartID].push(order);
    return acc;
  }, {});

  // Function to calculate the total price and determine the status for each cart
  const cartDetails = Object.keys(groupedOrders).map((cartID) => {
    const cartOrders = groupedOrders[cartID];

    // Calculate total price
    const totalPrice = cartOrders.reduce((acc, order) => acc + order.price, 0);

    // Determine status based on the order statuses in the cart
    const statuses = cartOrders.map((order) => order.orderStatus);
    const uniqueStatuses = [...new Set(statuses)];

    let finalStatus = "pending"; // Default status
    if (uniqueStatuses.length === 1) {
      // If all statuses are the same, use that status
      finalStatus = uniqueStatuses[0];
    } else if (uniqueStatuses.includes("pending")) {
      // If there's a pending status, show as pending
      finalStatus = "pending";
    } else if (uniqueStatuses.includes("ready")) {
      // If all are ready or mixed with dispatch, show ready
      finalStatus = "ready";
    } else if (uniqueStatuses.includes("dispatch")) {
      // If some are dispatched, show dispatched
      finalStatus = "dispatched";
    } else if (uniqueStatuses.every((status) => status === "delivered")) {
      // If all orders are delivered, show delivered
      finalStatus = "delivered";
    }

    // Get cart date (assuming all orders in a cart have the same date)
    const cartDate = cartOrders[0].orderDate;
    // Get user ID (assuming all orders in a cart have the same userID)
    const userID = cartOrders[0].userID;

    return {
      cartID,
      userID,
      totalPrice,
      date: cartDate,
      status: finalStatus,
    };
  });

  //view order
  const [shmodal, setShmodal] = useState("");
  const [items, setItems] = useState([]);

  const showModal = (id) => {
    setShmodal(true);

    //filter items
    const filteredOrders = orders.filter((order) => order.cartID === id);
    setItems(filteredOrders);
  };

  const closeModal = () => {
    setShmodal(false);
  };

  const ShowModal = () => {
    return (
      <div>
        <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
          <MDBModalDialog size="xl">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Order Items</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="table-responsive">
                  <MDBTable hover>
                    <MDBTableHead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">OrderID</th>
                        <th scope="col">CartID</th>
                        <th scope="col">UserID</th>
                        <th scope="col">VendorID</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price </th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {items.length > 0 ? (
                        items.map((data, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{data.orderID}</td>
                            <td>{data.cartID}</td>
                            <td>{data.userID}</td>
                            <td>{data.vendorID}</td>
                            <td>{data.productName}</td>
                            <td>{data.quantity}</td>
                            <td>{parseFloat(data.price).toFixed(2)}</td>
                            <td>{new Date(data.orderDate).toLocaleString()}</td>
                            <td>{data.orderStatus}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            style={{ textAlign: "center", padding: "20px" }}
                          >
                            No Items Display
                          </td>
                        </tr>
                      )}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <button class="btn btn-outline-dark m-1" onClick={closeModal}>
                  Close
                </button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  };

  //add modal functions
  const [shstmodal, setstShmodal] = useState(false);
  const [status, setStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [idList, setIdList] = useState([]);

  const showStModal = (id) => {
    setstShmodal(true);
    //filter items
    const filteredOrders = orders.filter((order) => order.cartID === id);
    setIdList(filteredOrders);
  };

  const closeStModal = () => {
    setstShmodal(false);
    setStatus("");
    setOrderId("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === "") {
      toast.error("Status required..!", { id: 1 });
    } else if (orderId === "") {
      toast.error("Order Id required..!", { id: 2 });
    } else if (status != "" && orderId != "") {
      const form = new FormData();
      form.append("orderStatus", status);
      dispatch(changeStatus(form, orderId));
      closeModal();
    }
  };

  const statusModal = () => {
    return (
      <div>
        <MDBModal open={shstmodal} setOpen={setstShmodal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Change Status</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeStModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="list-wrapper">
                  <form encType="multipart/form-data">
                    <div className="form-group mb-3">
                      <TextField
                        select
                        label="Select Order ID"
                        variant="outlined"
                        fullWidth
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                      >
                        {idList.map((data, index) => (
                          <MenuItem value={data.orderID}>
                            {data.orderID}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        select
                        label="Select Order ID"
                        variant="outlined"
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="ready">ready</MenuItem>
                        <MenuItem value="dispatched">dispatched</MenuItem>
                        <MenuItem value="delivered">delivered</MenuItem>
                      </TextField>
                    </div>
                  </form>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <button class="btn btn-outline-dark m-1" onClick={closeStModal}>
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
                  {cartDetails.length > 0 ? (
                    cartDetails.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.cartID}</td>
                        <td>{data.userID}</td>
                        <td>{parseFloat(data.totalPrice).toFixed(2)}</td>
                        <td>{new Date(data.date).toLocaleString()}</td>
                        <td>{data.status}</td>
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="See Details">
                            <VisibilityIcon
                              style={{
                                cursor: "pointer",
                                marginRight: "15px",
                              }}
                              onClick={() => showModal(data.cartID)}
                            />
                          </Tooltip>

                          {user && user.aRoleTyoe === "Vendor" && (
                            <Tooltip title="Change Status">
                              <SettingsApplicationsRoundedIcon
                                style={{
                                  cursor: "pointer",
                                  marginRight: "15px",
                                }}
                                onClick={() => showStModal(data.cartID)}
                              />
                            </Tooltip>
                          )}
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
      {ShowModal()}
      {statusModal()}
    </>
  );
};

export default Orders;
