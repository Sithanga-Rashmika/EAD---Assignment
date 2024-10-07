import { categoryConstants } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const createCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST });
    try {
      const res = await axios.post("http://localhost:5154/api/category", form);

      if (res.status === 201) {
        dispatch({
          type: categoryConstants.CREATE_CATEGORY_SUCCESS,
          payload: res.data,
        });

        toast.success("New Category Created..!", { id: "t5" });
      } else {
        dispatch({ type: categoryConstants.CREATE_CATEGORY_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: categoryConstants.CREATE_CATEGORY_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: categoryConstants.CREATE_CATEGORY_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const retriveCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.FETCH_CATEGORY_REQUEST });

    try {
      const res = await axios.get("http://localhost:5154/api/category");

      if (res.status === 200) {
        dispatch({
          type: categoryConstants.FETCH_CATEGORY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: categoryConstants.FETCH_CATEGORY_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: categoryConstants.FETCH_CATEGORY_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: categoryConstants.FETCH_CATEGORY_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const changeCategoryStatus = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.CHANGE_STATUS_REQUEST });
    try {
      const res = await axios.put(
        "http://localhost:5154/api/category/update-status",
        form
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: categoryConstants.CHANGE_STATUS_SUCCESS,
          payload: res.data,
        });
        Swal.fire("Changed!", "Status has been Changed.", "success");
      } else {
        dispatch({ type: categoryConstants.CHANGE_STATUS_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: categoryConstants.CHANGE_STATUS_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: categoryConstants.CHANGE_STATUS_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
    try {
      const res = await axios.delete(
        `http://localhost:5154/api/category/${id}`
      );

      if (res.status === 204) {
        dispatch({ type: categoryConstants.DELETE_CATEGORY_SUCCESS });

        Swal.fire("Deleted!", "Category has been Deleted.", "success").then(
          () => {
            window.location.reload();
          }
        );
      } else {
        dispatch({ type: categoryConstants.DELETE_CATEGORY_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: categoryConstants.DELETE_CATEGORY_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: categoryConstants.DELETE_CATEGORY_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};
