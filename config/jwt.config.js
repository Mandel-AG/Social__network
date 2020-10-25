// const secret = process.env.SECRET_TOKEN;
const secret = 'dddd032b-16b1-4647-a5d7-5b7e69b41763';
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { app } = require("../index");


const createToken = (userId) => {
  const token = jwt.sign({ sub: userId }, secret);
  return token;
};

exports.createToken = createToken;

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) next();
  if (token) {
    try {
      const decodedToken = jwt.verify(token, secret);
      const userId = await User.findById(decodedToken.sub);
      if (!userId) res.clearCookie("token").sendStatus(301);
      if (userId) {
        req.user = userId;
        next();
      }
    } catch (error) {
      // res.clearCookie('token').sendStatus(301);
      console.log("extraction error", error);
    }
  }
};

// const extractUserFromToken = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (token) {
//     try {
//       const decodedToken = jwt.verify(token, secret);
//       const user = await User.findById(decodedToken.sub);
//       if (user) {
//         req.user = user;
//         next();
//       } else {
//         res.clearCookie('token');
//         res.sendStatus(301)
//       }
//     } catch(e) {
//       res.clearCookie('token');
//       res.sendStatus(301)
//     }
//   } else {
//     next();
//   }
// }

const addJwtFeature = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logOut = () => res.clearCookie("token");
  req.login = (userId) => {
    const token = createToken(userId);
    let domain ='herokuapp.com';
    res.cookie("token", token );
    res.send({'token':token})
    // res.cookie("token", token,{ expires: new Date(Date.now() + 9000000), httpOnly: false } );

    // res.cookie("token", token);
  };
  next();
};

app.use(extractUserFromToken);
app.use(addJwtFeature);
