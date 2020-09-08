const mongoose = require("mongoose");
const Userschema = new mongoose.Schema({
  name: { type: String, required: true },
  UserRole: { type: String, required: true },
  Phone: { type: String, required: true },
  Availability: { type: String, required: true },
  Department: { type: String, required: true },
});

module.exports = mongoose.model("users", Userschema);
