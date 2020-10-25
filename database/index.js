const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://badel:badel@cluster0.f8esg.mongodb.net/fakeTwitter?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("c'est connecté !"))
  .catch((error) => console.log(error));



  module.exports = mongoose.createConnection(
    "mongodb+srv://badel:badel@cluster0.f8esg.mongodb.net/fakeTwitter?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )


  // module.exports = async () => await mongoose.createConnection('mongodb+srv://badel:badel@cluster0.f8esg.mongodb.net/fakeTwitter?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
