const { default: mongoose } = require("mongoose");
const user = require("../Schema/userSchema");
const movie = require("../Schema/movieSchema");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { name, email, password, passkey } = req.body;
    console.log(name, email, password, passkey);

    const userExist = await user.findOne({ $or: [{ name }, { email }] });

    if (userExist) {
      res.status(200).json({
        message: "User exist with this mailor name",
        success: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await user.create({
      name,
      email,
      password: hashedPassword,
      passkey,
    });

    res.status(200).json({
      message: "User created successfully",
      success: true,
      data: createUser,
    });
  } catch (error) {
    console.log("error in the createing the user ", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const userExist = await user.findOne({ email });

    if (!userExist) {
      res
        .status(400)
        .json({ message: "user with  this email not exist", success: false });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "password Not matched", success: false });
    }
    res
      .status(200)
      .json({ message: "login successful", success: true, data: userExist });
  } catch (error) {
    console.log("error in the login the user ", error);
  }
};



module.exports = {
  addUser,
  loginUser,
};
