const app=require('./App')
const dotenv=require('dotenv');
const connection=require('./config/database')
process.on("uncaughtException",err=>{
    console.log(`error:${err}`
    )
    console.log("shutting down server due to uncaught Exception occur");
    process.exit(1)
})
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
connection();



const Server =app.listen(process.env.PORT,()=>{
console.log(`server is working${process.env.PORT}`);

})


//uncaught error
process.on("unhandledRejection",err=>{
    console.log(`error ${err}`)
    console.log("Shutting down due to unhandled Rejection occur");
    Server.close();
    process.exit(1);
})