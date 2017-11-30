import React, { Component, } from 'react';
import '../../App.css';
import './CompanyRegistry1.css';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';
import { saveCompanyInfo, } from '../../actions';
import ReactFileReader from 'react-file-reader';


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
      displayImg:false,
      imagePath:'',
    }
  }

  handleCompanySignIn = () => {
    if (this.passwordMatch()){
      this.props.saveCompanyInfo(this.state)
    } else {
      alert('Passwords do not match.')
    }
  }

  handleFiles = files => {
    this.setState({
      imagePath:files.base64,
      displayImg: true,
    })
  }

  passwordMatch = () => {
    return this.state.password === this.state.password2
      ? true
      : false;
  }

  onFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
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
              name="email"
              placeholder="Company@email.com"
              value={this.state.email}
              onChange={this.onFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="text"
              name="name"
              placeholder="Company Name"
              value={this.state.name}
              onChange={this.onFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onFieldChange}
            />
            <input
              className="u-full-width cp-reg-1"
              type="password"
              name="password2"
              placeholder="repeat password"
              value={this.state.password2}
              onChange={this.onFieldChange}
            />
          </div>
          <div className='company-logo'>
            <div className='add-logo'>
              <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                <button style={style} className='btn-upload'>Upload Your Company Logo</button>
              </ReactFileReader>
            </div>
            <div className="img-input">
              <div className="company-logo-img">
                <img className="img-company-reg-logo" name="logo" onChange={this.onFieldChange} src={this.state.imagePath} alt='company Logo'/>

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
