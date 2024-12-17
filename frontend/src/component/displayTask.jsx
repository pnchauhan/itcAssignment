import { memo, useState } from "react";
import api from "../utls/api";

const DisplayTask=({taskData, setIsupdate,setTask,cb})=>{
    const[status, setStatus]=useState("");
    const[priority, setPriority]=useState("")


const selectForUpdate=(item)=>{
   
    const id=item._id;
    setTask({title:item.title, description:item.description, status:item.status, priority:item.priority, date:item.date, id:id});
    setIsupdate(true);
}

const deleteTaskById=async(id)=>{

    const res= await api().delete(`/task/${id}`).then((res) => {
            return res.data
        }).catch((err) => {
            console.log("api calling error",err)
        });

        
        if(res.status=='success'){
            
            cb();
        }
}


    return(
        <>
         <div className="card">
                <h5 className="card-header">Display Task</h5>
                <div className="card-body">
                   {taskData?.length>0? 
                   <> 
                   <div className="row">
                        
                        <div className="col">
                           
                            <select className="form-control" id="fpriority" value={priority} onChange={(e)=>setPriority(e.target.value)} >
                                <option value=''>Select Priority</option>
                                <option value='High'> High</option>
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                            </select>
                        </div>

                        <div className="col">
                           
                            <select className="form-control" id="fstatus" value={status} onChange={(e)=>setStatus(e.target.value)}>
                                <option value=''>Select Status</option>
                                <option value='completed'> completed</option>
                                <option value='pending'>pending</option>
                                <option value='cancel'>cancel</option>
                            </select>
                        </div>

                        <div className="col">
                        <button type="button" className="btn btn-info btn-sm" onClick={()=>{setStatus(''); setPriority('')}}>Clear Filter</button>
                        </div>
                        <div className="col"></div>
                    </div>

                    <div className="row p-t-8">
                        <table className="table table-hover sm">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               {taskData.filter((fitem)=> {return status.length>0 || priority.length>0 ? fitem.status.includes(status) && fitem.priority.includes(priority): fitem.status.includes(status) || fitem.priority.includes(priority)}).map((item, index)=>{
                            
                               const id=item._id;
                               const locItem=item;
                                return(
                                    <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    <td>{item.priority}</td>
                                    <td>
                                        <button type="button" className="btn btn-success btn-sm" onClick={()=>selectForUpdate(locItem)}>Edit</button>
                                        <button type="button" className="btn btn-danger btn-sm m-l-5" onClick={()=>deleteTaskById(id)}>Delete</button>
                                    </td>
                                </tr>
                                )
                               })}
                            </tbody>
                        </table>
                    </div>
                    </>:'No Task to display'}
                <div>
            </div>
          </div>
        </div>
        </>
    )
}
export default memo(DisplayTask);