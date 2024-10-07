import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
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
  }
  return state;
};
