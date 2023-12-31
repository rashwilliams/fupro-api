const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
