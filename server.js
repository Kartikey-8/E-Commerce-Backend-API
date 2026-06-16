const app = require("./src/app");

const connectDB = require("./src/config/db");

const logger = require("./src/utils/logger");

const env = require("./src/config/env");

const PORT = env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
