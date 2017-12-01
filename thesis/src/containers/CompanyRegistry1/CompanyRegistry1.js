import React, { Component, } from 'react';
import '../../App.css';
import './CompanyRegistry1.css';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';
import { saveCompanyInfo, } from '../../actions';
import ReactFileReader from 'react-file-reader';

const validator = require("email-validator");


const style = {
  borderWidth:'1.5px',
  borderStyle: 'solid',
  borderColor: '#040223',
  fontWeight: '650',
}

class CompanyRegistry1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      password2: '',
      logo:'',
      imagePath:'',
    }

    this.valid = false;
  }

  handleCompanySignIn = () => {
    if (this.passwordMatch()){
      if (this.emailValidator()) {
        if (this.state.imagePath) {
          this.props.saveCompanyInfo(this.state);
          this.valid = true;  
        } else alert('Please upload a logo.');
      } else alert('Invalid email.');
    } else {
      alert('Passwords do not match.')
    }
  }

  handleFiles = files => {
    this.setState({
      imagePath: files.base64,
      uploaded: true,
    })
  }

  emailValidator = () => validator.validate(this.state.email);

  passwordMatch = () => this.state.password === this.state.password2;

  rerouter = () => this.valid ? '/companyregistry2' : '/companyregistry1';  

  onFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  logoChanger = () => {
    if (this.state.uploaded) return (
      <img className="img-company-reg-logo" name="logo" onChange={this.onFieldChange} src={this.state.imagePath} alt='company Logo'/>      
    )
    return (
      <ReactFileReader base64={true} handleFiles={this.handleFiles}>
        <div className="logo-upload-container">
          <p className="logo-upload-text">upload your logo</p>
        </div>
      </ReactFileReader>
    )
  }


  render() {
    return (
      <div className="MaxWidth">
        <div className='cmpy-reg-1-label'>
          <h3>Sign up for Zendama</h3>
        </div>
        <div className='company-reg-container'>
          <div className='company-siginup-info'>
            <input
              className="u-full-width cp-reg-1"
              type="email"
              name="email"
              placeholder="Business email"
              value={this.state.email}
              onChange={this.onFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="text"
              name="name"
              placeholder="Company name"
              value={this.state.name}
              onChange={this.onFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="password"
              name="password2"
              placeholder="Confirm password"
              value={this.state.password2}
              onChange={this.onFieldChange}
            />
          </div>
          <div className='company-logo'>
            <div className='add-logo'>
              {this.logoChanger()}
            </div>
            <Link to={this.rerouter()} style={{textDecoration:'none'}}>
              <div className='nxt-btn-cp' onClick={this.handleCompanySignIn}>
                next
              </div>
            </Link>
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


export default connect(null, mapDispatchToProps)(CompanyRegistry1);
