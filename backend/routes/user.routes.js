const router = require("express").Router();

const {addUser,loginUser,getAllMovies} = require('../controller/user')


router.post('/create',addUser)
router.post('/login', loginUser)



module.exports = router