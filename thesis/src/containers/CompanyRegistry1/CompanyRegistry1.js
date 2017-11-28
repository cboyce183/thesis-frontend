import React, { Component } from 'react';
import '../../App.css';
import './CompanyRegistry1.css';
import { Link } from 'react-router-dom';
import Captcha from 'react-captcha';
import { connect } from 'react-redux';
import { saveCompanyInfo } from '../../actions';
import ReactFileReader from 'react-file-reader';



class CompanyRegistry1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      companyEmail: '',
      companyUserName: '',
      companyPassword: '',
      companyPassword2: '',
      companyLogo:'',
      displayImg:false,
      imagePath:'',
    }

  }


handleCompanySignIn = () => {
  console.log('Company email: ' + this.state.companyEmail);
  console.log('Company username: ' + this.state.companyUserName);
  console.log('Company password: ' + this.state.companyPassword);
  console.log('Company password: ' + this.state.companyPassword2);
  console.log('Company logo: ' + this.state.companyLogo);
  // if(this.repeatPassword){
  //   return alert('Please enter the same password.')
  // }
  this.props.saveCompanyInfo(this.state);
}

handleFiles = files => {
  console.log(files, 'pic info');
  this.setState({
    imagePath:files.base64,
    displayImg: true
  })
}

repeatPassword = () => {
  return this.state.companyPassword !== this.state.companyPassword2
    ? true
    : false;
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
            <Captcha
            sitekey = '6LfWqjoUAAAAAJQ8zuAH7tmUWYYx6VZ5Jrah7gEs'
            lang = 'en'
            theme = 'light'
            type = 'image'
            callback = {(value) => console.log(value)}/>
          </div>
          <div className='company-logo'>
            <div className="img-input">
              <p>Add Your Company Logo</p>
              {
                this.state.displayImg && (
                  <img src={this.state.imagePath}/>
                )
              }
            <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                <button className='btn'>Upload</button>
              </ReactFileReader>
            </div>
            <Link to={{pathname: '/companyregistry2'}}>
              <div>
                <input
                className="button-primary nxt-btn"
                type="submit"
                value="Next"
                //onChange={this.repeatPassword}
                onClick={this.handleCompanySignIn}
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

const mapDispatchToProps = (dispatch) => ({
  saveCompanyInfo: (data) => dispatch(saveCompanyInfo(data)),
});


export default connect(null, mapDispatchToProps)(CompanyRegistry1);
