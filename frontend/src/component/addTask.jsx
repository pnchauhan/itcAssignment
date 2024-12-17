import { useEffect, useState } from "react";
import DisplayTask from './displayTask';
import api from "../utls/api";


const AddTask=()=>{
     const[taskData, setTaskData]=useState([]);
     const[task, setTask]=useState({title:"", description:"", status:"", priority:"", date:"", id:""});
     const[isUpdate, setIsupdate]=useState(false)
     
    
        useEffect(()=>{
    
            fetchAllTask();
    
        },[])
    
        const fetchAllTask=async()=>{
           
            const res= await api().get(`/task`).then((res) => {
                    return res.data.data
                    }).catch((err) => {
                        console.log("api calling error",err)
                    });

                    setTaskData(res ?? [])
        }

        const saveTask=async()=>{

            const{title, description, status, priority, date}=task;
            if(

                [title, description, status, priority, date].some((field)=>field?.trim()==="")
            ){
                alert('All fields is maindatory.')
            }

            const res= await api().post(`/task`,task).then((res) => {
                return res.data
                }).catch((err) => {
                    console.log("api calling error",err)
                });

                if(res.status=='success'){
                    setTask({title:"", description:"", status:"", priority:"", date:"", id:""})
                    fetchAllTask();
                }
        }

        const UpdateTask=async()=>{

            const{title, description, status, priority, date, id}=task;
            console.log("task", task)
            if(

                [title, description, status, priority, date].some((field)=>field?.trim()==="")
            ){
                alert('All fields is maindatory.')
            }

            const res= await api().put(`/task/${id}`,task).then((res) => {
                return res.data
                }).catch((err) => {
                    console.log("api calling error",err)
                });

                if(res.status=='success'){
                    setTask({title:"", description:"", status:"", priority:"", date:"",id:""});
                    setIsupdate(false)
                    fetchAllTask();
                }
        }

    return(
        <>
       <br />
        <div className="card">
                <h5 className="card-header">{isUpdate?"Update":"Add"} Task</h5>
                <div className="card-body">
                  <div className="row">
                        <div className="col">
                            <label >Enter Titile</label>
                            <input id="Title" placeholder="Title" className="form-control" value={task.title} onChange={(e)=>{setTask({...task, title:e.target.value??""})}}></input>
                        </div>

                        <div className="col">
                            <label >Enter Description</label>
                            <input id="Description" placeholder="Description" value={task.description} className="form-control" onChange={(e)=>{setTask({...task, description:e.target.value??""})}}></input>
                        </div>

                        <div className="col">
                            <label >Select Due date</label>
                            <input id="Date" type="date" placeholder="Date" value={task.date} className="form-control" onChange={(e)=>{setTask({...task, date:e.target.value??""})}}></input>
                        </div>

                        <div className="col">
                            <label >Select Priority</label>
                            <select className="form-control" value={task.priority} id="priority" onChange={(e)=>{setTask({...task, priority:e.target.value??""})}}>
                                <option value=''>Select</option>
                                <option value='High'> High</option>
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                            </select>
                        </div>

                        <div className="col">
                            <label >Select Status</label>
                            <select className="form-control" value={task.status} id="status" onChange={(e)=>{setTask({...task, status:e.target.value??""})}}>
                                <option value=''>Select</option>
                                <option value='completed'> completed</option>
                                <option value='pending'>pending</option>
                                <option value='cancel'>cancel</option>
                            </select>
                        </div>

                        <div className="col p-t-8">
                            <br />
                            {isUpdate?
                                <button type="button" className="btn btn-info" onClick={()=>UpdateTask()}>Update</button>
                                :
                                <button type="button" className="btn btn-primary" onClick={()=>saveTask()}>Save</button>
                            }
                        
                        </div>
                    </div>
                <div>
            </div>
          </div>
        </div>
        <br />
        <DisplayTask taskData={taskData} setIsupdate={setIsupdate} setTask={setTask} cb={fetchAllTask}/>
        </>
    )
}

export default AddTask;