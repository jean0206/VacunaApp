const express=require('express')
const serverStatic=require('serve-static')
const path=require('path')



require("dotenv/config");

const app= express()




app.use('/',serverStatic(path.join(__dirname,'/dist')))

const portback=3030
const port= process.env.PORT || 8080
app.listen(port)

