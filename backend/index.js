require("dotenv").config();
const express = require("express");
const connectToDb = require("./db/db");
const app = express();
const cors = require('cors')
const port = process.env.PORT;


app.use(express.json())
app.use(cors())
const userRoute = require('./routes/user.routes')
const adminRoute = require('./routes/admin.routes')
const movieRoute = require('./routes/movie.routes')

app.use('/user',userRoute );
app.use('/movie',movieRoute)
app.use('/admin', adminRoute)


connectToDb();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
