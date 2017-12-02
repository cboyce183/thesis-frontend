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
      firstName: null,
      lastName: null
    }
  }


  userSignupRequest(theProps){
    if (this.state.passwordsValid && this.state.emailValid && theProps.UserPassword2 !== '') {
      const UserDataObject = {
        profilePic:  theProps.UserImage,
        email:  theProps.UserEmail,
        password:  theProps.UserPasssword2,
        username: theProps.UserName,
        firstName: theProps.firstName,
        lastName: theProps.lastName
      }
      const query = window.location.href.match(/user-id=(.*)$/)[1];
      fetch(`http://localhost:4200/signup-user?user-id=${query}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify(UserDataObject),
        mode: 'cors',
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
      console.error('error cannot send!!!')
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
      return <div className="ProfilePicBox"><p>Upload profile picture</p></div>
    } else {
      return <img alt="" src={image} className="ProfilePic"style={{maxHeight:'200px'}}/>
    }
  }

  passImage = (image) => {
    this.setState({UserImage: image, croppingLoad: false,})
  }

  removeEmail = () => {
    this.setState({UserEmail: '',})
    this.removeEmailIsInvalid()
  }

  removePassword = (itemVal) => {
    this.setState({[itemVal]: '',})
    this.removePasswordWarning()
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
            <h4 style={{alignSelf:'center', paddingBottom:'5vh'}}>User Sign-up</h4>
              <div className="UserInputBox">
                <div className="LoginDetails">
                    <input className="u-full-width"
                      type="email"
                      value={this.state.firstName}
                      placeholder="First name"
                      onChange={(e) =>
                        this.setState({firstName: e.target.value,})
                      }
                    />
                    <input className="u-full-width"
                      type="email"
                      value={this.state.LastName}
                      placeholder="Last name"
                      onChange={(e) =>
                        this.setState({lastName: e.target.value,})
                      }
                    />
                    <input className="u-full-width"
                      type="email"
                      value={this.state.UserEmail}
                      placeholder="E-mail"
                      onFocus={this.removeEmail}
                      onChange={(e) =>
                        this.setState({UserEmail: e.target.value,})
                      }
                    />
                    <input type="text" className="u-full-width"
                      value={this.state.UserName}
                      placeholder="Username"
                      onChange={(e) =>
                        this.setState({UserUsername: e.target.value,})
                      }
                    />
                    <input type="password" className="u-full-width"
                      value={this.state.UserPassword1}
                      placeholder="Password"
                      name="UserPassword1"
                      onFocus={(e) => this.removePassword(e.target.name)}
                      onChange={(e) => {
                        this.setState({UserPassword1: e.target.value,})
                      }}
                    />
                    <input type="password" className="u-full-width" id="pass2"
                      value={this.state.UserPassword2}
                      placeholder="Confirm password"
                      name="UserPassword2"
                      onFocus={(e) => this.removePassword(e.target.name)}
                      onChange={(e) => {
                        this.setState({UserPassword2: e.target.value,})
                      }}
                    />
                </div>
                <div className="LoginSend">
                  <div style={{zIndex:1}} className="ProfilePicBoxWrapper" onClick={() => this.setState({croppingLoad: true,})}>
                    {this.imageChange(this.state.UserImage)}
                  </div>
                  <div className="SignupBox">
                    <div onClick={async () => {
                      await this.arePasswordsTheSame(this.state)
                      await this.checkEmailValid(this.state.UserEmail)
                      await this.userSignupRequest(this.state)
                    }}
                    className="nxt-btn-cp" style={{fontSize:'15px'}}>Sign-up</div>
                    {this.warningPassWordNotEqual(this.state.passwordWarning)}
                    {this.warningEmailInvalid(this.state.emailWarning)}
                  </div>
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
