import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8001"
    : "https://chatlink-xi.vercel.app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
