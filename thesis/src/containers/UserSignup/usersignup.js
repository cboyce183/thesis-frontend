import React, { Component, } from 'react';
import { NavLink, } from 'react-router-dom'
import './usersignup.css'
// import base64 from 'base-64'
// import { connect, } from 'react-redux'

class UserSignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      password1: '',
      password2: '',
      username: '',
      email: '',
      profilePic: null,
      profilePicLoad: false,
      passwordNotEqual: false,
      base64Image: null,
    }
  }

  arePasswordsTheSame(){
    if (this.state.password1 === this.state.password2) {
      console.log(true)
    } else {
      this.setState({password1 : '', password2 : '', passwordNotEqual: true,})
    }
  }

  removePasswordWarning(){
    this.setState({passwordNotEqual: false,})
  }

  warningPassWordNotEqual(bool){
    if(bool) return (<div> Passwords are not equal. </div>)
  }

  imageProfileOrNot(bool){
    if (!bool) return( <img src={require('../../assetsJames/userImage.svg')} className="ProfilePic"/> )
    if (bool) {
      var reader = new FileReader();
      reader.readAsDataURL(this.state.profilePic[0]);
      reader.onload = function(){
        // this.state.base64Image = reader.result;
      };
      return( <img src={this.state.base64Image} className="ProfilePic"/> )
    }
  }

  render() {
    return (
      <div className="Container">
        <div className="MainPannel">
          <div className="UserInputContainer">
            <div className="ZenNameBox">
              <div className="TitleBox">Z e n d a m a</div>
              <div className="LoginMessage"> sign up for your account</div>
            </div>
            <div className="UserInputBox">
              <div className="LoginDetails">
                <div className="UserInput">
                  {/* <label className="UsernameLable" >Username:</label> */}
                  <input className="UsernameText"
                    type="email"
                    value={this.state.email}
                    placeholder="Email"
                    onChange={(e) => this.setState({email: e.target.value,})}
                  />
                  {/* <label className="PasswordLable" >Password:</label> */}
                  <input type="password" className="PasswordText"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={(e) => this.setState({username: e.target.value,})}
                  />
                  <input type="password" className="PasswordText"
                    value={this.state.password1}
                    placeholder="Password"
                    onFocus={() => this.removePasswordWarning()}
                    onChange={(e) => {
                      this.setState({password1: e.target.value,})
                    }}
                  />
                  <input type="password" className="PasswordText" id="pass2"
                    value={this.state.password2}
                    placeholder="Password"
                    onFocus={() => this.removePasswordWarning()}
                    onChange={(e) => {
                      this.setState({password2: e.target.value,})
                    }}
                  />
                  <div className="LoadProfilePicture">
                    <div className="myLabel">
                      <input type="file"
                        onChange={(e) => this.setState({
                          profilePic: e.target.files,
                          profilePicLoad: true,})}
                      />
                      <span>Add profile picture</span>
                    </div>
                  </div>

                </div>
              </div>
              <div className="LoginSend">
                <div className="ProfilePicBox">
                  {this.imageProfileOrNot(this.state.profilePicLoad)}
                </div>
                <div className="SignupBox">
                  <input onClick={() => {
                    this.arePasswordsTheSame()
                  }}
                  className="LoginButton" type="submit" value="Sign up"
                  />
                  {this.warningPassWordNotEqual(this.state.passwordNotEqual)}
                </div>
              </div>
            </div>
          </div>
          <div className="AboutContainer">
            <div className="AboutBox">
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




export default (UserSignup);
