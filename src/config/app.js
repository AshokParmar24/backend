const express = require("express");
const indexRoute = require("../routes/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", indexRoute);

module.exports = app;
