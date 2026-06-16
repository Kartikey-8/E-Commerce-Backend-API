const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const logger = require("./utils/logger");

const authRoutes = require("./routes/auth.routes");

const productRoutes = require("./routes/product.routes");

const cartRoutes = require("./routes/cart.routes");

const orderRoutes = require("./routes/order.routes");

const uploadRoutes = require("./routes/upload.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());
 
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);
 
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

app.use(errorMiddleware);

module.exports = app;
