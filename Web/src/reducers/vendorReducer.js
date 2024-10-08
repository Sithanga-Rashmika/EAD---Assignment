// vendor reducer File
// IT21041716 Sandaruwan W.S.R
import { vendorConstants } from "../actions/constants";

const initState = {
  vendors: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case vendorConstants.CREATE_VENDOR_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case vendorConstants.CREATE_VENDOR_SUCCESS:
      state = {
        ...state,
        loading: false,
        vendors: [...state.vendors, action.payload]
      };
      break;
    case vendorConstants.CREATE_VENDOR_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case vendorConstants.FETCH_VENDOR_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case vendorConstants.FETCH_VENDOR_SUCCESS:
      state = {
        ...state,
        loading: false,
        vendors: action.payload,
      };
      break;
    case vendorConstants.FETCH_VENDOR_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case vendorConstants.DELETE_VENDOR_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case vendorConstants.DELETE_VENDOR_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case vendorConstants.DELETE_VENDOR_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
