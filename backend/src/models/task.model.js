import mongoose, {Schema} from "mongoose";

const taskSchema=new Schema(
    {
        title:{
            type:String,
            required: true,
            trim: true,
            index: true
        },
        description:{
            type:String,
            required: true,
            trim: true,
        },
        date:{
            type:String,
            required: true,
            trim: true,
        },
        status:{
            type:String,
            required: true,
            uinique: true,
            trim: true,
        },
        priority:{
            type:String,
            required: true,
            uinique: true,
            trim: true,
        }
    }
,{timestamps:true}
)

export const Task=mongoose.model("Task", taskSchema);
