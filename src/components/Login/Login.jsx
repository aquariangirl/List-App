import React, { Component } from "react";


export class Login extends Component {
  constructor(props) {
    super(props);
    
  }




  render() {
    return (
        <div className='Login' style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>  
          <label htmlFor="email">email</label>
          <input type="email" placeholder="example@email.com" id="email"/>
          <label htmlFor="password">password</label>
          <input type="password" placeholder="*********" id="password"/>
        </div>
    )
  }
}      
                

export default Login;