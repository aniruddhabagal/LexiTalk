const app = require("./app");
const config = require("./config/default");
const logger = require("./utils/logger");

const PORT = config.port || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
