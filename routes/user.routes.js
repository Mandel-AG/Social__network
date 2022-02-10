const app = require("express").Router();
const GridFsStorage = require("multer-gridfs-storage")
const Grid = require('gridfs-stream');
const crypto = require("crypto")
const mongoose = require('mongoose');
const multer = require("multer")
Grid.mongo = mongoose.mongo;
const url =
  "mongodb+srv://badel:badel@cluster0.f8esg.mongodb.net/fakeTwitter?retryWrites=true&w=majority"

  

  const storage = new GridFsStorage({ url })

  const upload = multer({ storage });


const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
} = require("../controller/user.controller");

//Read
app.get("/", getUsers);

//Create
app.post("/newUser", createUser);

//Update
app.post("/updateUser/:id",upload.single("file"), updateUser);

//Delete
app.delete("/deleteUser/:id", deleteUser);

//Current User
app.get("/currentUser", getCurrentUser);

module.exports = app;
