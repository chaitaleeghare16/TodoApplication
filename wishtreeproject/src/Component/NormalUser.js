import React, { Component } from 'react'
import ApiService from '../Service/ApiService'
import {NavLink} from 'react-router-dom'


export class NormalUser extends Component {
    constructor(props) {
        super(props)
                var userdata =JSON.parse(sessionStorage.getItem('userloginmail'))
                var userLoggedIn =JSON.parse(sessionStorage.getItem('usertoken'))
        this.state = {
             taskname:'',
             taskdescription:'',
             status:'new',
             email:userdata.email,
             isuserlogin:userLoggedIn,
             tasklist:[],
             
             flag:0,
             taskid:0

        }
    }
    componentDidMount()
    {
        if(this.state.isuserlogin)
        {
            this.ShowUserTask()
        }
        
    }

    changeHandler=(e)=>
    {
        this.setState({[e.target.name]:e.target.value})
    }

    changeStatus=(taskid,e)=> {
       
      
      
        ApiService.changeTaskStatus(taskid)
        .then(res => {
            if(res.status===200){
                
                //this.setState({tasklist:this.state.tasklist.filter(task => task.status==="new"?task.taskid===taskid?task.status="Complete":task.status="new":task)})
                
                this.ShowUserTask()
            }
        })
        .catch(error =>{
            alert("Problem Occurred Task Not Complete")
            console.log(error)
        })

    }


    editTask(taskid,taskname,taskdesc,taskstatus,e)
    
    {
        
        //console.log(taskdesc)
       this.setState({taskname:taskname,taskdescription:taskdesc,taskid:taskid,status:taskstatus})
       
       
        
    }


    deleteTask=(taskid,e)=>
    {
        e.preventDefault();

        ApiService.deleteTask(taskid).then(res=>{
            if(res.status===200)
            {
                alert('task deleted successfully');
                this.ShowUserTask();
            }
        }).catch(error=>console.log(error))
    }


    

    ShowUserTask=(e)=>
    {
        //e.preventDefault();
        var useremail = JSON.parse(sessionStorage.getItem('userloginmail'))
        console.log("****"+useremail.email)
        var email = useremail.email
        
        
        ApiService.fetchTask(email).then(res=>{
            if(res.status===200)
            {
                    this.setState({tasklist:res.data.result})
                    console.log("tasklist :"+this.state.tasklist)
                    
                    console.log(res.data)
            }
        }).catch(error=>console.log(error))
        this.setState({
            taskname:'',
            taskdescription:''
        })
    }

    submitTask=(e)=>
    {
        e.preventDefault();
        
        if(this.state.taskid===0){
        const TaskDetail={
            taskname :this.state.taskname,
            taskdescription : this.state.taskdescription,
            taskstatus:this.state.status,
            email:this.state.email
        }
        
        ApiService.addTask(TaskDetail).then(res=>{
           if(res.status === 200)
           {
               alert("Task added successfully...")
               console.log(res.data)// result = task insert successfully
               this.ShowUserTask()
               
           }
        }).catch(error=>console.log(error))
       
    }else
    {
        console.log(this.state.taskid+" "+this.state.flag)
        
        const TaskDetail={
            taskname :this.state.taskname,
            taskdescription : this.state.taskdescription,
            taskid:this.state.taskid,
            taskstatus:this.state.status

        }
        ApiService.updateTask(TaskDetail).then(res=>{
            if(res.status === 200)
            {
                alert("Task updated successfully...")
                console.log(res.data)// result = task update successfully
                this.ShowUserTask()
                
            }
         }).catch(error=>console.log(error))
         this.setState({taskid:0})

    }

    }


    

    render() {
       
        
        var userdata =JSON.parse(sessionStorage.getItem('userloginmail'))
            var name = userdata.fname.concat(" "+userdata.lname)
        


        return (

            <div style={{marginLeft :'400px'}}>

            <div style={{textAlign:'center',color:'red',fontStyle:'italic',marginRight:'300px',}}>
            <h4>Welcome <br/>{name} (user)</h4> </div>
            <div style={{marginTop:'40px'}}>
                    <form onSubmit={this.submitTask}>
                       <table>
                           <tr>
                            <th>TaskName:</th>
                            <td><input type="text"  value={this.state.taskname} onChange={this.changeHandler} name="taskname" style={{width:'400px'}} required/></td>
                            </tr>
                            <br/>
                            <tr>
                            <th>TaskDescription:</th>
                            <td><input type="text" value={this.state.taskdescription} onChange={this.changeHandler} name="taskdescription" style={{width:'400px'}}required/></td>
                           </tr>
                          <br/>
                           <tr>
                            <th>TaskStatus:</th>
                            <td><select value={this.state.status} name="status" onChange={this.changeHandler}style={{width:'400px'}}>

                               <option value="new">new</option>
                               <option value="complete">complete
                               </option></select> </td>
                           </tr>
                            <tr>
                                <td></td>
                          <td><button onClick ={this.submitTask.bind(this)} className="btn btn-primary" style={{width:'400px'}} >Add</button></td>
                        </tr>
                        </table> 
                        </form> 
            </div>


            <div style={{marginTop:'30px',marginLeft:'-500px'}}>
                    <table>
                       
                    <tbody >
                        <tr>
                            
                            <th></th>
                            <th></th>
                            <th>TaskName</th>
                            <th>TaskDescription</th>
                           
                            <th>Status</th>
                            
                            <th colSpan="2">Action</th>
                            
                        </tr>
                        </tbody>
                        {
                            this.state.tasklist==null ?'null':this.state.tasklist.map((task,index)=>{return(
                       <tr>
                          
                       <td><input type="checkbox" checked={task.status==="complete"?true:false} onChange={this.changeStatus.bind(this,task.tid)}style={{width:'400px'}}  ></input></td>
                      

                           <td><input type="hidden"></input></td>
                           <td><input type="text" value={task.taskname} onChange={this.changeHandler.bind(this)} name="tasknameedit" style={{width:'400px',height:'50px'}} ></input></td>
                           <td><input type="text" value={task.taskdesc} style={{width:'400px',height:'50px'}}/></td>
                           
                           <td><input type="text" value={task.status} style={{border:'none',width:'80px'}} ></input></td>

                           <td><button className="btn btn-success" onClick={this.editTask.bind(this,task.tid,task.taskname,task.taskdesc,task.status)}>Edit</button></td>
                           <td><button className="btn btn-danger" onClick={this.deleteTask.bind(this,task.tid)}>Delete</button></td>
    
                            </tr>
                            )})
                        }
                           
                        
                    </table>   
    
                    
                    </div>       

            
            <div><NavLink to="/logout" className="btn btn-danger" style={{marginRight:'950px'}}>Logout</NavLink></div>
            </div>
        )
    }
}

export default NormalUser
