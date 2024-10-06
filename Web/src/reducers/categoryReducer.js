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
          categories: action.payload,
        };
        break;
      case categoryConstants.CREATE_CATEGORY_FALIURE:
        state = {
          ...state,
          loading: false,
        };
        break;

    }
    return state;
  };