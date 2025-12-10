const express = require("express")
const route = express.Router()

const  {createAdmin,AdminLogin}  = require('../controller/admin')

route.post('/create',createAdmin)
route.post('/login',AdminLogin )

module.exports = route