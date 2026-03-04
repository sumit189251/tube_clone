//require ('dotenv').config({path: './env'})//
import dotenv from "dotenv";


import connectDB from "./db/index.js";
dotenv.config({
  path: './.env'
})




connectDB()
.then(()=>{
  app.listen(process.env.PORT || 4000, ()=>{
    console.log(`server running at port :${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.log("mongo db  connection err",err)
})








/*
import express from "express";
const app = express();

(async() => {
  try {

   await mongoose.connect(`${process.env.MONGO_DB_url}/${DB_name}`)
   app.on("error",(error)=>{
    console.log(error);
    throw error
   })

   app.listen(process.env.PORT,()=>{
    console.log(`app is listen on port ${process.env.PORT}`)
   })
   
    
  } catch (error) {
    console.error("Error", error);
    throw error
    
  }
})()*/