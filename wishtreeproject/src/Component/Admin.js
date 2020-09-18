import React, { Component } from 'react'
import ApiService from '../Service/ApiService'
import { Link, NavLink } from 'react-router-dom';


class Admin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
       
    }

    componentDidMount() {
        this.UserList();
    }

    UserList=()=> {
        ApiService.fetchUsers()
            .then((res) => {
                console.log(res.data)
                this.setState({users: res.data.result}) // in map key is result
            });
    }

    ActivateUser=(userid)=>
    {
        const data={
            id : userid,
            status: "activate"
        }
        console.log(this.state.users)
        
        ApiService.updateUser(data).then(res=>{
            if(res)
            {
                console.log(res.data)
                alert("status changed to activate")
            }}).catch(error=>
                alert(error));
    }

    DectivateUser=(userid)=>
    {
        const data={
            id : userid,
            status: "deactivate"
        }
        
     
     

        ApiService.updateUser(data).then((res)=>{console.log(res.data)
        alert("status changed to deactivate")}
        
       ).catch((error)=>
        {
            console.log(error)
        })

    }
    
    
    render() {
        //const name =this.props.match.params.name
       var admindata= JSON.parse(sessionStorage.getItem('adminloginmail'))
        console.log(this.state.users.map(u=>u.id))
        return (
            <div>
                <div style={{textAlign:'center',color:'violet',fontStyle:'italic'}}>
                <h4>Welcome <br/>{admindata.fname.concat(" "+admindata.lname)} (Admin)</h4>
                </div>
                <div><Link to="/report">Report</Link></div>
                <h2 className="text-center" style={{color:'blue'}}>User Details</h2>
               
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {/* <th className="hidden">Id</th>
                            <th>Id</th> */}
                            <th>FirstName</th>
                            <th>LaststName</th>
                            <th>Email</th>
                           
                            <th colSpan="2">Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map( user =>
                                    <tr key={user.id}>
                                       
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                       
                                        <td><button  className="btn btn-success" onClick={()=>this.ActivateUser(user.id)}>Activate</button></td>
                                        <td><button className="btn btn-danger" onClick={()=>this.DectivateUser(user.id)}>Deactivate</button></td>
                                        
                                        <td>
                                           
                                        </td>
                                    </tr>
                            )

                            
                        }
                    </tbody>
                    
                </table>
            <div><NavLink to="/logout" className="btn btn-danger" style={{marginRight:'950px'}}>Logout</NavLink></div>

                

            </div>
        );
    }

}

export default Admin;