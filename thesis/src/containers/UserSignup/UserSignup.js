import React, { Component, } from 'react';
import { NavLink, } from 'react-router-dom'
import './UserSignup.css'
import Crop from './../Cropping/Cropping'

class UserSignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      passwordsValid: false,
      passwordWarning: false,
      emailValid: false,
      emailWarning: false,
      croppingLoad: false,
      UserImage: null,
      UserEmail: null,
      UserPassword1: null,
      UserPassword2: null,
      UserName: null,
    }
  }


  userSignupRequest(theProps){
    if (this.state.passwordsValid && this.state.emailValid && theProps.UserPassword2 !== '') {
      const UserDataObject = {
        profilePic:  theProps.UserImage,
        email:  theProps.UserEmail,
        password:  theProps.UserPasssword2,
        username: theProps.UserName,
      }
      console.log('User data object post request.', UserDataObject)
      fetch('http://192.168.0.37:3000/signup-user', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json',},
        body: JSON.stringify(UserDataObject),
      })
        .then(response => {
          if (response.status === 401) {
            console.log('error you er fucked')
          }
          if (response.status === 200){
            window.location = '/login'
          }
        })
    } else {
      console.log('error cannot send!!!')
    }

  }

  arePasswordsTheSame(theProps){
    if (theProps.UserPassword1 === theProps.UserPassword2) {
      this.setState({passwordsValid: true,})
    } else {
      this.setState({passwordWarning: true,})
    }
  }

  removePasswordWarning(){
    this.setState({passwordWarning: false,})
  }
  removeEmailIsInvalid(){
    this.setState({emailWarning: false,})
  }

  warningPassWordNotEqual(bool){
    if(bool) return (<div> Passwords are not equal. </div>)
  }

  warningEmailInvalid(bool){
    if(bool) return (<div> Email is invalid. </div>)
  }

  imageProfileOrNot(bool){
    if (!bool) {
      var reader = new FileReader();
      reader.readAsDataURL(this.state.profilePic[0]);
      reader.onloadend = () => {
        this.setState({base64Image: reader.result,})
      }
    }
  }

  checkEmailValid(email){
    // regex email expression, which should cover 99% of cases.
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const bool = re.test(email)
    if (bool) {
      this.setState({emailValid: true,});
    }
    else {
      this.setState({emailWarning: true,});
    }
  }

  imageChange(image){
    if (!image) {
      return <img alt="" src={require('./../../assets/userImage.svg')} className="ProfilePic"/>
    } else {
      return <img alt="" src={image} className="ProfilePic"/>
    }
  }


  removeEmail = () => {
    this.setState({UserEmail: '',})
    this.removeEmailIsInvalid()
  }

  removePassword = (itemVal) => {
    this.setState({[itemVal]: '',})
    this.removePasswordWarning()
  }


  passImage = (image) => {
    this.setState({UserImage: image, croppingLoad: false,})
  }
  croppingPopUp(){
    if(this.state.croppingLoad) {
      return (
        <div className="PopUpBackground">
          <div className="CroppingBlock">
            <Crop passImage={this.passImage}/>
          </div>
        </div>
      )
    }

  }

  render() {
    return (
      <div>
        {this.croppingPopUp()}
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
                    <input className="EmailText"
                      type="email"
                      value={this.state.UserEmail}
                      placeholder="email@address.com"
                      onFocus={this.removeEmail}
                      onChange={(e) =>
                        this.setState({UserEmail: e.target.value,})
                      }
                    />
                    <input type="text" className="UsernameText"
                      value={this.state.UserName}
                      placeholder="Username"
                      onChange={(e) =>
                        this.setState({UserUsername: e.target.value,})
                      }
                    />
                    <input type="password" className="PasswordText"
                      value={this.state.UserPassword1}
                      placeholder="Password"
                      name="UserPassword1"
                      onFocus={(e) => this.removePassword(e.target.name)}
                      onChange={(e) => {
                        this.setState({UserPassword1: e.target.value,})
                      }}
                    />
                    <input type="password" className="PasswordText" id="pass2"
                      value={this.state.UserPassword2}
                      placeholder="Password"
                      name="UserPassword2"
                      onFocus={(e) => this.removePassword(e.target.name)}
                      onChange={(e) => {
                        this.setState({UserPassword2: e.target.value,})
                      }}
                    />
                    <input type="submit" className="PasswordText" id="pass2"
                      value="Choose profile image"
                      onClick={() => this.setState({croppingLoad: true,})}
                    />
                  </div>
                </div>
                <div className="LoginSend">
                  <div className="ProfilePicBox">
                    {this.imageChange(this.state.UserImage)}
                  </div>
                  <div className="SignupBox">
                    <input onClick={async () => {
                      await this.arePasswordsTheSame(this.state)
                      await this.checkEmailValid(this.state.UserEmail)
                      await this.userSignupRequest(this.state)
                    }}
                    className="LoginButton" type="submit" value="Sign up"
                    />
                    {this.warningPassWordNotEqual(this.state.passwordWarning)}
                    {this.warningEmailInvalid(this.state.emailWarning)}
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
      </div>
    )
  }
}

export default (UserSignup);
