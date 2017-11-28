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
    this.repeatPassword()
      ? this.props.saveCompanyInfo(this.state)
      : alert('Passwords do not match');
  }

  handleFiles = files => {
    this.setState({
      imagePath:files.base64,
      displayImg: true,
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
              type="email"
              placeholder="Company-Email@mailbox.com"
              id="exampleEmailInput"
              value={this.state.companyEmail}
              onChange={(e) => this.setState({companyEmail: e.target.value,})}
            />
            <input
              className="u-full-width"
              type="text"
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
          </div>
          <div className='company-logo'>
            <div className='add-logo'>
              <p>Add Your Company Logo</p>
              <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                <button className='btn-upload'>Upload</button>
              </ReactFileReader>
            </div>
            <div className="img-input">
              <div >
                {
                  this.state.displayImg && (
                    <img src={this.state.imagePath} alt='company Logo'/>
                  )
                }
              </div>
            </div>

            <Link to={'/companyregistry2'}>
              <div>
                <input
                  className="button-primary nxt-btn-cp"
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
