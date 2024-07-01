import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Notifications } from "react-push-notification";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import store from "../store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Notifications />
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
