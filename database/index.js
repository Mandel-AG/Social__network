const mongoose = require("mongoose");

mongoose
  .connect( process.env.MONGODB_URI ||
    "mongodb+srv://badel:badel@cluster0.f8esg.mongodb.net/fakeTwitter?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("c'est connecté !"))
  .catch((error) => console.log(error));



  module.exports = mongoose.createConnection( process.env.MONGODB_URI ||
    "mongodb+srv://badel:badel@cluster0.f8esg.mongodb.net/fakeTwitter?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

