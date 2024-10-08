import { userConstants } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const updateProfile = (id, form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.UPDATE_PROFILE_REQUEST });
    try {
      const res = await axios.put(
        `http://localhost:5154/api/arole/${id}`,
        form
      );

      if (res.status === 204) {
        dispatch({
          type: userConstants.UPDATE_PROFILE_SUCCESS,
        });
        window.location.reload();
      } else {
        dispatch({ type: userConstants.UPDATE_PROFILE_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: userConstants.UPDATE_PROFILE_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: userConstants.UPDATE_PROFILE_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const signin = (form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post(
        `http://localhost:5154/api/arole/login`,
        form
      );

      if (res.status === 200) {
        const token = res.data.token;
        const user = res.data.aRole;

        toast.success(`Login Success, Welcome ${user.arName}`, {
          id: "login",
        });
        toast.dismiss("loading");
        cookies.set("Token", token, {
          path: "/",
          maxAge: "3600000",
          sameSite: "lax",
          secure: true,
          httpOnly: false,
        });
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          payload: {
            user,
            token,
          },
        });
      } else {
        dispatch({ type: userConstants.LOGIN_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          dispatch({ type: userConstants.LOGIN_FALIURE });
          toast.error("Invalid Credintial..!", { id: "t2" });
        } else {
          dispatch({ type: userConstants.LOGIN_FALIURE });
          toast.error("Something went wrong..!", { id: "t4" });
        }
      } else if (error.request) {
        dispatch({ type: userConstants.LOGIN_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const isLoggedIn = () => {
  return async (dispatch) => {
    const token = cookies.get("Token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    } else {
      dispatch({
        type: userConstants.LOGIN_FALIURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.LOGOUT_REQUEST });
    localStorage.clear();

    toast.success("Logout successfull..!", {
      id: "logout",
    });
    dispatch({
      type: userConstants.LOGOUT_SUCCESS,
    });
  };
};

export const userByID = (id) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_REQUEST });

    try {
      const res = await axios.get(`http://localhost:5154/api/arole/${id}`);

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: userConstants.GET_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: userConstants.GET_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: userConstants.GET_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const register = (form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.REGISTER_REQUEST });
    try {
      const res = await axios.post(`http://localhost:5154/api/arole`, form);

      if (res.status === 201) {
        toast.success("Registration successfull..!", {
          id: "reg",
        });
        dispatch({
          type: userConstants.REGISTER_SUCCESS,
        });
        window.location.href = "/login";
      } else {
        dispatch({ type: userConstants.REGISTER_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: userConstants.REGISTER_FALIURE });
        toast.error("Something went wrong..!", { id: "t2" });
      } else if (error.request) {
        dispatch({ type: userConstants.REGISTER_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};

export const retriveUsers = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.RETRIVE_USERS_REQUEST });

    try {
      const res = await axios.get("http://localhost:5154/api/arole/role/CSR");

      if (res.status === 200) {
        dispatch({
          type: userConstants.RETRIVE_USERS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: userConstants.RETRIVE_USERS_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({ type: userConstants.RETRIVE_USERS_FALIURE });
          toast.error("No data..!", { id: "t2" });
        }else{
          dispatch({ type: userConstants.RETRIVE_USERS_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: userConstants.RETRIVE_USERS_FALIURE });
        toast.error("Server not respond..!", { id: "t3" });
      }
    }
  };
};
