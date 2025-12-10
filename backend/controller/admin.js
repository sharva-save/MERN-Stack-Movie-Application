const { default: mongoose } = require("mongoose");

const bcrypt = require("bcrypt");
const adminUser = require("../Schema/adminSchema");

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, passkey } = req.body;
    console.log(name, email, password, passkey);

    const userExist = await adminUser.findOne({ $or: [{ name }, { email }] });

    if (userExist) {
      res.status(200).json({
        message: "admin with this mail or name already exist ",
        success: true,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await adminUser.create({
      name,
      email,
      password: hashedPassword,
      passkey,
    });

    res
      .status(200)
      .json({ message: "admin created successfully", user, success: true });
  } catch (error) {
    console.log("error in the createing the admin", error);
  }
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userExist = await adminUser.findOne({ email });
  if (!userExist) {
    return res
      .status(200)
      .json({ message: "user with this email is not exist", success: true });
  }

  const matchPassword = await bcrypt.compare(password, userExist.password);
  if (!matchPassword) {
    res.status(200).json({ message: "password is incorrect", success: false });
  }

  return res
    .status(200)
    .json({ message: "login successful", userExist, success: true });
};



module.exports = { createAdmin, AdminLogin };
