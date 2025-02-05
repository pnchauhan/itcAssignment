
import dotenv from "dotenv"
import {app} from './app.js'
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

connectDB()
.then( ()=>{

    app.listen(process.env.PORT ?? 8000,() => {
        console.log(`server is running on PORT ${process.env.PORT}`)
    })
    
})
.catch((error)=>{
    console.log("error from db connection", error);
})