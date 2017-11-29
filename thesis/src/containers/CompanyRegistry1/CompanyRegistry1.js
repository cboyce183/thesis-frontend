import React, { Component, } from 'react';
import '../../App.css';
import './CompanyRegistry1.css';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';
import { saveCompanyInfo, } from '../../actions';
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
    if (this.passwordMatch()){
      this.props.saveCompanyInfo(this.state)
    } else {
      alert('Passwords do not match')
    }
  }

  handleFiles = files => {
    this.setState({
      imagePath:files.base64,
      displayImg: true,
    })
  }

  passwordMatch = () => {
    return this.state.companyPassword === this.state.companyPassword2
      ? true
      : false;
  }



  render() {
    console.log(this.state);
    return (
      <div className="MaxWidth">
        <div className='cmpy-reg-1-label'>
          <h3>Company Registry</h3>
        </div>
        <div className='company-reg-container'>
          <div className='company-siginup-info'>
            <input
              className="u-full-width cp-reg-1"
              type="email"
              placeholder="Company-Email@mailbox.com"
              id="exampleEmailInput"
              // ref={el => this.test = el}
              onChange={(e) => this.setState({companyEmail: e.target.value,})}
            />
            <input
              className="u-full-width cp-reg-1"
              type="text"
              placeholder="Company Username"
              id="exampleEmailInput"
              //value={this.state.companyUserName}
              onChange={(e) => this.setState({companyUserName: e.target.value,})}
            />
            <input
              className="u-full-width cp-reg-1"
              type="password"
              placeholder="Password"
              //value={this.state.companyPassword}
              onChange={(e) => this.setState({companyPassword: e.target.value,})}
            />
            <input
              className="u-full-width cp-reg-1"
              type="password"
              placeholder="Repeat Password"
              //value={this.state.companyPassword2}
              onChange={(e) => this.setState({companyPassword2: e.target.value,})}
            />
          </div>
          <div className='company-logo'>
            <div className='add-logo'>
              <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                <button className='btn-upload'>Upload Your Company Logo</button>
              </ReactFileReader>
            </div>
            <div className="img-input">
              <div className="company-logo-img">
                {
                  this.state.displayImg && (
                    <img className="img-company-reg-logo" src={this.state.imagePath} alt='company Logo'/>
                  )
                }
              </div>
            </div>

            <Link to={'/companyregistry2'}>
              <div className='nxt-btn-cp'>
                <input
                  className="button-primary"
                  type="submit"
                  value="Next"
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
