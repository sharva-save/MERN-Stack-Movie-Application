const { default: mongoose } = require("mongoose");

const AdminLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminCreateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Name Should be at least of 3 character long"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passkey: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("adminLogin", AdminLoginSchema);
module.exports = mongoose.model("adminUser", AdminCreateSchema);
