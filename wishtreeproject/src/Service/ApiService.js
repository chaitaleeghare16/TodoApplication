
import axios from 'axios'

class ApiService
{
    
      
    addUser(data)
    {
        console.log("inside apiservice"+data)
        return axios.post('http://localhost:8080/WishTreeProject/AddUserServlet',data);
    }

    fetchUsers() {
        return axios.get('http://localhost:8080/WishTreeProject/GetAllUserServlet');
    }

    updateUser(data)
    {
        
        return axios.post('http://localhost:8080/WishTreeProject/UpdateUserServlet',data)
            
           
    }

   fetchUsersBy_email_n_password(data)
   {
       console.log(data)
    return axios.post('http://localhost:8080/WishTreeProject/GetAllUserServletbyemailnpswd',data)
    
   }
   getUserTaskById(userid)
   {
 
    console.log(userid)
     return axios.post('http://localhost:8080/WishTreeProject/GetAllUserTaskServlet',userid)
     
   }

   addTask(TaskDetail)
   {
       return  axios.post('http://localhost:8080/WishTreeProject/AddTaskServlet',TaskDetail)
   }
      
   fetchTask(email)
   {
       console.log(email)
    return  axios.get('http://localhost:8080/WishTreeProject/GetTaskServlet?email='+email)
   }

   changeTaskStatus(taskid){
    return axios.get("http://localhost:8080/WishTreeProject/changetaskstatus?taskid="+taskid);
}

deleteTask(taskid){
    console.log(taskid)
    return axios.get("http://localhost:8080/WishTreeProject/deletetask?taskid="+taskid);
}

updateTask(TaskData)
{
    return axios.post("http://localhost:8080/WishTreeProject/updatetask",TaskData)
}

Report(){
    return axios.get("http://localhost:8080/WishTreeProject/report");
}

fetchCode(email){
    return axios.get("http://localhost:8080/WishTreeProject/getCode?email="+email   );
}
        
updateverificationstatus(email){
    return axios.get("http://localhost:8080/WishTreeProject/verificationstatus?email="+email   );
}

CheckUserEmail(email)
{
    
    return axios.get("http://localhost:8080/WishTreeProject/mailExist?email="+email   );
}
    
}
export default new ApiService();