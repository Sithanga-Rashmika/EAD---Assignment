import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducers from "./productReducers";
import vendorReducer from "./vendorReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducers,
  vendor: vendorReducer,
});

export default rootReducer;
