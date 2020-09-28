import React, { Component } from 'react'
import ApiService from '../Service/ApiService'

export class VerifyUser extends Component {
    constructor(props) {
        super(props)



        var email = localStorage.getItem('verifyemail')


        this.state = {
            code: 0,
            email: email,
            verificationstatus: "",
            verifycode: 0
        }
    }
    HandleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }



    SubmitData = (e) => {


        e.preventDefault();
        if (this.state.verifycode === this.state.code) {
            console.log('entered code is :' + this.state.verifycode)
            ApiService.updateverificationstatus(this.state.email).then(res => {
                console.log("verificationstatus :" + res.data.result)
                this.setState({ verificationstatus: res.data.result })

            }).catch(error => console.log(error))
            alert('verification successfull')
            this.props.history.push("/login");

        }
        else {
            alert('please enter valid code')
            this.props.history.push("/verifyuser");
        }


    }

    render() {
        console.log("inside render :" + this.state.email)
        ApiService.fetchCode(this.state.email).then(res => {
            console.log("code :" + res.data.result)
            this.setState({ verifycode: res.data.result }, () => console.log("verifycode: " + this.state.verifycode))
        }).catch(error => console.log(error))

        return (
            <div style={{ textAlign: 'center' }}>
                <form onSubmit={this.SubmitData}>
                    <h3>verification code alreday send to your email.</h3>

                    <label>Enetr Code Here :</label> <input type="text" name="code" value={this.state.code} onChange={this.HandleChange} placeholder="enter verification code here" />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default VerifyUser
