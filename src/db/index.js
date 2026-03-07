import mongoose from "mongoose";
import {DB_name} from "../constants.js";


const connectDB = async () => {
  try {
     const cannectionInstance = await mongoose.connect(`${process.env.MONGO_DB_url}/${DB_name}`)
     console.log(`database connect !! DB host ${cannectionInstance.connection.host}`);
    
  } catch (error) {
    console.log(`error of canection this ${error}`)
    process.exit(1)
    
  }
  
}
export default connectDB;