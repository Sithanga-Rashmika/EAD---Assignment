import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
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
import {
  retriveProductsByCategory,
  topUpStock,
} from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.catProducts);

  const { type } = useParams();
  const [number, setNumber] = useState("");
  const [productId, setProductId] = useState("");
  const [operation, setOperation] = useState("");
  console.log(operation);
  console.log(number);

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
    document.title = "Inventory | BizCart";
  }, []);

  useEffect(() => {
    dispatch(retriveProductsByCategory(type));
  }, [dispatch]);

  //add modal functions
  const [shmodal, setShmodal] = useState(false);

  const showModal = (data) => {
    setShmodal(true);
    setProductId(data.productID);
  };

  const closeModal = () => {
    setShmodal(false);
    setNumber("");
    setProductId("");
    setOperation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number === "") {
      toast.error("Quantity required..!", { id: 1 });
    } else if (number != "") {
      const form = {
        value: number,
        operation: operation,
      };
      dispatch(topUpStock(productId, form));
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
                <MDBModalTitle>Top Up</MDBModalTitle>
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
                        select
                        label="Select Operation"
                        variant="outlined"
                        fullWidth
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                      >
                        <MenuItem value="topup">topup</MenuItem>
                        <MenuItem value="remove">remove</MenuItem>
                      </TextField>
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="number"
                        label="Enter Quantity"
                        variant="outlined"
                        fullWidth
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
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

  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title fw-semibold">{type}</h3>
            <p className="mb-0">
              All the available items belongs to {type} display as below.
            </p>
            <hr />
            <div className="head-section">
              <a className="btn btn-info m-1" href="/inventory">
                Back
              </a>
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
                    <th scope="col">PID</th>
                    <th scope="col">VID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Actions
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {products.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.productID}</td>
                      <td>{data.vendorID}</td>
                      <td>{data.name}</td>
                      <td>{data.category}</td>
                      <td>{parseFloat(data.price).toFixed(2)}</td>
                      <td
                        style={{
                          color: data.stockQuantity < 20 ? "red" : "inherit",
                          fontWeight: data.stockQuantity < 20 ? 700 : 400,
                        }}
                      >
                        {data.stockQuantity}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="Top-Up Inventory">
                          <SettingsApplicationsRoundedIcon
                            style={{
                              cursor: "pointer",
                              marginRight: "15px",
                            }}
                            onClick={() => showModal(data)}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
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

export default Orders;
