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
import { VoiceNarrationProvider } from "./context/VoiceNarrationContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ttsFallbackEnabled stays false — the browser's pitch-shifted robot
        voice doesn't sound like a real kid. Sections play nothing until a
        real recording is added (see src/assets/voice/README.md). Flip to
        true only for temporary local testing. */}
    <VoiceNarrationProvider ttsFallbackEnabled={false}>
      <App />
    </VoiceNarrationProvider>
  </React.StrictMode>
);
