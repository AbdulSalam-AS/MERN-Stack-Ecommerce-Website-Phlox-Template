require("dotenv").config({ path: "config/config.env" });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require("./routes/userRoutes");
app.use("/api/v1", user);

const product = require("./routes/productRoute");
app.use("/api/v1", product);

const order = require("./routes/orderRoute");
app.use("/api/v1", order);

const payment = require("./routes/paymentRoute");
app.use("/api/v1", payment);

const cart = require("./routes/cartRoute");
app.use("/api/v1", cart);

app.use(errorMiddleware);

module.exports = app;
