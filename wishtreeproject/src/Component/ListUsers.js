import React, { Component } from 'react'
import ApiService from '../Service/ApiService'


class ListUsers extends Component {

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

    
    render() {
        console.log(this.state.users.map(u=>u.id))
        return (
            <div>
                <h2 className="text-center">User Details</h2>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {/* <th className="hidden">Id</th> */}
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Gender</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map( user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.address}</td>
                                        <td>{user.gender}</td>
                                        
                                        <td>
                                           
                                        </td>
                                    </tr>
                            )

                            
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListUsers;