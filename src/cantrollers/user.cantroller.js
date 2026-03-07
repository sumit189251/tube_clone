import {asyncHandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/apiError.js"
import { user } from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import {apiResponce} from "../utils/apiResponce.js"

const registeruser = asyncHandler(async (req,res)=>{
    //get user detail from frontend
    //check validation not_ empty
    //user alrady exixt username, email check
    //check avtar and image
    //uplode success on cloudnary or not
    //creat user object in DB
    //remove pass frome responce token
    //check user creation
    //return responce

    const{fullname , email ,username , password} = req.body
    console.log("email :", email);

    //check velidation empty to nhi hai
    if([fullname,username,email,password].some((field)=>field?.trim()==="")){
        throw new apiError(400,"fullname is requared")

    }

    //check alrady exist in database
    const existuser = user.findOne({
        $or:[{username},{email}]
    })
    if(existuser){
        throw new apiError(404,"user alrady exist")
    }


    //check avtar and image
    const avatarlocalpath = req.files?.avatar[0]?.path;
    const coverimagelocalpath = req.files?.coverImage[0]?.path;

    if(!avatarlocalpath){
        throw new apiError(400,"required avatar")
    }
    //upload On Cloudinary
    const avatar = await uploadOnCloudinary(avatarlocalpath)
    const coverimgage = await uploadOnCloudinary(coverimagelocalpath)

    //check avtar success hua ya nhi
     if(avatar){
        throw new apiError(400,"required avatar")
    }

     //creat user object in DB

     const user = await user.create({
        fullname,
        avatar:avatar.url,
        coverimage : coverimage?.url || "",
        email,
        password,
        username : username.toLowerCase()

     })

     const createduser = await user.findById(user._id).select("-password -refreshToken")

     if(!createduser){
        throw new apiError(500,"somthing went wrong while regisrtring the user")
     }
     

     //responce 
     return res.status(201).json(
        new apiResponce(200,createduser,"user registered successfull")
     )
        
   

})

export {registeruser}