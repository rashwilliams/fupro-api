const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      required: false,
    },

    username: {
      type: String,
      required: true,
    },

    categories: {
      type: String,
      // [politics, entertainment, erotic, health]
      required: false,
    },
  },

  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
