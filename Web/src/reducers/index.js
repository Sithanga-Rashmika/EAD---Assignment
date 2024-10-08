// index reducer File
// IT21041716 Sandaruwan W.S.R
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducers from "./productReducers";
import vendorReducer from "./vendorReducer";
import clientReducer from "./clientReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducers,
  vendor: vendorReducer,
  client: clientReducer,
  order: orderReducer,
  user: userReducer,
});

export default rootReducer;
