// src/utils/logger.js
import { APP_CONFIG } from "../config/appConfig";

const LOG_LEVELS = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
};

class Logger {
  constructor(context) {
    this.context = context;
  }

  _log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: this.context,
      message,
      ...data,
    };

    // Console logging
    switch (level) {
      case LOG_LEVELS.ERROR:
        console.error(JSON.stringify(logEntry));
        break;
      case LOG_LEVELS.WARN:
        console.warn(JSON.stringify(logEntry));
        break;
      case LOG_LEVELS.INFO:
        console.info(JSON.stringify(logEntry));
        break;
      case LOG_LEVELS.DEBUG:
        if (import.meta.env.DEV) {
          console.debug(JSON.stringify(logEntry));
        }
        break;
    }

    // In production, you might want to send logs to a backend service
    if (import.meta.env.PROD) {
      this._sendToLogService(logEntry);
    }
  }

  _sendToLogService(logEntry) {
    // Placeholder for sending logs to a log management service
    // You could implement integration with services like Sentry, LogRocket, etc.
    try {
      // Example: fetch to your backend logging endpoint
      fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logEntry),
      }).catch(console.error);
    } catch (error) {
      console.error("Failed to send log", error);
    }
  }

  error(message, data = {}) {
    this._log(LOG_LEVELS.ERROR, message, data);
  }

  warn(message, data = {}) {
    this._log(LOG_LEVELS.WARN, message, data);
  }

  info(message, data = {}) {
    this._log(LOG_LEVELS.INFO, message, data);
  }

  debug(message, data = {}) {
    this._log(LOG_LEVELS.DEBUG, message, data);
  }
}

// Export a function to create loggers with different contexts
export const createLogger = (context) => new Logger(context);

export default Logger;
