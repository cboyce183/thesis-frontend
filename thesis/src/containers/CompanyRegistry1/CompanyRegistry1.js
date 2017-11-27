import React, { Component } from 'react';
import '../../App.css';
import './companyregistry1.css';
import { Link } from 'react-router-dom';
import Captcha from 'react-captcha';



class CompanyRegistry1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      companyEmail: '',
      companyUserName: '',
      companyPassword: '',
      companyPassword2: '',
      companyLogo:'',
    }
  }


handleCompanySignIn = () => {
  console.log('Company email: ' + this.state.companyEmail);
  console.log('Company username: ' + this.state.companyUserName);
  console.log('Company password: ' + this.state.companyPassword);
  console.log('Company password: ' + this.state.companyPassword2);
  console.log('Company logo: ' + this.state.companyLogo);
}

repeatPassword = (str1, str2) => {
  if (this.state.companyPassword !== this.state.companyPassword2){
    return alert('Please enter the same password.');
  } else{
    this.handleCompanySignIn()
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
            value={this.state.companyEmail}
            onChange={(e) => this.setState({companyEmail: e.target.value,})}
            />
            <input
            className="u-full-width"
            type="Email"
            placeholder="Company Username"
            id="exampleEmailInput"
            value={this.state.companyUserName}
            onChange={(e) => this.setState({companyUserName: e.target.value,})}
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
            value={this.state.companyPassword2}
            onChange={(e) => this.setState({companyPassword2: e.target.value,})}
            />
            <div className="g-recaptcha" data-sitekey="6LddoDoUAAAAANRFc_JW4zyweDbErXN0EglvHuIz"></div>
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
                onChange={this.handleCompanySignIn}
                onClick={() => this.repeatPassword()}
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
