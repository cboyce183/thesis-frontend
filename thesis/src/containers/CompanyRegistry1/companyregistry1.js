import React, { Component } from 'react';
import '../../App.css';
import './companyregistry1.css';
import { Link } from 'react-router-dom';

const Captcha = require('react-captcha');

class CompanyRegistry1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      companyEmail: '',
      companyUserName: '',
      companyPassword: '',
      companyLogo:'',
    }
  }

//   getCompanySignIn (data) {
//   const config = new Request (`http://localhost:3000/CompanyRegistry1${data}`, {
//     method: 'GET',
//     headers: new Headers({
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     })
//   })
//   return fetch(config);
// }

repeatPassword = (str1, str2) => {
  if(str1 !== str2){

  }
}

  render() {
    return (
      <div className="MaxWidth">
        <div className='company-reg-container'>
          <div className='company-siginup-info'>
            <input
            className="u-full-width"
            type="Email"
            placeholder="Company-Email@mailbox.com"
            id="exampleEmailInput"
            value={this.state.companyUsername}
            onChange={(e) => this.setState({companyUsername: e.target.value,})}
            />
            <input
            className="u-full-width"
            type="Email"
            placeholder="Company Username"
            id="exampleEmailInput"
            value={this.state.companyEmail}
            onChange={(e) => this.setState({companyEmail: e.target.value,})}
            />
            <input
            className="u-full-width"
            type="password"
            placeholder="Password"
            value={this.state.companyPassword}
            onChange={(e) => this.setState({companyPassword: e.target.value,})}
            />
            <input
            className="u-full-width"
            type="password"
            placeholder="Repeat Password"
            value={this.state.companyPassword}
            onChange={(e) => this.setState({companyPassword: e.target.value,})}
            />
            <Captcha
            sitekey = '6LddoDoUAAAAANRFc_JW4zyweDbErXN0EglvHuIz'
            lang = 'en'
            theme = 'dark'
            type = 'image'
            callback = {(value) => console.log(value)}/>
          </div>
          <div className='company-logo'>
            <div className="img-input">
              <p>Add Your Company Logo</p>
              <input
              type="file"
              name="pic"
              accept="image/*"
              value={this.state.companyLogo}
              onChange={(e) => this.setState({companyLogo: e.target.value,})}
              />
            </div>
            <Link to={{pathname: '/companyregistry2'}}>
              <div>
                <input
                className="button-primary nxt-btn"
                type="submit"
                value="Next"
                />
              </div>
            </Link>
          </div>
        </div>
          <p className="powered-by">Powered by Zendama</p>
      </div>
    );
  }
}

export default CompanyRegistry1;
