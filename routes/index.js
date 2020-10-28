const express = require("express");
const userRoute = require("../routes/user.routes")
const postsRoute = require("../routes/posts.routes")
const apiRoute = require("./api.routes")
const app = require("express").Router()
const User = require("../models/user.model")
const { ensureAuthentification } = require("../config/secureAuthentification")
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const multer = require("multer")
const path = require('path')
const GridFsStorage = require("multer-gridfs-storage")
const Grid = require('gridfs-stream');
const crypto = require("crypto")
Grid.mongo = mongoose.mongo;
const url =
  "mongodb+srv://badel:badel@cluster0.f8esg.mongodb.net/fakeTwitter?retryWrites=true&w=majority"

  
  
  const storage = new GridFsStorage({ url })
  
  const upload = multer({ storage });
  
  // app.use('/',(req, res) => {
  //   res.sendFile(path.join(__dirname,'../client/build/index.html'))
  // });
  app.use("/api", apiRoute)
  app.use("/user", ensureAuthentification, userRoute)
  app.use("/posts", ensureAuthentification, postsRoute)
  
app.post("/register", upload.single("file"), async (req, res, next) => {
  try {
    const { email, password, username, avatar } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email: email.trim(),
      username: username.trim(),
      password: hashPassword.trim(),
      avatar: req.file ? req.file.filename : null,
      date: new Date().toLocaleDateString().split(":"),
      unique: true,
    })
    await user.save()
    req.login(user)

    res.status(200).send(user)
  } catch (error) {
    res.send({error : error.message})
    // next(error)
  }
})

app.post("/login", async (req, res) => {
  // if(req.cookies.token) res.send(200)
  const userEmail = await User.findOne({
    email: req.body.email.toLowerCase().trim(),
  })
  if (!userEmail) {
    // res.status(403).send(new Error('description'))
    res.send({ error: "email introuvable" })
  } else {
    const match = await bcrypt.compare(req.body.password, userEmail.password)
    if (!match) res.send({error:"mauvais mot de passe"})
    else {
      const userId = userEmail._id
      req.login(userId)
      // res.status(200).send(userEmail)
    }
  }
})

app.post("/logout", (req, res, next) => {
  req.logOut()
  res.status(200).json("déconnecté")
})

app.get('/back', (req, res, next) => {
  res.json(' Voici la partie back-end de l\'application');
})


module.exports = app
