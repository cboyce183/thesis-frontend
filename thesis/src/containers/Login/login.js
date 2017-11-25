import React, { Component, } from 'react';

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
        <div className="UserInputContainer">
          <form onSubmit={(e) => {
            e.preventDefault()
            console.log(e.target)
          }} className="UserInputBox">
            <label>Username:</label>
              <input ref="username" className="UsernameText" type="text"/>
            <label>Password:</label>
              <input ref="password" type="password" className="PasswordText"/>
            <input type="submit" value="Log in"/>
          </form>
        </div>
        <div className="AboutContainer">
          <div className="AboutBox">
          <div className="AboutTitle"> dipopularkan </div>
            <div className="About">
                adalah text contoh digunakan didalam industri pencetakan dan typesetting.
                Lorem Ipsum telah menjadi text contoh semenjak tahun ke 1500an, apabila
                pencetak yang kurang terkenal mengambil sebuah galeri cetak dan merobakanya
                menjadi satu buku spesimen. Ia telah bertahan bukan hanya selama lima kurun,
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
