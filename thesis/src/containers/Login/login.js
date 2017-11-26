import React, { Component, } from 'react';
import {NavLink} from 'react-router-dom'
import './Login.css'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: null,
      username: null,
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
              <div className="LoginMessage">login to your user account</div>
            </div>
            <div className="UserInputBox">
              <div className="LoginDetails">
                <div className="UserInput">
                  <label className="UsernameLable">Username:</label>
                  <input className="UsernameText" type="text"/>
                  <label className="PasswordLable">Password:</label>
                  <input  type="password" className="PasswordText"/>
                </div>
              </div>
              <div className="LoginSend">
                <div className="sendlogo"></div>
                <div className="sendBox">
                  <input className="LoginButton" type="submit" value="Log in"/>
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

//   <div className="AboutTitle"> zendama </div>
// <div className="About">
//     adalah text contoh digunakan didalam industri pencetakan dan typesetting.
//     Lorem Ipsum telah menjadi text contoh semenjak tahun ke 1500an, apabila
//     pencetak yang kurang terkenal mengambil sebuah galeri cetak dan merobakanya
//     menjadi satu buku spesimen. Ia telah bertahan bukan hanya selama lima kurun,
// </div>

{/* <form onSubmit={(e) => {
  e.preventDefault()
  console.log(e)
}} className="UserInputBox">
  <label className="UsernameLable">Username:</label>
    <input ref="username" className="UsernameText" type="text"/>
  <label className="PasswordLable">Password:</label>
    <input ref="password" type="password" className="PasswordText"/>
  <input type="submit" value="Log in"/>
</form> */}


export default Login;
