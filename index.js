const express = require("express"),
  app = express(),
  cors = require("cors");
  require('dotenv').config()
const path = require("path"),
  cookieParser = require("cookie-parser"),
  routing = require("./routes");

require("./database/index");
exports.app = app;


app.use(cookieParser());
require("./config/jwt.config");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/build'))
app.use(routing);

app.listen(process.env.PORT || 5300);
