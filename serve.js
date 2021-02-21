const express=require('express')
const serverStatic=require('serve-static')
const path=require('path')



require("dotenv/config");

const app= express()


app.set('components', path.join(process.cwd() + '/components'));
app.set('views', path.join(process.cwd() + '/views'));
app.use(express.static(path.join(process.cwd() + '/public')));


const portback=3030
const port= process.env.PORT || 8080
app.listen(port)

