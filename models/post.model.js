const mongoose = require("mongoose");
const { schema } = require("./user.model");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type:[]
    },
    date: {
      type: {},
    },
    hours: {
      type: {},
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
