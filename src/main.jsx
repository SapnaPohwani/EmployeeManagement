import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { InputProvider } from "./context/CommonContext.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InputProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </InputProvider>
  </React.StrictMode>
);
