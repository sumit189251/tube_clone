import { user } from "../models/user.models.js"
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asynchandler.js"

import jwt from "jsonwebtoken"


export const  verifyJWT = asyncHandler(async(req,res,next)=>{
 try {
   const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("bearer ", "")
 
   if(!token){
     throw new apiError(401, "unauthorize request")
   }
 
   const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   await user.findById(decodedtoken?._id).select("-password -refreshToken")
 
   if(!user){
     throw new apiError(401,"invalid access token")
   }
 
   req.user = user;
   next()
  } catch (error) {
  
  throw new apiError(401,error?.massage ||"invalid access token")
  
  
 }
})