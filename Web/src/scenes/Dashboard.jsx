import React, { useState, useEffect } from "react";
import { retrivePendings } from "../actions/clientAction";
import { retriveProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReactApexChart from "react-apexcharts";

const DashBoard = () => {
  const dispatch = useDispatch();
  const pendings = useSelector((state) => state.client.pendings);
  const products = useSelector((state) => state.product.products);

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

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-strech">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                  <div className="mb-3 mb-sm-0">
                    <h5 className="card-title fw-semibold">Inventory Chart</h5>
                  </div>
                </div>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="bar"
                  height={350}
                />
              </div>
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
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h5 className="card-title fw-semibold">
                    Recent Transactions
                  </h5>
                </div>
                <ul className="timeline-widget mb-0 position-relative mb-n5">
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      09:30
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-8"></span>
                      <span className="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1">
                      Payment received from John Doe of $385.90
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      10:00 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-info flex-shrink-0 my-8"></span>
                      <span className="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                      New sale recorded{" "}
                      <a
                        href="javascript:void(0)"
                        className="text-primary d-block fw-normal"
                      >
                        #ML-3467
                      </a>
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      12:00 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                      <span className="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1">
                      Payment was made of $64.95 to Michael
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      09:30 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-warning flex-shrink-0 my-8"></span>
                      <span className="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                      New sale recorded{" "}
                      <a
                        href="javascript:void(0)"
                        className="text-primary d-block fw-normal"
                      >
                        #ML-3467
                      </a>
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      09:30 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-danger flex-shrink-0 my-8"></span>
                      <span className="timeline-badge-border d-block flex-shrink-0"></span>
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                      New arrival recorded
                    </div>
                  </li>
                  <li className="timeline-item d-flex position-relative overflow-hidden">
                    <div className="timeline-time text-dark flex-shrink-0 text-end">
                      12:00 am
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                    </div>
                    <div className="timeline-desc fs-3 text-dark mt-n1">
                      Payment Done
                    </div>
                  </li>
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
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">1</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                          <span className="fw-normal">Web Designer</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">Elite Admin</p>
                        </td>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary rounded-3 fw-semibold">
                              Low
                            </span>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$3.9</h6>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">2</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">
                            Andrew McDownland
                          </h6>
                          <span className="fw-normal">Project Manager</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">Real Homes WP Theme</p>
                        </td>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-secondary rounded-3 fw-semibold">
                              Medium
                            </span>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$24.5k</h6>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">3</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">
                            Christopher Jamil
                          </h6>
                          <span className="fw-normal">Project Manager</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">MedicalPro WP Theme</p>
                        </td>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-danger rounded-3 fw-semibold">
                              High
                            </span>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$12.8k</h6>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">4</h6>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-1">Nirav Joshi</h6>
                          <span className="fw-normal">Frontend Engineer</span>
                        </td>
                        <td className="border-bottom-0">
                          <p className="mb-0 fw-normal">Hosting Press HTML</p>
                        </td>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success rounded-3 fw-semibold">
                              Critical
                            </span>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <h6 className="fw-semibold mb-0 fs-4">$2.4k</h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-xl-3">
            <div className="card overflow-hidden rounded-2">
              <div className="position-relative">
                <a href="javascript:void(0)">
                  <img
                    src="../assets/images/products/s4.jpg"
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                </a>
                <a
                  href="javascript:void(0)"
                  className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Add To Cart"
                >
                  <i className="ti ti-basket fs-4"></i>
                </a>{" "}
              </div>
              <div className="card-body pt-3 p-4">
                <h6 className="fw-semibold fs-4">Boat Headphone</h6>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="fw-semibold fs-4 mb-0">
                    $50{" "}
                    <span className="ms-2 fw-normal text-muted fs-3">
                      <del>$65</del>
                    </span>
                  </h6>
                  <ul className="list-unstyled d-flex align-items-center mb-0">
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="card overflow-hidden rounded-2">
              <div className="position-relative">
                <a href="javascript:void(0)">
                  <img
                    src="../assets/images/products/s5.jpg"
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                </a>
                <a
                  href="javascript:void(0)"
                  className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Add To Cart"
                >
                  <i className="ti ti-basket fs-4"></i>
                </a>{" "}
              </div>
              <div className="card-body pt-3 p-4">
                <h6 className="fw-semibold fs-4">MacBook Air Pro</h6>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="fw-semibold fs-4 mb-0">
                    $650{" "}
                    <span className="ms-2 fw-normal text-muted fs-3">
                      <del>$900</del>
                    </span>
                  </h6>
                  <ul className="list-unstyled d-flex align-items-center mb-0">
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="card overflow-hidden rounded-2">
              <div className="position-relative">
                <a href="javascript:void(0)">
                  <img
                    src="../assets/images/products/s7.jpg"
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                </a>
                <a
                  href="javascript:void(0)"
                  className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Add To Cart"
                >
                  <i className="ti ti-basket fs-4"></i>
                </a>{" "}
              </div>
              <div className="card-body pt-3 p-4">
                <h6 className="fw-semibold fs-4">Red Valvet Dress</h6>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="fw-semibold fs-4 mb-0">
                    $150{" "}
                    <span className="ms-2 fw-normal text-muted fs-3">
                      <del>$200</del>
                    </span>
                  </h6>
                  <ul className="list-unstyled d-flex align-items-center mb-0">
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="card overflow-hidden rounded-2">
              <div className="position-relative">
                <a href="javascript:void(0)">
                  <img
                    src="../assets/images/products/s11.jpg"
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                </a>
                <a
                  href="javascript:void(0)"
                  className="bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Add To Cart"
                >
                  <i className="ti ti-basket fs-4"></i>
                </a>{" "}
              </div>
              <div className="card-body pt-3 p-4">
                <h6 className="fw-semibold fs-4">Cute Soft Teddybear</h6>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="fw-semibold fs-4 mb-0">
                    $285{" "}
                    <span className="ms-2 fw-normal text-muted fs-3">
                      <del>$345</del>
                    </span>
                  </h6>
                  <ul className="list-unstyled d-flex align-items-center mb-0">
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="me-1" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                    <li>
                      <a className="" href="javascript:void(0)">
                        <i className="ti ti-star text-warning"></i>
                      </a>
                    </li>
                  </ul>
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
