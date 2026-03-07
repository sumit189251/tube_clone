import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


    // Configuration//
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET 
    })


     uploadOnCloudinary = async (localFilePath) =>{
      try {
        if(!localFilePath) return null
        //uplode the file on cloudnary//
        const responce = await cloudinary.uploader(localFilePath,{ resource_type:"auto"})

        //file uplode successful//
        console.log("file uploaded on cloudinary",responce.url);
        return responce;
        
      } catch (error) {
        fs.unlink(localFilePath)//remove localy file jab save na ho//
        return null;
        
      }
     }
     export {uploadOnCloudinary}


   