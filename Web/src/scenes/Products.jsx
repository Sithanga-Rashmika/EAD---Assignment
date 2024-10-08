import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { retriveCategory } from "../actions/categoryAction";
import {
  createProducts,
  retriveProducts,
  DeleteProduct,
  updateProducts,
  vendorProducts,
} from "../actions/productActions";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Products = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.user);
  // Search state
  const [serQuary, setSerQuary] = useState("");

  const [productId, setProductID] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  //temp vendor id
  const VendorID = user.aRoleID;

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
    document.title = "Products | BizCart";
  }, []);

  useEffect(() => {
    dispatch(retriveCategory());
  }, [dispatch]);

  useEffect(() => {
    if (user.aRoleTyoe === "Vendor") {
      const id= user.aRoleID;
      dispatch(vendorProducts(id));
    } else {
      dispatch(retriveProducts());
    }
  }, [dispatch, user]);

  //add modal functions
  const [shmodal, setShmodal] = useState(false);

  const showModal = () => {
    setShmodal(true);
  };

  const closeModal = () => {
    setShmodal(false);
    setTitle("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setImage(null);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      toast.error("Title required..!", { id: "p1" });
    } else if (category.trim() === "") {
      toast.error("Category required..!", { id: "p2" });
    } else if (price === "" || isNaN(price) || parseFloat(price) <= 0) {
      toast.error("Price must be a valid number greater than 0..!", {
        id: "p3",
      });
    } else if (quantity === "" || isNaN(quantity) || parseInt(quantity) <= 0) {
      toast.error("Quantity must be a valid number greater than 0..!", {
        id: "p4",
      });
    } else if (description.trim() === "") {
      toast.error("Description required..!", { id: "p5" });
    } else if (!image) {
      toast.error("Please select an image..!", { id: "p6" });
    } else if (
      title != "" &&
      category != "" &&
      price != "" &&
      quantity != "" &&
      description != "" &&
      image != ""
    ) {
      const prefix = "PID";
      const suffix = Math.floor(100000 + Math.random() * 9000000);
      const PID = prefix + "_" + suffix;
      setProductID(PID);

      const form = new FormData();
      form.append("ProductID", productId);
      form.append("VendorID", VendorID);
      form.append("Name", title);
      form.append("Category", category);
      form.append("Price", price);
      form.append("StockQuantity", quantity);
      form.append("Description", description);
      form.append("imageFile", image);

      if (user.aRoleTyoe === "Vendor") {
        dispatch(createProducts(form));
      } else {
        toast.error("Only vendors are allowed to add new products!");
      }
      closeModal();
    }
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        select
                        label="Select Category"
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.map((data, index) => (
                          <MenuItem value={data.categoryName}>
                            {data.categoryName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Price"
                        variant="outlined"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Quantity"
                        variant="outlined"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={handleFileChange}
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
  //update modal functions
  const [shupdatemodal, setShUpdatemodal] = useState(false);

  const showUpdateModal = (data) => {
    setShUpdatemodal(true);
    setProductID(data.productID);
    setTitle(data.name);
    setCategory(data.category);
    setPrice(data.price);
    setQuantity(data.stockQuantity);
    setDescription(data.description);
  };

  const closeUpdateModal = () => {
    setShUpdatemodal(false);
    setProductID("");
    setTitle("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setImage(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      toast.error("Title required..!", { id: "p1" });
    } else if (category.trim() === "") {
      toast.error("Category required..!", { id: "p2" });
    } else if (price === "" || isNaN(price) || parseFloat(price) <= 0) {
      toast.error("Price must be a valid number greater than 0..!", {
        id: "p3",
      });
    } else if (quantity === "" || isNaN(quantity) || parseInt(quantity) <= 0) {
      toast.error("Quantity must be a valid number greater than 0..!", {
        id: "p4",
      });
    } else if (description.trim() === "") {
      toast.error("Description required..!", { id: "p5" });
    } else if (!image) {
      toast.error("Please select an image..!", { id: "p6" });
    } else if (
      title != "" &&
      category != "" &&
      price != "" &&
      quantity != "" &&
      description != "" &&
      image != ""
    ) {
      const form = new FormData();
      form.append("ProductID", productId);
      form.append("VendorID", VendorID);
      form.append("Name", title);
      form.append("Category", category);
      form.append("Price", price);
      form.append("StockQuantity", quantity);
      form.append("Description", description);
      form.append("imageFile", image);

      dispatch(updateProducts(productId, form));
      closeUpdateModal();
    }
  };

  const UpdateProductModal = () => {
    return (
      <div>
        <MDBModal open={shupdatemodal} setOpen={setShUpdatemodal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Update Product</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeUpdateModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="list-wrapper">
                  <form encType="multipart/form-data">
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter ProductID"
                        variant="outlined"
                        fullWidth
                        value={productId}
                        disabled
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        select
                        label="Select Category"
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.map((data, index) => (
                          <MenuItem value={data.categoryName}>
                            {data.categoryName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="number"
                        label="Enter Price"
                        variant="outlined"
                        fullWidth
                        value={price}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <TextField
                        type="text"
                        label="Enter Quantity"
                        variant="outlined"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={handleFileChange}
                      />
                    </div>
                  </form>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <button
                  class="btn btn-outline-dark m-1"
                  onClick={closeUpdateModal}
                >
                  Close
                </button>
                <button onClick={handleUpdate} class="btn btn-primary m-1">
                  Submit
                </button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    );
  };

  //display modal functions
  const [dsmodal, setDsmodal] = useState(false);

  const showDisplayModal = (data) => {
    setDsmodal(true);
    setTitle(data.name);
    setCategory(data.category);
    setDescription(data.description);
    setQuantity(data.stockQuantity);
    setPrice(data.price);
    setImage(data.imageUrl);
  };

  const closeDisplayModal = () => {
    setDsmodal(false);
  };

  const ViewProduct = () => {
    return (
      <div>
        <MDBModal open={dsmodal} setOpen={setDsmodal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>View Item</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={closeDisplayModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="col-sm-10">
                  <div className="card overflow-hidden rounded-2">
                    {/* Product Image Section */}
                    <div className="position-relative">
                      <a href="javascript:void(0)">
                        <img
                          src={`http://localhost:5154${image}`}
                          className="card-img-top rounded-0"
                          alt="Product Image"
                        />
                      </a>
                    </div>
                    {/* Product Details Section */}
                    <div className="card-body pt-3 p-4">
                      {/* Product Name */}
                      <h4 className="fw-semibold fs-4 mb-0">{title}</h4>
                      {/* Category */}
                      <h6 className="fw-normal text-muted mb-3">
                        Category: {category}
                      </h6>
                      {/* Description */}
                      <p
                        className="fw-normal text-dark"
                        style={{ textAlign: "justify" }}
                      >
                        {description}
                      </p>
                      {/* Stock Quantity */}
                      <h6 className="fw-normal text-muted mb-3">
                        Quantity Available: {quantity}
                      </h6>
                      {/* Price Section */}
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="fw-semibold fs-4 mb-0">
                          Price: Rs {parseFloat(price).toFixed(2)}
                        </h5>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <h6 className="fw-normal text-muted mb-3">
                          Vendor ID: {VendorID}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <button
                  className="btn btn-outline-dark m-1"
                  onClick={closeDisplayModal}
                >
                  Close
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

  const filteredProducts = products.filter(
    (product) =>
      (product.productID
        ? product.productID.toLowerCase().includes(serQuary)
        : false) ||
      (product.vendorID
        ? product.vendorID.toLowerCase().includes(serQuary)
        : false) ||
      (product.name ? product.name.toLowerCase().includes(serQuary) : false) ||
      (product.category
        ? product.category.toLowerCase().includes(serQuary)
        : false) ||
      (product.price
        ? product.price.toString().toLowerCase().includes(serQuary)
        : false) ||
      (product.stockQuantity
        ? product.stockQuantity.toString().toLowerCase().includes(serQuary)
        : false)
  );

  //delete  function
  const deleteProduct = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete this Product?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(DeleteProduct(id));
      }
    });
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
                  {filteredProducts.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.productID}</td>
                      <td>{data.vendorID}</td>
                      <td>{data.name}</td>
                      <td>{data.category}</td>
                      <td>{parseFloat(data.price).toFixed(2)}</td>
                      <td>{data.stockQuantity}</td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="View Product">
                          <VisibilityIcon
                            style={{
                              cursor: "pointer",
                              marginRight: "15px",
                            }}
                            onClick={() => showDisplayModal(data)}
                          />
                        </Tooltip>
                        <Tooltip title="Upgrade Product">
                          <SettingsApplicationsRoundedIcon
                            style={{
                              cursor: "pointer",
                              marginRight: "15px",
                            }}
                            onClick={() => showUpdateModal(data)}
                          />
                        </Tooltip>
                        <Tooltip title="Delete Product">
                          <DeleteForeverRoundedIcon
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => deleteProduct(data.productID)}
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
      {AddProductModal()}
      {ViewProduct()}
      {UpdateProductModal()}
    </>
  );
};

export default Products;
