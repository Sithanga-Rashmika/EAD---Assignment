// main.js File
// IT21041716 Sandaruwan W.S.R
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

//custom imports
import store from "./stores/index.js";
import { Provider } from "react-redux";

window.store = store;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
