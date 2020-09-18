import React from 'react';
//import ListUsers from './Component/ListUsers'
import './App.css';
import LogIn from './Component/LogIn';
import SignUp from './Component/SignUp';

import { BrowserRouter,Route,Switch ,Link} from 'react-router-dom';
import Admin from './Component/Admin';
import NormalUser from './Component/NormalUser';
import Report from './Component/Report';
import VerifyUser from './Component/VerifyUser';
import LogOut from './Component/LogOut';



function App() {
  return (
    <BrowserRouter>
    <div>
    <div style={{textAlign:'center',marginTop:'50',backgroundColor:'lightgrey',padding:'40px'}}>
      
      <span style={{color:'blue' ,fontSize:'30px'}}>< Link exact to="/login">LogIn</Link></span>
      {'  '}
      <span style={{color:'blue',marginLeft:'40px',fontSize:'30px'}}><Link exact to="/signup">SignUp</Link></span>
     
      {/* <div>need an account ? sign up
        </div> */}

</div>
        <div>
        
        </div>
   
   
    </div>
   <Switch>
   
     
     <Route path="/login" component={LogIn}/>
     <Route path="/signup" component={SignUp}/>
     <Route path="/admin" component={Admin}/>
     <Route path="/user" component={NormalUser}/>
     <Route path="/report" component={Report}/>
     <Route path="/verifyuser" component={VerifyUser}/>
     <Route path="/logout" component={LogOut}/>

   </Switch>
    </BrowserRouter>

    
  );

  
}




    

export default App;
