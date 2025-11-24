import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./app/AppRouter";
import { Toaster } from "react-hot-toast";
import 'remixicon/fonts/remixicon.css'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
    <Toaster position="top-center" />
  </React.StrictMode>
);
