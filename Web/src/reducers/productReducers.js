import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.CREATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.CREATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      };
      break;
    case productConstants.CREATE_PRODUCT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.FETCH_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.FETCH_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        products: action.payload,
      };
      break;
    case productConstants.FETCH_PRODUCT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.UPDATE_PRODUCT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
