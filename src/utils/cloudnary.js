import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


    // Configuration//
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET 
    })

   

     const uploadOnCloudinary = async (localFilePath) =>{
      try {
        if(!localFilePath) return null
        //uplode the file on cloudnary//
        const response = await cloudinary.uploader.upload(localFilePath,{ resource_type:"auto"})
        fs.unlinkSync(localFilePath)
        return response;

        //file uplode successful//
        
      } catch (error) {
        console.log("cloudinary uplode error:",error)
        fs.unlinkSync(localFilePath)//remove localy file jab save na ho//
        return null;
        
      }
     }
     export{uploadOnCloudinary}


   