import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import memoryUtils from "./utils/storage/memoryUtils";
import storageUtils from "./utils/storage/storageUtils";

// redux
import store from "./redux/store";
import { Provider } from "react-redux";

// update memory from local storage
memoryUtils.user = storageUtils.getUser();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);
