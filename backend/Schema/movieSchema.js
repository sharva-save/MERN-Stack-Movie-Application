const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  certificate: {
    type: String,
    default: "Not Rated"
  },

  duration: {
    type: String, // example: "2h 22m"
    required: true
  },

  rating: {
    type: Number,
    required: true
  },

  votes: {
    type: String, // example: "3.1M"
    required: true
  },

  posterUrl: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("movie", movieSchema);
