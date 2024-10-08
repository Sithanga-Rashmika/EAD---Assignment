// user reducer File
// IT21041716 Sandaruwan W.S.R
import { userConstants } from "../actions/constants";

const initState = {
  user: {},
  oneUser: {},
  csr: [],
  authenticated: false,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.UPDATE_PROFILE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.UPDATE_PROFILE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.UPDATE_PROFILE_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload.user,
        authenticated: true,
      };
      break;
    case userConstants.LOGIN_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case userConstants.LOGOUT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.GET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_SUCCESS:
      state = {
        ...state,
        loading: false,
        oneUser: action.payload,
      };
      break;
    case userConstants.GET_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.REGISTER_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case userConstants.RETRIVE_USERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.RETRIVE_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        csr: action.payload,
      };
      break;
    case userConstants.RETRIVE_USERS_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
