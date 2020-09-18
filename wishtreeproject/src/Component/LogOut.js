import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

 class LogOut extends Component {
     constructor(){
         super()
        const admintoken=sessionStorage.getItem("admintoken")
        const usertoken=sessionStorage.getItem("usertoken")

        


        if(admintoken!=null){
            sessionStorage.removeItem("admintoken")
            sessionStorage.removeItem("adminloginmail")
        }
        
        if(usertoken!=null){
            sessionStorage.removeItem("usertoken")
            sessionStorage.removeItem("userloginmail")
        }
     }
    render() {
        return (
            <div>
                <Redirect to="/" ></Redirect>
            </div>
        )
    }
}

export default LogOut