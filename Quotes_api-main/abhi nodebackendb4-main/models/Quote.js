const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Quote name is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Quote content is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    length: {
      type: String,
      enum: ["short", "medium", "long"],
      default: "medium",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", QuoteSchema);
