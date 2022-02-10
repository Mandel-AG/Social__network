const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    date: {
      type: {},
    },
    index: Number,
  },
  {
    timestamps: true,
  }
);


userSchema.path('email').validate(async (email) => {
  // const emailCount = await mongoose.model('User', userSchema).count({ email: value }, function(err, count) {
    const emailCount = await mongoose.model('User', userSchema).countDocuments({ email })
      return !emailCount
}, 'Email already exists');


userSchema.path('username').validate(async (username) => {
  // const emailCount = await mongoose.model('User', userSchema).count({ email: value }, function(err, count) {
    const usernameCount = await mongoose.model('User', userSchema).countDocuments({ username })
      return !usernameCount
}, 'username already exists');




// userSchema.path('email').validate(() => {
//   return false
// }, 'Email already exist')
// userSchema.pre('save', function(){
//   return User.countDocuments().exec().then((nb)=>{this.index = nb + 1})
//   // return this.model.count().exec().then((nb)=> this.model.index = nb + 1 )
// })

// userSchema.pre('save', function() {
//   return User.countDocuments().exec().then(n => this.index = n + 1);
// });

module.exports = mongoose.model("User", userSchema);
