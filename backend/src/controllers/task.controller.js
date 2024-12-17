import {Task} from "../models/task.model.js";

const createTask = async(req,res) => {

    try{
        const { title, description, status, priority, date } = req.body;

        if(
            [title, description, status, priority, date].some((field)=>field?.trim()==="")
        ){
             return res.status(200).json({status:'error',message:'All field is required!'})
        }

        const task = await Task.create({
            title,
            description,
            date,
            status,
            priority,
        });

        if(task){
            return res.status(200).json({status:'success',message:'Task cteated', data:task})
        }

    }
    catch(error){
        console.log('error:',error);
        return res.status(300).json({status:'error',message:'errorn in api level'})
    }

}

const getAllTask = async(req,res) => {

    try{
        const task = await Task.find();

        if(task){
            res.status(200).json({status:'success',message:'All Task', data:task})
        }
    } catch(error){
        console.log('error:',error);
        return res.status(300).json({status:'error',message:'errorn in api level'})
    }

}

const getTaskById = async(req,res) => {

    try{

        const { id } = req.params;
       
        if(
            id.trim()===""
        ){
            res.status(200).json({status:'error',message:'task id is required!'})
        }
        const task = await Task.find({'_id':id })

        if(task){
            res.status(200).json({status:'success',message:'All Task', data:task})
        } 

    } catch(error){
        console.log('error:',error);
        return res.status(300).json({status:'error',message:'errorn in api level'})
    }

}

const updateTask = async(req,res) => {
    try{
        const { id } = req.params;
        const { title, description, status, priority, date } = req.body;
        if(
            [title, description, status, priority, date].some((field)=>field?.trim()==="")
        ){
            res.status(200).json({status:'error',message:'All field is required!'})
        }

        const task = await Task.updateOne({'_id':id},{
            title,
            description,
            date,
            status,
            priority,
        });

        if(task){
            res.status(200).json({status:'success',message:'Task updated', data:task})
        }

    } catch(error){
        console.log('error:',error);
        return res.status(300).json({status:'error',message:'errorn in api level'})
    }
}

const deleteTask = async(req,res) => {

    try{
        const { id } = req.params;
       console.log("=====>",id)
        if(
            id.trim()===""
        ){
            res.status(300).json({status:'error',message:'task id is required!'})
        }

        const task = await Task.deleteOne({'_id':id   });

        if(task){
            res.status(200).json({status:'success',message:'Task Deleted', data:task})
        }

    }catch(error){
        console.log('error:',error);
        return res.status(300).json({status:'error',message:'errorn in api level'})
    }
}

export{
    getTaskById,
    createTask,
    getAllTask,
    deleteTask,
    updateTask,
}

