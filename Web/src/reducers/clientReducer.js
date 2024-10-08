// client reducer File
// IT21041716 Sandaruwan W.S.R
import { clientConstants } from "../actions/constants";

const initState = {
  pendings: [],
  deactivates: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case clientConstants.FETCH_PENDING_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case clientConstants.FETCH_PENDING_SUCCESS:
      state = {
        ...state,
        loading: false,
        pendings: action.payload,
      };
      break;
    case clientConstants.FETCH_PENDING_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case clientConstants.FETCH_DEACTIVATE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case clientConstants.FETCH_DEACTIVATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        deactivates: action.payload,
      };
      break;
    case clientConstants.FETCH_DEACTIVATE_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case clientConstants.ACTIVATE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case clientConstants.ACTIVATE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case clientConstants.ACTIVATE_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case clientConstants.DEACTIVATE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case clientConstants.DEACTIVATE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case clientConstants.DEACTIVATE_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
