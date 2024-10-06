import { categoryConstants } from './constants';
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";


export const createCategory = (form) => {
    return async (dispatch) => {
      dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST });
      try {
        const res = await axios.post("http://localhost:5005/api/bike/createBike", form);
  
        if (res.status === 201) {
          dispatch({
            type: categoryConstants.CREATE_CATEGORY_SUCCESS,
            payload: res.data.payload,
          });
          toast.success("New Category Created..!", { id: "t5" });
        } else {
          dispatch({ type: categoryConstants.CREATE_CATEGORY_FALIURE });
          toast.error("Something went wrong..!", { id: "t1" });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 404 || error.response.status === 500) {
            dispatch({ type: categoryConstants.CREATE_CATEGORY_FALIURE });
            toast.error("Something went wrong..!" , { id: "t2" });
          }
        } else if (error.request) {
          dispatch({ type: categoryConstants.CREATE_CATEGORY_FALIURE });
          toast.error("No response from the server..!", { id: "t3" });
        } 
      }
    };
  };