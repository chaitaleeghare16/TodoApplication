import React, { Component } from "react";
import * as moment from 'moment'



import { BrowserRouter, Route } from "react-router-dom";
import ApiService from "../Service/ApiService";

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
        allUserDetails:[], 
      FirstName: "",
      LastName:"",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      UserType:"",
      Status:'',
      firstnameError: "",
      lastnameError: "",
      emailError: "",
      passwordError: "",
      confirmpasswordError:"",
      existmail:0
      
      
     
    };
  }

  validForm = () => {
    console.log("inside vali form" + this.state.isValid);
    return this.state.isValid;
  };


  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });


    var name = e.target.name;
    var value = e.target.value;
    var isValid = this.state.isValid;
    // console.log(name + " " + value + " " + isValid);

    switch (name) {
      case "FirstName":
        console.log(name);
        if (value.length === 0) {
          this.setState({ firstnameError: "name should not be blank" });
          isValid = false;
          console.log(isValid);
        } else if (!value.match(/^[a-zA-Z ]{1,}$/)) {
          this.setState({ firstnameError: "name should contain characters" });
          isValid = false;
          console.log(isValid);
        } else {
          this.setState({ firstnameError: " " });
          isValid = true;
          console.log(isValid);
        }
        break;

        case "LastName":
        console.log(name);
        if (value.length === 0) {
          this.setState({lastnameError: "name should not be blank" });
          isValid = false;
          console.log(isValid);
        } else if (!value.match(/^[a-zA-Z ]{1,}$/)) {
          this.setState({ laststnameError: "name should contain characters" });
          isValid = false;
          console.log(isValid);
        } else {
          this.setState({ lastnameError: " " });
          isValid = true;
          console.log(isValid);
        }
        break;

      

      case "Email":
        console.log(name);
        if (value.length === 0) {
          this.setState({ emailError: "Email should not be blank" });
          isValid = false;
          console.log(isValid);
        } else if (!value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/)) {
          this.setState({ emailError: "Email should contain . and @" });
          isValid = false;
          console.log(isValid);
        } else if (value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/)) {
          this.setState({ emailError: "" });
          isValid = true;
          console.log(isValid);
        }
        var email=value;

        ApiService.CheckUserEmail(email)
            .then((res) => {
                var users = JSON.stringify(res.data.result);
                
                this.setState({existmail : res.data.result}) 
                console.log(this.state.existmail) // in map key is result
                if(this.state.existmail>0)
                {
                  alert('Already has account with this Email.Please Register with another Email')
                }
            }).catch((error)=>console.log(error));
    
    console.log("userdetails"+this.state.allUserDetails)
        break;
      
      case "Password":
        if (value.length === 0) {
          this.setState({
            passwordError: "password should not blank",
          });
          isValid = false;
          console.log(isValid);
        } else if (!value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,8}/)) {
          this.setState({
            passwordError: `password should conatin atleast 1 capital 1 special
                  character and minimum length of 8`,
          });
          isValid = false;
          console.log(isValid);
        } else if (value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,8}/)) {
          this.setState({
            passwordError: "",
          });
          isValid = true;
          console.log(isValid);
        }
        break;
      case "ConfirmPassword":
        if (value.length === 0) {
          this.setState({
            confirmpasswordError: " Confirm Password should not blank",
          });
          isValid = false;
          console.log(isValid);
        } else if (this.state.Password !== value) {
          this.setState({
            confirmpasswordError: "Password And Confirm Password Not Match",
          });
          isValid = false;
          console.log(isValid);
        } else {
          this.setState({ confirmpasswordError: "" });
          isValid = true;
          console.log(isValid);
        }
    }
    return this.setState({ isValid: isValid });
  };



  submitData = (e) => {
    e.preventDefault()
   const validForm =this.validForm();
    // ApiService.CheckUserEmail(this.state.Email)
    //         .then((res) => {
    //             var users = JSON.stringify(res.data.result);
                
    //             this.setState({allUserDetails : users})  // in map key is result
    //         }).catch((error)=>console.log(error));
    
    // console.log("userdetails"+this.state.allUserDetails)

    var a = true;
    if (this.state.allUserDetails !== null) {
      alert("hello")
     
     for(let user of this.state.allUserDetails) {
        
        if (user.email === this.state.Email) {
          alert("inside"+a);
          a = false;
        }
      };
    }
    if (this.state.allUserDetails == null) {
      this.state.allUserDetails = [];

      if (validForm) {
       
        const userDetails = {
          
          FirstName: this.state.FirstName,
          LastName:this.state.LastName,
          Email: this.state.Email,
          Password: this.state.Password,
          ConfirmPassword: this.state.ConfirmPassword,
          UserType:'normal',
          Status:'deactivate'
        };
        ApiService.addUser(userDetails).then(res=>
          console.log(res)).catch(error=>console.log(error))

        
        this.props.history.push("/verifyuser");
        var email=localStorage.getItem('verifyemail')

        if(email == null)
        {
           localStorage.setItem('verifyemail',this.state.Email)
        }
      }
    } else if (this.state.allUserDetails != null) {
      if (validForm) {
        if (a) {
          alert("a"+a)
          const userDetails = {
            
            FirstName: this.state.FirstName,
            LastName:this.state.LastName,
            Email: this.state.Email,
            Password: this.state.Password,
            ConfirmPassword: this.state.ConfirmPassword,
            date:this.state.date,
            UserType:'normal',
            Status:'deactivate'
          };
          ApiService.addUser((userDetails)).then(res=>
            console.log(res.data.result)).catch(error=>console.log(error))

          
          this.props.history.push("/verifyuser");
          var email=localStorage.getItem('verifyemail')

          if(email == null)
          {
             localStorage.setItem('verifyemail',this.state.Email)
          }
        } else {
          alert(
            "your Email is already register...please sign up with another Email"
          );
        }
      } else {
        alert("something is wrong ");
      }
    }
  };

  render() {
    return (
      <div className="box" style={{marginLeft:'400px',marginTop:'20px'}}>
        <form autoComplete="off">
          <div className="col-md-5 form-group" style={{textAlign:'center'}}>
            
            <input
              type="text"
              name="FirstName"
              value={this.state.FirstName}
              onChange={this.onchange}
              placeholder="First Name"
              required
              className="form-control"
            />
            <pre style={{ color: "red" }}> {this.state.firstnameError}</pre>
          </div>

          
          <div className="col-md-5 form-group">
            
            <input
              type="text"
              name="LastName"
              value={this.state.LastName}
              onChange={this.onchange}
              placeholder="Last Name"
              required
              className="form-control"
            />
            <pre style={{ color: "red" }}> {this.state.lastnameError}</pre>
          </div>
          
          <div className="col-md-5 form-group">
            
            <input
              type="text"
              name="Email"
              value={this.state.Email}
              onChange={this.onchange}
              placeholder="Email"
              required
              className="form-control"
            />
            <pre style={{ color: "red" }}> {this.state.emailError}</pre>
          </div>

          
          
          <div className="col-md-5 form-group">
            
            <input
              type="text"
              name="Password"
              value={this.state.Password}
              onChange={this.onchange}
              placeholder="Password"
              required
              className="form-control"
            />
            <div style={{ color: "red" }} > {this.state.passwordError}</div>
          </div>

          <div className="col-md-5 form-group">
            
            <input
              type="text"
              name="ConfirmPassword"
              value={this.state.ConfirmPassword}
              onChange={this.onchange}
              placeholder="ConfirmPassword"
              required
              className="form-control"
            />
          </div>

          <div className="col-md-5 form-group">
            
            <input
              type="text"
              name="Date"
              value= {this.state.date}
              onChange={this.onchange}
              
              required
              className="form-control"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary m-2"
            onClick={this.submitData}
          >
            {" "}
             Register{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;