const express = require("express"),
  app = express(),
  cors = require("cors");
  require('dotenv').config()
const path = require("path"),
  cookieParser = require("cookie-parser"),
  routing = require("./routes");
  app.use(cookieParser());

require("./database/index");
exports.app = app;


require("./config/jwt.config");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/build'))
  
app.use(routing);

app.use(cors())

if(process.env.NODE_ENV === 'production' ){
}

app.listen( process.env.PORT || 5300);
