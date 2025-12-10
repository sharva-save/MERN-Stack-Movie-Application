const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    if(connection) {
      console.log("connected to the mongodb");
    }
    
  } catch (error) {
    console.log("error in the connection to the mongodb", error);
  }
};

module.exports = connectToDb;
