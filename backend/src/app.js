import express from 'express';
import cors from "cors";


const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))


//route import
import taskRoute from "./routes/task.router.js";

//router description 
app.use('/api/v1/',taskRoute);

export{app}