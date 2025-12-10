
const express = require("express")
const route = express.Router()
const { getAllMovies,addMovie} =  require('../controller/movie')

route.get('/getallmovie', getAllMovies)
route.post('/addmovie', addMovie)

module.exports = route
