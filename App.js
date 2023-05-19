const express = require('express');
const app=express();
const dotenv=require('dotenv');
const path = require("path");

const cookie =require('cookie-parser');
const bodyparser =require('body-parser')
app.use(express.json())
app.use(cookie())
app.use(bodyparser.urlencoded({extended: true}));
const errorMiddleware=require('./midleware/error')
//import routes
const user =require("./Routes/UsersRoute");

const bodyParser = require('body-parser');
app.use("/api/v1", user);

app.use(errorMiddleware);

module.exports=app;


