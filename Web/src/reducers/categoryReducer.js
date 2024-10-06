import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
      break;
    case categoryConstants.CREATE_CATEGORY_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.FETCH_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.FETCH_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: action.payload,
      };
      break;
    case categoryConstants.FETCH_CATEGORY_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.CHANGE_STATUS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.CHANGE_STATUS_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: state.categories.map((category) =>
          category.categoryID === action.payload.categoryID
            ? { ...category, categoryStatus: action.payload.categoryStatus }
            : category
        ),
      };
      break;

    case categoryConstants.CHANGE_STATUS_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case categoryConstants.DELETE_CATEGORY_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
