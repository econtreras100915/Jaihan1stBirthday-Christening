/**
 * =============================================================================
 *  main.jsx — application entry point
 * =============================================================================
 *  Mounts <App /> into #root and loads the global stylesheet. This is the
 *  file Vite's index.html actually loads via <script type="module">.
 * =============================================================================
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
