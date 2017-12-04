import React, { Component, } from 'react';
import ReactFileReader from 'react-file-reader';
import validator from 'email-validator';

import { connect, } from 'react-redux';
import { saveCompanyInfo, } from '../../actions';

import '../../App.css';
import './CompanyRegistry.css';

class CompanyRegistry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      password2: '',
      logo:'',
      imagePath:'',
      valid: false,
      weeklyAllow: 0,
      coinName: '',
    }
  }

  handleEmailValidation = () => validator.validate(this.state.email);

  handlePasswordMatch = () => this.state.password === this.state.password2;

  handleFiles = files => {
    this.setState({
      imagePath: files.base64,
      uploaded: true,
    })
  }

  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleCompanySignIn = () => {
    if (this.handlePasswordMatch()){
      if (this.handleEmailValidation()) {
        if (this.state.imagePath) {
          this.props.saveCompanyInfo(this.state);
          this.setState({ valid: true, });
        } else alert('Please upload a logo.');
      } else alert('Invalid email.');
    } else {
      alert('Passwords do not match.')
    }
  }

  handleCompanyRegistry = async data => {
    if (this.state.coinName && this.state.weeklyAllow)
      fetch ('http://192.168.0.37:4200/company', {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          password: this.state.password,
          logo: this.state.imagePath,
          coinName: this.state.coinName,
          weeklyAllow: this.state.weeklyAllow,
        }),
      })
        .then(response => {
          if (response.status === 409) alert('chosen e-mail already exists')
          if (response.status === 201) window.location = '/panel';
        })
        .catch(e => console.error(e));
  }

  //============================================RENDERING

  renderCoinForm = () => {
    if (this.state.valid) return (
      <div className="coin-name-allow-cont">
        <input
          className="u-full-width coin-info"
          type="text"
          name="coinName"
          placeholder="Currency Name"
          value={this.state.coinName}
          onChange={this.handleFieldChange}
        />
        <input
          className="u-full-width coin-info"
          type="number"
          name="weeklyAllow"
          placeholder="Weekly Allowance $"
          value={this.state.weeklyAllow}
          onChange={this.handleFieldChange}
        />
        <div className="nxt-btn-cp" onClick={this.handleCompanyRegistry}>create</div>
      </div>
    );
  }

  renderLogoPicker = () => {
    return this.state.uploaded
      ? (
        <img
          className="img-company-reg-logo"
          name="logo"
          onChange={this.handleFieldChange}
          src={this.state.imagePath}
          alt='company Logo'
        />
      ) : (
        <ReactFileReader base64={true} handleFiles={this.handleFiles}>
          <div className="logo-upload-container">
            <p className="logo-upload-text">upload your logo</p>
          </div>
        </ReactFileReader>
      )
  }

  styleNextButton = () => this.state.valid ? {opacity: '0',} : {opacity: '1',};

  render() {
    return (
      <div className="MaxWidth">
        <div className='cmpy-reg-1-label'>
          <h3>Sign up for Zendama</h3>
        </div>
        <div className='company-reg-container'>
          <div className='company-signup-info'>
            <input
              className="u-full-width cp-reg-1"
              type="email"
              name="email"
              placeholder="Business email"
              value={this.state.email}
              onChange={this.handleFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="text"
              name="name"
              placeholder="Company name"
              value={this.state.name}
              onChange={this.handleFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="password"
              name="password2"
              placeholder="Confirm password"
              value={this.state.password2}
              onChange={this.handleFieldChange}
            />
            {this.renderCoinForm()}
          </div>
          <div className='company-logo'>
            <div className='add-logo'>
              {this.renderLogoPicker()}
            </div>
            <div className='nxt-btn-cp' onClick={this.handleCompanySignIn} style={this.styleNextButton()}>
              next
            </div>
          </div>
        </div>
        <p className="powered-by">Powered by Zendama</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCompanyInfo: (data) => dispatch(saveCompanyInfo(data)),
});


export default connect(null, mapDispatchToProps)(CompanyRegistry);
