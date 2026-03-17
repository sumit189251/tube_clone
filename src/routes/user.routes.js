import { Router } from "express";
import { registeruser , loginUser,logoutuser } from "../cantrollers/user.cantroller.js";
import {upload} from "../middleware/multer.middleware.js"
import {verifyJWT} from   "../middleware/auth_middleware.js"

const router = Router();


router.route("/register").post(
  // ya middleware ka lea
  upload.fields([
    {name: "avatar",
      maxCount:1 //ketni file accept karoga
    },
    {
      name:"coverImage",
      maxCount:1
    }
  ]),
  registeruser)

router.route("/login").post(loginUser) 
router.route("/logout").post(verifyJWT,logoutuser) 




  



export default router