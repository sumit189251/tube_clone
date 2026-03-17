import {asyncHandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/apiError.js"
import { user } from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import {apiResponce} from "../utils/apiResponce.js"

//one functionn to  bhe genrate access token and refersh token
const genrateaccessANDreferesToken = async(userID)=> {
    try {
        const user = await  user.findById(userID)

        const accesstoken = user.generateAccessToken

        const refreshToken = user.generateRefreshToken

        user.refreshToken = refreshToken
       await user.save({validateBeforeSave : false})
       return{accesstoken , refreshToken}
        
    } catch (error){
         throw new apiError(500,"something went wrong while generating referesh and access token")
        
    }
}

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
    const existuser = await user.findOne({
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
    console.log(avatarlocalpath)
    const avatar = await uploadOnCloudinary(avatarlocalpath);
    console.log("avatar ka rsult",avatar)
    const coverimage = await uploadOnCloudinary(coverimagelocalpath)

    //check avtar success hua ya nhi
     if(!avatar){
        throw new apiError(400,"required avatar")
    }

     //creat user object in DB

     const User = await user.create({
        fullname,
        avatar:avatar.url,
        coverimage : coverimage?.url || "",
        email,
        password,
        username : username.toLowerCase()

     })

     const createduser = await user.findById(User._id).select("-password -refreshToken")

     if(!createduser){
        throw new apiError(500,"somthing went wrong while regisrtring the user")
     }
     

     //responce 
     return res.status(201).json(
        new apiResponce(200,createduser,"user registered successfull")
     )
        
   

})

//login user

const loginUser = asyncHandler(async(req,res,next)=>{
    
    //get email/user id request body 
    // username or email
    // find user in db
    //check password
    //access and referesh token
   // send cookies


     //get email/user id request body   

   const {username,email,password} = req.body

   if((!username && !email)){
    throw new apiError (400,"username or email is required")
   }

    
   //check username or email are qegister

   const User = await user.findOne({
        $or:[{username},{email}]
    
   })
   if(!User){
        throw new apiError(404,"user not register")
    }
    // agar user mill jya to password check karanga

  const ispasswordvalid = await User.isPasswordCorrect(paddword)
  if(!ispasswordvalid){ 
        throw new apiError(404,"your password is not correct")
    }

    //access or referesh token genrate to call function

   const{accesstoken,refreshToken}  = await genrateaccessANDreferesToken (user._id)

   const loggedinuser = await user.findById(user._id).select("-password -refreshToken")

   //sand cookes

   const options ={
    httpOnly :true,
    secure : true
   }
   return res
   .status(200)
   .cookie("accesstoken",accesstoken ,options)
   .cookie("refreshToken",refreshToken ,options)
   .json(
    new apiResponce(
        200,{
            user :loggedinuser,accesstoken,refreshToken
        },
        "user logged in successfully"
    )
   )


   
})
   //log out 

 const logoutuser = asyncHandler(async(req,res,next)=>{
    await user.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                 refreshToken : undefined
            }
           
        },
        {
            new :true
        }
    )
    const options ={
    httpOnly :true,
    secure : true
   }
   return res
   .status(200)
   .clearCookies("accesstoken",options)
   .clearCookies("refreshToken",options)
   .json(new apiResponce(200,{},"user logged out"))
    
   })

export {registeruser,
    loginUser,
    logoutuser
}