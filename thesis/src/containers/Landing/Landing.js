import React, { Component, } from 'react';
import './Landing.css';
// import { Route, } from 'react-router-dom';
import  base64  from 'base-64';

class Landing extends Component {
  constructor () {
    super();
    this.state = {
      email: null,
      password: null,
    }
  }
  loginRedir = () => window.location = '/login';
  corporateRedir = () => window.location = '/about_corporate';
  personalRedir = () => window.location = '/about_personal';

  saveAccessToken(token){
    window.localStorage.setItem('token', token)
  }

  loginRequest(loginData){
    let headers = new Headers();
    console.log(loginData);
    headers.append('Authorization', 'Basic ' + base64.encode(loginData.email + ':' + loginData.password));
    fetch('http://192.168.0.37:4200/login', {
      headers: headers,
    }).then(response => {
      console.log(response)
      if (response.status === 401) {
        this.setState({noAccess: true,});
        return 401;
      }
      if (response.status === 200){
        return (response.json())
      }
    }).then(r => {
      if (r !== 401) {
        console.log(r);
        this.saveAccessToken(r.token);
        window.location = '/panel';
      }
      else throw 'ERROR: 401 ACCESS DENIED';
    })
  }

  render() {
    return (
      <div className="landing-wrapper">
        <div className="landing-title">
          <img alt="" src={require('../../assets/zendomologo.png')} style={{maxHeight:'80px'}}/>
          <p className='landing-desc-alt-txt spacer'>spacer</p>
          <h1 className="landing-title-text" style={{color:'#aaa',}}>zendama</h1>
        </div>
        <div className='landing-desc'>
          <p className='landing-desc-txt'>Help your colleagues, receive rewards, share the love!</p>
          <p className='landing-desc-alt-txt spacer'>spacer</p>
          <p className='landing-desc-alt-txt'>Zendama is a catalyst for harmony and friendship in the buisness place.</p>
          <p className='landing-desc-alt-txt'>Get rewards from your place of work for being a good employee and helping out.</p>
          <p className='landing-desc-alt-txt'>Reward those who help you with something that will really make a difference.</p>
          <p className='landing-desc-alt-txt spacer'>spacer</p>
          <p className='landing-desc-alt-txt' style={{paddingBottom:'3vh',}}>Sounds good right?</p>
          <input className="u-full-width" style={{width:'50%',}}
            type="email"
            value={this.state.email}
            placeholder="Email"
            onFocus={() => this.setState({noAccess: false, email: '',})}
            onChange={(e) => this.setState({email: e.target.value,})}
          />
          <input type="password" className="u-full-width" style={{width:'50%', marginBottom:'3vh',}}
            value={this.state.password}
            placeholder="Password"
            onFocus={() => this.setState({noAccess: false, password: '',})}
            onChange={(e) => this.setState({password: e.target.value,})}
          />
          <div className='landing-button'style={{transform:'scale(1.2)',}} onClick={this.loginRequest.bind(this, this.state)}>Login</div>
          <p className='landing-desc-alt-txt spacer'>spacer</p>
        </div>
        <div className='landing-business'>
          <h5 className='landing-desc-alt-txt'>Get Started</h5>
          <p className='landing-desc-alt-txt spacer'>spacer</p>
          <div style={{display:'flex',flexDirection:'row',}}>
            <div className='landing-button' onClick={this.corporateRedir}>Corporate</div>
            <div className='landing-button' onClick={this.personalRedir}>Personal</div>
          </div>
        </div>
        <div className='landing-bottom-bar'>
          <img alt="" src={require('../../assets/github-white.svg')} style={{maxHeight:'25px',}}/>
          <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
          <img alt="" src={require('../../assets/facebook-black-icon.png')} style={{maxHeight:'35px',}}/>
          <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
          <img alt="" src={require('../../assets/twitter.svg')} style={{maxHeight:'25px',}}/>
        </div>
      </div>
    );
  }
}

export default Landing;
