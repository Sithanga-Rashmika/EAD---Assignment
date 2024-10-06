import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
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
import toast from "react-hot-toast";
import {
  createCategory,
  retriveCategory,
  changeCategoryStatus,
  deleteCategory,
} from "../actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";

const Categories = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.category.loading);
  const categories = useSelector((state) => state.category.categories);

  const [category, setCategory] = useState("");
  // Search state
  const [serQuary, setSerQuary] = useState("");

  useEffect(() => {
    document.title = "Categories | BizCart";
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
    dispatch(retriveCategory());
  }, [dispatch]);

  //add modal functions
  const [shmodal, setShmodal] = useState(false);

  const showModal = (data) => {
    setShmodal(true);
  };

  const closeModal = () => {
    setShmodal(false);
    setCategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category === "") {
      toast.error("Category required..!", { id: 1 });
    } else if (category != "") {
      const prefix = "CID";
      const suffix = Math.floor(100000 + Math.random() * 900000);
      const CID = prefix + "_" + suffix;
      const form = {
        CategoryID: CID,
        CategoryName: category,
        CategoryStatus: true,
      };
      dispatch(createCategory(form));
      closeModal();
    }
  };

  const AddCategoryModal = () => {
    return (
      <div>
        <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add New Category</MDBModalTitle>
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
                        label="Enter Category"
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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

  const filteredCategories = categories.filter(
    (category) =>
      category.categoryID.toLowerCase().includes(serQuary) ||
      category.categoryName.toLowerCase().includes(serQuary) ||
      (category.categoryStatus ? "active" : "deactivated").includes(serQuary)
  );

  //change status function
  const updateStatus = (data, val) => {
    const form = {
      CategoryId: data.categoryID,
      Val: val,
    };
    Swal.fire({
      title: `Are you sure you want to ${
        val ? "Activate" : "Deactivate"
      } this Category?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(changeCategoryStatus(form));
      }
    });
  };

  //delete  function
  const deleteCategoryFunction = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete this Category?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id));
      }
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title fw-semibold">Categories</h3>
            <p className="mb-0">
              All the available categories display as below.
            </p>
            <hr />
            <div className="head-section">
              <button className="btn btn-info m-1" onClick={showModal}>
                Add New Category
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
                    <th scope="col">CID</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Actions
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filteredCategories.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.categoryID}</td>
                      <td>{data.categoryName}</td>
                      <td
                        style={{ color: data.categoryStatus ? "green" : "red" }}
                      >
                        {data.categoryStatus ? "Active" : "Deactivated"}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="Activate Category">
                          <CheckBoxIcon
                            style={{
                              cursor: "pointer",
                              marginRight: "15px",
                            }}
                            onClick={() => updateStatus(data, true)}
                          />
                        </Tooltip>
                        <Tooltip title="Deactivate Category">
                          <DoNotDisturbIcon
                            style={{
                              cursor: "pointer",
                              marginRight: "15px",
                            }}
                            onClick={() => updateStatus(data, false)}
                          />
                        </Tooltip>
                        <Tooltip title="Delete Category">
                          <DeleteForeverRoundedIcon
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              deleteCategoryFunction(data.categoryID)
                            }
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
      {AddCategoryModal()}
    </>
  );
};

export default Categories;
