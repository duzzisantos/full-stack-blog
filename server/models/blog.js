const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ID: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    media1: {
      type: String,
    },
    media2: {
      type: String,
    },
    paragraph1: {
      type: String,
      required: true,
    },
    paragraph2: {
      type: String,
      required: true,
    },
    paragraph3: {
      type: String,
      required: true,
    },
    subheading1: {
      type: String,
      required: true,
    },
    subheading2: {
      type: String,
      required: true,
    },
    subheading3: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogpost", BlogPost);
