const secret =  process.env.SECRET_TOKEN;
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { app } = require("../index");


const createToken = async (userId) => {
  const token = jwt.sign({ sub: userId }, secret);
  return token;
};

exports.createToken = createToken;

const extractUserFromToken = async (req, res, next) => {
  const token = await req.cookies.token;
  if (!token) next();
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, secret);
      const userId = await User.findById(decodedToken.sub);
      //error 1
      if (!userId) res.clearCookie("token").sendStatus(301);
      if (userId) {
        req.user = userId;
        next();
      }
    } catch (error) {
      //error 2
      res.clearCookie('token').sendStatus(301);
    }
  }
};


const addJwtFeature = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logOut = () => res.clearCookie("token");
  req.login = async(userId) => {
    const token = await createToken(userId._id);
    // res.cookie("token", token );
    res.send({'token':token})
  };
  next();
};

app.use(extractUserFromToken);
app.use(addJwtFeature);
