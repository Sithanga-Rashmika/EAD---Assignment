// orders action file 
// IT21041716 Sandaruwan W.S.R
import { orderConstants } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const retriveOrdersForAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.FETCH_ORDERS_REQUEST });

    try {
      const res = await axios.get("http://localhost:5154/api/MyOrder");

      if (res.status === 200) {
        dispatch({
          type: orderConstants.FETCH_ORDERS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: orderConstants.FETCH_ORDERS_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({ type: orderConstants.FETCH_ORDERS_FALIURE });
          toast.error("No Orders..!", {
            id: "t3",
          });
        } else {
          dispatch({ type: orderConstants.FETCH_ORDERS_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: orderConstants.FETCH_ORDERS_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const cancelReqOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.FETCH_CENCEL_REQUEST });

    try {
      const res = await axios.get(
        "http://localhost:5154/api/MyOrder/Status/requestCancel"
      );

      if (res.status === 200) {
        dispatch({
          type: orderConstants.FETCH_CENCEL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: orderConstants.FETCH_CENCEL_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({ type: orderConstants.FETCH_CENCEL_FALIURE });
          toast.error("No Orders..!", {
            id: "t3",
          });
        } else {
          dispatch({ type: orderConstants.FETCH_CENCEL_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: orderConstants.FETCH_CENCEL_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const changeStatus = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.CANCEL_ORDER_REQUEST });

    try {
      const res = await axios.put(
        `http://localhost:5154/api/MyOrder/UpdateStatus/${id}`,
        form
      );
      if (res.status === 200) {
        dispatch({
          type: orderConstants.CANCEL_ORDER_SUCCESS,
        });
        Swal.fire("Chnaged!", "Order Status has been Changed.", "success").then(
          () => {
            window.location.reload();
          }
        );
      } else {
        dispatch({ type: orderConstants.CANCEL_ORDER_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          dispatch({ type: orderConstants.CANCEL_ORDER_FALIURE });
          toast.error("No Orders..!", {
            id: "t3",
          });
        } else {
          dispatch({ type: orderConstants.CANCEL_ORDER_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: orderConstants.CANCEL_ORDER_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};


export const ordersVendor = (id) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.ORDER_VENDOR_REQUEST });

    try {
      const res = await axios.get(`http://localhost:5154/api/MyOrder/get/${id}`);

      if (res.status === 200) {
        dispatch({
          type: orderConstants.ORDER_VENDOR_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: orderConstants.ORDER_VENDOR_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({ type: orderConstants.ORDER_VENDOR_FALIURE });
          toast.error("No Orders..!", {
            id: "t3",
          });
        } else {
          dispatch({ type: orderConstants.ORDER_VENDOR_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: orderConstants.ORDER_VENDOR_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};