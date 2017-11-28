import React, { Component, } from 'react';
import { NavLink, } from 'react-router-dom'
import './UserSignup.css'
// import base64 from 'base-64'
// import { connect, } from 'react-redux'
import { connect, } from 'react-redux';
import { UserName, Password1, Password2, Email, ClearEmail, ClearPassword1, ClearPassword2,} from './../../actions/index.js'


class UserSignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      passwordNotEqual: false,
      emailIsInvalid: false,
    }
  }

  userSignupRequest(theProps){
    if (this.state.passwordNotEqual && this.state.emailIsInvalid) {
      fetch('http://localhost:8080/', {
        method: 'POST',
        body: {
          UserImage:  theProps.UserImage,
          UserEmail:  theProps.UserEmail,
          UserPasssword:  theProps.UserPasssword2,
          UserName: theProps.UserName,
        },
      })
    } else {
      console.log("error cannot send!!!")
    }

  }

  arePasswordsTheSame(theProps){
    console.log("the password test...")
    if (theProps.UserPasssword1 === theProps.UserPasssword2) {
      console.log(true)
    } else {
      this.setState({passwordNotEqual: true,})
    }
  }

  removePasswordWarning(){
    this.setState({passwordNotEqual: false,})
  }
  removeEmailIsInvalid(){
    this.setState({emailIsInvalid: false,})
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
    var re = /\S+@\S+\.\S+/;
    const bool = re.test(email)
    this.setState({emailIsInvalid: !bool,});
  }

  imageChange(image){
    if (!image) {
      return <img alt="" src={require('./../../assets/userImage.svg')} className="ProfilePic"/>
    } else {
      return <img alt="" src={image} className="ProfilePic"/>
    }
  }

  render() {
    console.log(this.state)
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
                  <input className="EmailText"
                    type="email"
                    value={this.props.UserEmail}
                    placeholder="email@address.com"
                    onFocus={() => {
                      this.props.clearEmail()
                      this.removeEmailIsInvalid()
                    }}
                    onChange={(e) =>
                      this.props.email(e.target.value)
                    }
                  />
                  {/* <label className="PasswordLable" >Password:</label> */}
                  <input type="text" className="UsernameText"
                    value={this.props.UserName}
                    placeholder="Username"
                    onChange={(e) =>
                      this.props.username(e.target.value)
                    }
                  />
                  <input type="password" className="PasswordText"
                    value={this.props.UserPasssword1}
                    placeholder="Password"
                    onFocus={() => {
                      this.props.clearPassword1()
                      this.removePasswordWarning()
                    }}
                    onChange={(e) => {
                      this.props.password1(e.target.value)
                    }}
                  />
                  <input type="password" className="PasswordText" id="pass2"
                    value={this.props.UserPasssword2}
                    placeholder="Password"
                    onFocus={() => {
                      this.props.clearPassword2()
                      this.removePasswordWarning()
                    }}
                    onChange={(e) => {
                      this.props.password2(e.target.value)
                    }}
                  />
                  <NavLink to='/cropping'>
                    <input type="submit" className="PasswordText" id="pass2"
                      value="Choose profile image"
                    />
                  </NavLink>
                </div>
              </div>
              <div className="LoginSend">
                <div className="ProfilePicBox">
                  {this.imageChange(this.props.UserImage)}
                </div>
                <div className="SignupBox">
                  <input onClick={() => {
                    this.arePasswordsTheSame(this.props)
                    this.checkEmailValid(this.props.UserEmail)
                  }}
                  className="LoginButton" type="submit" value="Sign up"
                  />
                  {this.warningPassWordNotEqual(this.state.passwordNotEqual)}
                  {this.warningEmailInvalid(this.state.emailIsInvalid)}
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

const mapStateToProps = (state) => ({
  UserImage: state.UserImage,
  UserEmail: state.UserInfo.email,
  UserPasssword1: state.UserInfo.password1,
  UserPasssword2: state.UserInfo.password2,
  UserName: state.UserInfo.username,
})

const mapDispatchToProps = (dispatch) => ({
  // saveUserInfoToState: (info) => dispatch(saveUserInfoToState(info)),
  username: (name) => dispatch(UserName(name)),
  password1: (pass) => dispatch(Password1(pass)),
  password2: (pass) => dispatch(Password2(pass)),
  email: (email) => dispatch(Email(email)),
  clearEmail: () => dispatch(ClearEmail()),
  clearPassword1: () => dispatch(ClearPassword1()),
  clearPassword2: () => dispatch(ClearPassword2()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
