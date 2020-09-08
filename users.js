const mongoose = require("mongoose");
const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", Userschema);
