const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["electronics", "clothing", "furniture", "books", "other"],
    },
    images: [
      {
        type: String, // URL strings
      },
    ],
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "pending"],
      default: "available",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
