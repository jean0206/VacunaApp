const express=require('express')
const serverStatic=require('serve-static')
const path=require('path')
const mongoose = require("mongoose");
const dataRoutes = require('./routes/stateRoutes')
const userRoutes = require('./routes/userRoutes')
var cors = require('cors')
const bodyParse = require("body-parser");


require("dotenv/config");

const app= express()
const app2=express()


app2.use(cors())
app2.use(bodyParse.json());
app2.use('/state',dataRoutes)
app2.use('/user',userRoutes)
app2.use(express.json())

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      console.log("conectado a la base de datos!");
    }
  );

app.use('/',serverStatic(path.join(__dirname,'/dist')))

const portback=3030
const port= process.env.PORT || 8080
app.listen(port)
app2.listen(portback)
