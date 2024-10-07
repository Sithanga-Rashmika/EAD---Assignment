import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducers from "./productReducers";
import vendorReducer from "./vendorReducer";
import clientReducer from "./clientReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducers,
  vendor: vendorReducer,
  client: clientReducer,
  order: orderReducer,
});

export default rootReducer;
