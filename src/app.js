import express from "express"
import cors from "cors"

import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  Credential:true
}))

app.use(express.json({limit:"16kb"})) //jo data form bharr ka aya//
app.use(express.urlencoded({extended:"true",limit:"16kb"})) //jo data url ka throw aaya//
app.use(express.static("public"))

app.use(cookieParser())

//routes import//
import router from "./routes/user.routes.js"


//router declaration
app.use("/api/v1/users", router);


export {app}

