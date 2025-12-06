import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./app/AppRouter";
import { Toaster } from "react-hot-toast";
import 'remixicon/fonts/remixicon.css'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-center" toastOptions={{
      className: "!z-[9999999999]"
    }} />
    <AppRouter />
  </React.StrictMode>
);
