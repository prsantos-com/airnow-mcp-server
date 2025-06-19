import { createLogger, format, transports } from "winston";
import { LOG_LEVEL } from "./config.js";

const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [new transports.File({ filename: 'winston-airnow-mcp-server.log' })],
});

export default logger;
