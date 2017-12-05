import React, { Component, } from 'react';
import { NavLink, } from 'react-router-dom'
import './UserSignup.css'
import Crop from './../Cropping/Cropping'
import base64 from 'base-64';

class UserSignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      passwordWarning: false,
      emailWarning: false,
      croppingLoad: false,
      popped: false,
      UserImage: '',
      email: '',
      password: '',
      password2: '',
      userName: '',
      firstName: '',
      lastName: '',
    }
  }

  handleSignUpProcess = () => {
    this.handleValidPassword();
    this.handleValidEmail();
    this.handleUserSignUp(this.state);
  }

  handleValidPassword = () => {
    if (this.state.password === this.state.password2) {
      this.setState({passwordWarning: false,})
    } else {
      this.setState({passwordWarning: true,})
    }
  }

  handleValidEmail = () => {
    // regex email expression, which should cover 99% of cases.
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const bool = re.test(this.state.email)
    if (bool) {
      this.setState({emailWarning: false,});
    }
    else {
      this.setState({emailWarning: true,});
    }
  }

  handleUserSignUp = () => {
    if (!this.state.passwordWarning && !this.state.emailWarning && this.state.password2 !== '') {
      const UserDataObject = {
        profilePic:  this.state.UserImage,
        email:  this.state.email,
        password:  this.state.password2,
        userName: this.state.userName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      }
      const query = window.location.href.match(/user-id=(.*)$/)[1];
      if(!window.location.href.match(/user-id=(.*)$/)){
        // window.location.replace('/about_personal')
      }
      fetch(`http://192.168.0.37:4200/signup-user?user-id=${query}`, {
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
            alert('unauthorized access');
          }
          if (response.status === 200) {
            let headers = new Headers();
            headers.append('Authorization', `Basic ${base64.encode(`${this.state.email}:${this.state.password}`)}`);
            fetch('http://192.168.0.37:4200/login', {
              headers: headers,
              mode: 'cors',
            })
              .then(res => res.json())
              .then(res => {
                window.localStorage.setItem('token', res.token)
                window.location = '/panel';
              })
              .catch(e => console.error(e));
          }
        })
    } else {
      console.error('error cannot send!!!')
    }
  }

  handlePopUp = (image) => {
    this.setState({
      UserImage: image,
      popped: !this.state.popped,
    })
  }

  handleFieldChange = (event) => {
    this.setState({[event.target.name]: event.target.value,})
  }

  //=============================================RENDERING

  renderPasswordWarning = () => {
    if (this.state.passwordWarning) return (<div> Passwords don't match. </div>)
  }

  renderEmailWarning = () => {
    if (this.state.emailWarning) return (<div> Invalid e-mail. </div>)
  }

  renderImageChange = (image) => {
    if (!image) {
      return <div className="ProfilePicBox"><p>Upload a profile picture</p></div>
    } else {
      return <img alt="" src={image} className="ProfilePic"style={{maxHeight:'200px'}}/>
    }
  }

  renderCroppingPopUp = () => {
    if (this.state.popped) {
      return (
        <Crop unpop={this.handlePopUp.bind(this)}/>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderCroppingPopUp()}
        <div className="Container">
          <div className="MainPannel">
            <div className="UserInputContainer">
              <h4 style={{alignSelf:'center', paddingBottom:'5vh',}}>User Sign-up</h4>
              <div className="UserInputBox">
                <div className="LoginDetails">
                  <input
                    type="text"
                    name="firstName"
                    className="u-full-width"
                    value={this.state.firstName}
                    placeholder="First name"
                    onChange={this.handleFieldChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    className="u-full-width"
                    value={this.state.LastName}
                    placeholder="Last name"
                    onChange={this.handleFieldChange}
                  />
                  <input
                    type="email"
                    name="email"
                    className="u-full-width"
                    value={this.state.email}
                    placeholder="e-mail"
                    onChange={this.handleFieldChange}
                  />
                  <input
                    type="text"
                    name="userName"
                    className="u-full-width"
                    value={this.state.userName}
                    placeholder="Username"
                    onChange={this.handleFieldChange}
                  />
                  <input
                    type="password"
                    name="password"
                    className="u-full-width"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handleFieldChange}
                  />
                  <input
                    type="password"
                    name="password2"
                    className="u-full-width"
                    id="pass2"
                    value={this.state.password2}
                    placeholder="Confirm password"
                    onChange={this.handleFieldChange}
                  />
                </div>
                <div className="LoginSend">
                  <div
                    style={{ zIndex:1, }}
                    className="ProfilePicBoxWrapper"
                    onClick={() => this.setState({popped: true,})}
                  >
                    {this.renderImageChange(this.state.UserImage)}
                  </div>
                  <div className="SignupBox">
                    <div
                      onClick={this.handleSignUpProcess}
                      className="nxt-btn-cp" style={{fontSize:'15px',}}
                    >Sign-up</div>
                    {this.renderPasswordWarning(this.state.passwordWarning)}
                    {this.renderEmailWarning(this.state.emailWarning)}
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
