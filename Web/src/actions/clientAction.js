// client action file 
// IT21041716 Sandaruwan W.S.R
import { clientConstants } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const retrivePendings = () => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.FETCH_PENDING_REQUEST });

    try {
      const res = await axios.get(
        "http://localhost:5154/api/User/Status/Pending"
      );

      if (res.status === 200) {
        dispatch({
          type: clientConstants.FETCH_PENDING_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: clientConstants.FETCH_PENDING_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({ type: clientConstants.FETCH_PENDING_FALIURE });
          toast.error("No data..!", {
            id: "t3",
          });
        } else {
          dispatch({ type: clientConstants.FETCH_PENDING_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: clientConstants.FETCH_PENDING_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};
export const retriveDeactivates = () => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.FETCH_DEACTIVATE_REQUEST });

    try {
      const res = await axios.get(
        "http://localhost:5154/api/User/Status/Deactivated"
      );

      if (res.status === 200) {
        dispatch({
          type: clientConstants.FETCH_DEACTIVATE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: clientConstants.FETCH_DEACTIVATE_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({ type: clientConstants.FETCH_DEACTIVATE_FALIURE });
          toast.error("No data..!", {
            id: "t3",
          });
        } else {
          dispatch({ type: clientConstants.FETCH_DEACTIVATE_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: clientConstants.FETCH_DEACTIVATE_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const acceptAccount = (email) => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.ACTIVATE_REQUEST });
    try {
      const res = await axios.post(
        `http://localhost:5154/api/User/activate/${email}`
      );

      if (res.status === 200) {
        dispatch({
          type: clientConstants.ACTIVATE_SUCCESS,
        });
        Swal.fire("Accepted!", "Account has been Accepted..!", "success").then(
          () => {
            window.location.reload();
          }
        );
      } else {
        dispatch({ type: clientConstants.ACTIVATE_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: clientConstants.ACTIVATE_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: clientConstants.ACTIVATE_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};
export const rejectAccount = (email) => {
  return async (dispatch) => {
    dispatch({ type: clientConstants.DEACTIVATE_REQUEST });
    try {
      const res = await axios.post(
        `http://localhost:5154/api/User/deactivate/${email}`
      );

      if (res.status === 200) {
        dispatch({
          type: clientConstants.DEACTIVATE_SUCCESS,
        });
        Swal.fire("Rejected!", "Account has been Reject..!", "success").then(
          () => {
            window.location.reload();
          }
        );
      } else {
        dispatch({ type: clientConstants.DEACTIVATE_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: clientConstants.DEACTIVATE_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: clientConstants.DEACTIVATE_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};
