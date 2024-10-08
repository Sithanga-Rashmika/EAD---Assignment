// dashboard.jsx File
// IT21041716 Sandaruwan W.S.R
import React, { useState, useEffect } from "react";
import { retrivePendings } from "../actions/clientAction";
import { retriveProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { vendorNotification } from "../actions/productActions";

const DashBoard = () => {
  const dispatch = useDispatch();
  const pendings = useSelector((state) => state.client.pendings);
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.user);

  const notifications = useSelector((state) => state.product.notifications);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    document.title = "Dashboard | BizCart";
  }, []);

  useEffect(() => {
    dispatch(retrivePendings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(retriveProducts());
  }, [dispatch]);

  //realtime date function
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = `${currentTime
    .getDate()
    .toString()
    .padStart(2, "0")}-${(currentTime.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentTime.getFullYear()}`;
  const formattedTime = currentTime.toLocaleTimeString();
  const dayName = currentTime.toLocaleDateString("en-US", { weekday: "long" });

  //count the users who waiting until account accept
  const pendingCount = pendings.length;

  // product category count from products array
  const categoryCounts = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += 1;
    return acc;
  }, {});

  // Prepare data for the chart
  const categories = Object.keys(categoryCounts); // X-axis labels
  const counts = Object.values(categoryCounts); // Y-axis values

  // ApexChart options and data
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },

    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#6c757d",
          fontSize: "12px",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Items",
        style: {
          colors: "#6c757d",
          fontSize: "12px",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
        },
      },
    },
    colors: ["#008FFB"], // Set a custom color for bars
    dataLabels: {
      enabled: true,
    },
  };

  const chartSeries = [
    {
      name: "Items",
      data: counts, // Values for each category
    },
  ];

  const id = user.aRoleID;

  useEffect(() => {
    dispatch(vendorNotification(id));
  }, [dispatch]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-strech">
            <div className="card w-100">
              <Link to="/inventory">
                <div className="card-body">
                  <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                    <div className="mb-3 mb-sm-0">
                      <h5 className="card-title fw-semibold">
                        Inventory Chart
                      </h5>
                    </div>
                  </div>
                  <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    height={350}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-lg-12">
                <div className="card overflow-hidden">
                  <div className="card-body p-4">
                    <h5 className="card-title mb-9 fw-semibold">{dayName}</h5>
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h4 className="fw-semibold mb-3">{formattedDate}</h4>
                        <div className="d-flex align-items-center mb-3">
                          <p className="text-dark me-1 fs-3 mb-0">
                            {formattedTime}
                          </p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                            <AccessTimeIcon fontSize="large" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/active">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row alig n-items-start">
                        <div className="col-8">
                          <h5 className="card-title mb-9 fw-semibold">
                            {" "}
                            New User Accounts{" "}
                          </h5>
                          <h4 className="fw-semibold mb-3">{pendingCount}</h4>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-end">
                            <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                              <PersonIcon fontSize="large" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/orders">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row alig n-items-start">
                        <div className="col-8">
                          <h5 className="card-title mb-9 fw-semibold">
                            {" "}
                            Total Active Orders{" "}
                          </h5>
                          <h4 className="fw-semibold mb-3">{pendingCount}</h4>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-end">
                            <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                              <PersonIcon fontSize="large" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h5 className="card-title fw-semibold">
                    Low Stocks Notifications
                  </h5>
                </div>
                <ul className="timeline-widget mb-0 position-relative mb-n5">
                  {notifications.map((data, index) => (
                    <li className="timeline-item d-flex position-relative overflow-hidden">
                      <div className="timeline-time text-dark flex-shrink-0 text-end">
                        {data.productID}
                      </div>
                      <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                        <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-8"></span>
                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                      </div>
                      <div className="timeline-desc fs-3 text-dark mt-n1">
                        {data.name} has only {data.stockQuantity} units left.
                        Please top up to avoid running out.
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-semibold mb-4">
                  Recent Transactions
                </h5>
                <div className="table-responsive">
                  <table className="table text-nowrap mb-0 align-middle">
                    <thead className="text-dark fs-4">
                      <tr>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Id</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Assigned</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Name</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Priority</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Budget</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr> No Records</tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
