import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
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

const Products = () => {
  useEffect(() => {
    document.title = "Products | BizCart";
  }, []);

  //add modal functions
  const [shmodal, setShmodal] = useState(false);

  const showModal = (data) => {
    setShmodal(true);
  };

  const closeModal = () => {
    setShmodal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const AddProductModal = () => {
    return (
      <div>
        <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add New Product</MDBModalTitle>
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
                        label="Enter Title"
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        select
                        label="Select Category"
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem>hello</MenuItem>
                      </TextField>
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Price"
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Quantity"
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label
                        htmlFor="upload-image"
                        style={{ fontWeight: "bold", marginBottom: "10px" }}
                      >
                        Select Image
                      </label>
                      <TextField
                        id="upload-image"
                        type="file" 
                        variant="outlined"
                        fullWidth
                        inputProps={{ accept: "image/*" }} 
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
            <h3 className="card-title fw-semibold">Products</h3>
            <p className="mb-0">
              All the available product details display as below.
            </p>
            <hr />
            <div className="head-section">
              <button className="btn btn-info m-1" onClick={showModal}>
                Add New Product
              </button>
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
                  <tr>
                    <th scope="row">1</th>
                    <td>PID1234</td>
                    <td>VID5678</td>
                    <td>Product 1</td>
                    <td>Electronics</td>
                    <td>$250</td>
                    <td>100</td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Upgrade Lecture">
                        <SettingsApplicationsRoundedIcon
                          style={{
                            cursor: "pointer",
                            marginRight: "15px",
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete Video">
                        <DeleteForeverRoundedIcon
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>PID2234</td>
                    <td>VID6678</td>
                    <td>Product 2</td>
                    <td>Home Appliance</td>
                    <td>$150</td>
                    <td>50</td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Upgrade Lecture">
                        <SettingsApplicationsRoundedIcon
                          style={{
                            cursor: "pointer",
                            marginRight: "15px",
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete Video">
                        <DeleteForeverRoundedIcon
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>PID3234</td>
                    <td>VID7678</td>
                    <td>Product 3</td>
                    <td>Furniture</td>
                    <td>$450</td>
                    <td>30</td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Upgrade Lecture">
                        <SettingsApplicationsRoundedIcon
                          style={{
                            cursor: "pointer",
                            marginRight: "15px",
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete Video">
                        <DeleteForeverRoundedIcon
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
      {AddProductModal()}
    </>
  );
};

export default Products;
