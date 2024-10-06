import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.CREATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.CREATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload]
      };
      break;
    case productConstants.CREATE_CATEGORY_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.FETCH_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.FETCH_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: action.payload,
      };
      break;
    case productConstants.FETCH_CATEGORY_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
