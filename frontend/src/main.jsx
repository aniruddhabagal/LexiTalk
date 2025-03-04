import React from "react";
import ReactDOM from "react-dom/client";
import { createLogger } from "./utils/logger";
import { APP_CONFIG } from "./config/appConfig";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import App from "./App";
import "./index.css";

const logger = createLogger("App");

logger.info("Application initializing", {
  version: APP_CONFIG.VERSION,
  environment: import.meta.env.MODE,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
