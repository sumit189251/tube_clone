import { Router } from "express";
import { registeruser } from "../cantrollers/user.cantroller.js";
import {upload} from "../middleware/multer.middleware.js"

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



export default router