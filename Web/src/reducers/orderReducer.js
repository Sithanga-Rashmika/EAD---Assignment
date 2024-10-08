import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
  cancels: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.FETCH_ORDERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.FETCH_ORDERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        orders: action.payload,
      };
      break;
    case orderConstants.FETCH_ORDERS_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case orderConstants.FETCH_CENCEL_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.FETCH_CENCEL_SUCCESS:
      state = {
        ...state,
        loading: false,
        cancels: action.payload,
      };
      break;
    case orderConstants.FETCH_CENCEL_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case orderConstants.CANCEL_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.CANCEL_ORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case orderConstants.CANCEL_ORDER_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case orderConstants.ORDER_VENDOR_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.ORDER_VENDOR_SUCCESS:
      state = {
        ...state,
        loading: false,
        orders: action.payload,
      };
      break;
    case orderConstants.ORDER_VENDOR_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
