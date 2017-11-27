import React, { Component, } from 'react';
import { NavLink, } from 'react-router-dom'
import './Login.css'
import base64 from 'base-64'


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: '',
      email: '',
      noAccess: false,
    }
  }

  saveAccessToken(token){
    localStorage.setItem('token', token)
  }

  loginRequest(loginData){
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(loginData.email + ':' + loginData.password));
    fetch('https://private-3a61ed-zendama.apiary-mock.com/login-fail', {
      headers: headers,
    }).then(response => {
      if (response.status === 401) {
        this.setState({noAccess: true,})
      }
      if (response.status === 200){
        this.saveAccessToken(response.json().token);
        // window.location = '/landing'
      }
    })
  }

  accessNotification(bool){
    if (bool) return <div> wrong email or password </div>
  }

  render() {
    return (
      <div className="Container">
        <div className="MainPannel">
          <div className="UserInputContainer">
            <div className="ZenNameBox">
              <div className="TitleBox">Z e n d a m a</div>
              <div className="LoginMessage">login to your account</div>
            </div>
            <div className="UserInputBox">
              <div className="LoginDetails">
                <div className="UserInput">
                  {/* <label className="emailLable" >email:</label> */}
                  <input className="EmailText"
                    type="text"
                    value={this.state.email}
                    placeholder="Email"
                    onFocus={() => this.setState({noAccess: false, email: '',})}
                    onChange={(e) => this.setState({email: e.target.value,})}
                  />
                  {/* <label className="PasswordLable" >Password:</label> */}
                  <input type="password" className="PasswordText"
                    value={this.state.password}
                    placeholder="Password"
                    onFocus={() => this.setState({noAccess: false, password: '',})}
                    onChange={(e) => this.setState({password: e.target.value,})}
                  />
                </div>
              </div>
              <div className="LoginSend">
                <div className="sendlogo"></div>
                <div className="sendBox">
                  <input onClick={(e) => {this.loginRequest(this.state)}} className="LoginButton" type="submit" value="Log in"/>
                  {this.accessNotification(this.state.noAccess)}
                </div>
              </div>
            </div>
          </div>
          <div className="AboutContainer">
            <div className="AboutBox">
              {/* <img className="UserImage" src='./../../../assetsJames/userImage.svg'/> */}
            </div>
            <div className="AboutTitle">
              <div className="Information">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac
                metus non nunc scelerisque finibus. Duis auctor non tellus ut dignissim.
                Integer scelerisque laoreet maximus. Vivamus sodales urna orci,
                quis iaculis ipsum euismod et. Phasellus ultrices purus sed felis
                fringilla, vitae elementum massa venenatis.
              </div>
              <div className="CompanyLoginRout">
                <div className="ButtonToCompany"></div>
                <div className="ButtonToFB"></div>
                <div className="ButtonToTwit"></div>
                <div className="ButtonToInsta"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="NewCompanyRout">
          <div className="CompanyQuestion">Want to create company account with us?</div>
          <NavLink style={{color: 'black',}} className="CompSignPageRoute" to='/companyregistry1'>
            <div className="CompSignPageRoute"> Sign up here.</div>
          </NavLink>
        </div>
      </div>
    )
  }
}




export default (Login);
