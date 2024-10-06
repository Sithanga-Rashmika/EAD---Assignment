import { vendorConstants } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const createVendor = (form) => {
  return async (dispatch) => {
    dispatch({ type: vendorConstants.CREATE_VENDOR_REQUEST });
    try {
      const res = await axios.post(
        "http://localhost:5154/api/arole",
        form
      );

      if (res.status === 201) {
        dispatch({
          type: vendorConstants.CREATE_VENDOR_SUCCESS,
          payload: res.data,
        });

        toast.success("New Vendor Created..!", { id: "t5" });
      } else {
        dispatch({ type: vendorConstants.CREATE_VENDOR_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: vendorConstants.CREATE_VENDOR_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: vendorConstants.CREATE_VENDOR_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const retriveVendor = () => {
  return async (dispatch) => {
    dispatch({ type: vendorConstants.FETCH_VENDOR_REQUEST });

    try {
      const res = await axios.get("http://localhost:5154/api/arole/role/Vendor");
      console.log(res)

      if (res.status === 200) {
        dispatch({
          type: vendorConstants.FETCH_VENDOR_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: vendorConstants.FETCH_VENDOR_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: vendorConstants.FETCH_VENDOR_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: vendorConstants.FETCH_VENDOR_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const DeleteVendor = (id) => {
  return async (dispatch) => {
    dispatch({ type: vendorConstants.DELETE_VENDOR_REQUEST });
    try {
      const res = await axios.delete(`http://localhost:5154/api/arole/${id}`);
      if (res.status === 204) {
        dispatch({ type: vendorConstants.DELETE_VENDOR_SUCCESS });

        Swal.fire("Deleted!", "Vendor has been Removed.", "success").then(
          () => {
            window.location.reload();
          }
        );
      } else {
        dispatch({ type: vendorConstants.DELETE_VENDOR_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: vendorConstants.DELETE_VENDOR_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: vendorConstants.DELETE_VENDOR_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

