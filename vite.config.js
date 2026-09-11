/**
 * =============================================================================
 *  vite.config.js
 * =============================================================================
 *  Standard Vite + React setup. @vitejs/plugin-react was already listed as a
 *  dependency but had no config file wiring it in — this registers it so
 *  JSX fast refresh works correctly during `npm run dev`.
 * =============================================================================
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
