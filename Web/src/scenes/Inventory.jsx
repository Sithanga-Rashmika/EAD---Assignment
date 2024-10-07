import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import { retriveProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Inventory = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    document.title = "Inventory | BizCart";
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
    dispatch(retriveProducts());
  }, [dispatch]);

  // Grouping products by category and picking the first image per category, along with total quantity
  const categoryCounts = products.reduce((acc, product) => {
    const { category, imageUrl, stockQuantity } = product;

    if (category) {
      // Initialize category if not present in the accumulator
      if (!acc[category]) {
        acc[category] = {
          count: 0, // To keep track of the number of products in this category
          totalQuantity: 0, // To sum up the quantity of all products in this category
          image: imageUrl, // Set the first image found for this category
        };
      }

      // Increment the count for the category
      acc[category].count += 1;

      // Add the stock quantity of the current product to the total quantity
      acc[category].totalQuantity += stockQuantity;
    }

    return acc;
  }, {});

  // Convert the grouped object into an array of objects with category, count, totalQuantity, and image
  const categoryCountArray = Object.entries(categoryCounts).map(
    ([category, { count, totalQuantity, image }]) => ({
      category,
      count,
      totalQuantity, // Include the total quantity for the category
      image: `http://localhost:5154${image}`, // Construct full URL for the image
    })
  );

  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title fw-semibold">Inventory</h3>
            <p className="mb-0">
              All the available categories display as below.
            </p>
            <hr />

            <div
              className="row"
              style={{ marginTop: "3rem", cursor: "pointer" }}
            >
              {categoryCountArray.map((data, index) => (
                <div className="col-sm-6 col-xl-3" key={index}>
                  <Link to={`/category/${data.category}`}>
                    <div className="card overflow-hidden rounded-2">
                      <div className="position-relative">
                        <a href="javascript:void(0)">
                          <img
                            src={`${data.image}`}
                            className="card-img-top rounded-0"
                            alt="..."
                          />
                        </a>
                      </div>
                      <div className="card-body pt-3 p-4">
                        <h3 style={{fontWeight:"700"}}>{data.category}</h3>
                        <h6 className="fw-semibold fs-4 mb-0">
                          Product Count - {data.count}
                        </h6>
                        <h6 className="fw-semibold fs-4 mb-0">
                          Total Quantity - {data.totalQuantity}
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
