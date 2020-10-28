const User = require("../models/user.model.js")
const bcrypt = require("bcrypt")

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
}

// Creer un User
exports.createUser = async (req, res, next) => {
  try {
    const { email, password, pseudo, avatar } = req.body
    const url = req.protocol + "://" + req.get("host")
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email: email.trim(),
      pseudo: pseudo.trim(),
      password: hashPassword.trim(),
      avatar: req.file.filename,
      // avatar: url + "/api/medias/files/" + req.file.filename,
      date: new Date().toLocaleDateString().split(":"),
      unique: true,
    })
    await user.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

// Modifier un User

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const newAvatar = req.file.filename;
    await User.findByIdAndUpdate(
      {_id:userId},
      { $set: {avatar : newAvatar} },
      { runValidators: true, useFindAndModify: false }
      )
    res.status(200).send(newAvatar)
  } catch (error) {
    next(error)
  }
}

// Delete un User
exports.deleteUser = async (req, res) => {
  try {
    const adminId = req.params.id
    await User.findByIdAndDelete(adminId)
    res.json("le user est effacé")
  } catch (error) {
    next(error)
  }
}

exports.getCurrentUser = async (req, res, next) => {
  const userEmail = req.user.email
  const user = await User.findOne({ email: userEmail })
  res.send(user)
}
