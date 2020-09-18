import React, { Component } from "react";
//import "./Styles/LogIn.css";
import {BrowserRouter, Switch,Redirect } from "react-router-dom";
import SignUp from "./SignUp";
import ApiService from "../Service/ApiService";

export class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error:"",
      allUsersDetails:[],
      userid:0,
      fname:"",
      lname:"",
      utype:"",
      status:"",
      email:"",
      adminlogin:false,
      userlogin:false,
      userdata:{
        email:'',
        fname:'',
        lname:''
      },
      admindata:{
        email:'',
        fname:'',
        lname:''
      }

      
      
      
    };
  }

  

  validLoginForm = (e) => {
   
    var isValid= true;
    if (this.state.username.length == 0) {
      this.setState({
        error: { usernameerror: "username should not be empty" }});
      isValid=false
      console.log(this.state.username)
      
    }
    else if (!this.state.username.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      this.setState({ 
      error:{ usernameerror: "username should contain . and @" }});
      isValid = false
      console.log(this.state.password)
    }

    else if (this.state.username.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) 
    {
        this.setState({error:{usernameerror:""}});
        isValid=true
    }

    if (this.state.password.length == 0) {
      this.setState({error: {passworderror: "password should not be empty" },
      });
      isValid=false
      
    }
    else if (!this.state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      this.setState({error:{
        passworderror: "password should conatin atleast 1 capital 1 special character and minimum length of 8"
      }});
      isValid = false;

    } else if (
      this.state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    ) {
      this.setState({ passworderror: "" });
      isValid = true;
    }
    this.verifyUser();
  }

     
  
  


  verifyUser=()=>{
    let uname = this.state.username;
    
    let pswd = this.state.password;
    
    

    const data =
    {
      username : uname,
      password :pswd
    }
   

    ApiService.fetchUsersBy_email_n_password(data).then((res)=>{
     this.setState({fname :res.data.result})
     this.setState({lname :res.data.result1})
     this.setState({utype :res.data.result2})
     this.setState({status : res.data.result3})
     this.setState({email:res.data.result4})
     this.setState({userid:res.data.result5})
      
     var fname = this.state.fname
     var lname = this.state.lname
     var utype = this.state.utype
     var status = this.state.status
     var email = this.state.email
     var userid = this.state.userid
     
     console.log("*"+uname)
     console.log(email)

  if(status === 'deactivate')
   {
     document.getElementById('msg').innerHTML= '***Sorry... your account is dectivate.take permisson of admin to activate it'
   }
   if(uname !== email)
   {
    document.getElementById('msg').innerHTML= '***please registered first'
   }
   if(email=== uname && utype === "normal" && status === "activate")
     {
      
       this.setState({userdata:{email:email,fname:fname,lname:lname}})
      sessionStorage.setItem('usertoken',true);
      sessionStorage.setItem('userloginmail',JSON.stringify(this.state.userdata));

      this.setState({userlogin:true})
       
      
     }
   if(email === uname && utype==="admin")
     {
      this.setState({admindata:{email:email,fname:fname,lname:lname}})
      sessionStorage.setItem('admintoken',true);
      sessionStorage.setItem('adminloginmail',JSON.stringify(this.state.admindata));

      this.setState({adminlogin:true})
      
     
     }
     

   
   
  
    }).catch(error=>this.setState({error:error}))

    
    

    

    this.setState({
      username: "",
      password: "",
    });
  }

  submitForm=(e)=>
  {
      e.preventDefault();
      this.validLoginForm();

  }

  OnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {

    if(this.state.userlogin)
    {
      alert('user login successfully.....')
       //this.props.history.push(`/user/${this.state.fname.concat(" "+this.state.lname)}`);
       return <Redirect to="/user" />
    }

    if(this.state.adminlogin)
    {
      alert('admin login successfully')
       //this.props.history.push(`/admin/${this.state.fname.concat(" "+this.state.lname)}`);
       return <Redirect to="/admin" />
    }
    return (
        <BrowserRouter>
      <div style={{marginLeft:'100px',marginTop:'-100px'}}> 
        <form  style={{ maxWidth: "500px", margin: "auto", marginTop: "150px" }}
        >
          
          <div className="col-md-9 form-group" >
            
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.OnChange}
              placeholder="Email"
              required
              className="form-control"
            />
            
          </div>

          <pre style={{ color: "red" ,marginLeft:'30px'}}>{this.state.error.usernameerror}</pre>

          <div className="col-md-9 form-group" style={{textAlign:'center'}}>
            
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.OnChange}
              placeholder="Password"
              required
              className="form-control"
            />
           
          </div>
          <pre style={{ color: "red",marginLeft:'30px'}}>{this.state.error.passworderror}</pre>


          <div className="col-md-9 form-group" style={{textAlign:'center'}}>
          <button  className="btn btn-primary"
            value={this.state.username}
            onClick={this.submitForm}
          >LogIn
          </button>
          </div>
         
          <div style={{marginLeft:'60px'}}>
            <b>need an account? click on SignUp </b>
           
          </div>
          <div id="msg" style={{color:'red',border:'1px solid black'}}></div>
        </form>
      </div>
      
      <Switch>
        {/* <Route path="/signup" component={}/> */}
      </Switch>
      </BrowserRouter>
    
    );
  }
}

export default LogIn;