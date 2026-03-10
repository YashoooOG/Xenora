const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },

    // auto-generated from name on register
    username: { type: String, unique: true, trim: true },

    // filled later from dashboard
    avatar: { type: String, default: null },
    location: { type: String, default: null },
    bio: { type: String, default: null },
    dob: { type: String, default: null },
    gender: { type: String, default: null },
    nationality: { type: String, default: null },
    badge: { type: String, default: null },

    contact: {
      phone: { type: String, default: null },
      whatsapp: { type: String, default: null },
      instagram: { type: String, default: null },
      discord: { type: String, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
