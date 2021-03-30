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

//Temporaire
app.get(['/login','/register','/home'], (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
  

app.use(routing);
app.use(cors())
app.listen( process.env.PORT || 5300);
