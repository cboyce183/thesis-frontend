import React, { Component, } from 'react';
import './Landing.css';
// import { Route, } from 'react-router-dom';

import { Link, } from 'react-router-dom';

import  base64  from 'base-64';

class Landing extends Component {
  constructor () {
    super();
    this.state = {
      email: null,
      logo: false,
      password: null,
    }
  }
  loginRedir = () => window.location = '/login';
  corporateRedir = () => window.location = '/about_corporate';
  personalRedir = () => window.location = '/about_personal';

  componentDidMount = () => {
    window.addEventListener('scroll',this.renderLogo);
  }

  saveAccessToken(token){
    window.localStorage.setItem('token', token)
  }

  loginRequest(loginData){
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(loginData.email + ':' + loginData.password));
    fetch('http://192.168.0.37:4200/login', {
      headers: headers,
    }).then(response => {
      if (response.status === 401) {
        this.setState({noAccess: true,});
        return 401;
      }
      if (response.status === 200){
        return (response.json())
      }
    }).then(r => {
      if (r !== 401) {
        this.saveAccessToken(r.token);
        window.location = '/panel';
      }
      else {
        alert('Zendama: Invalid credentials, please try again');
      }
    })
  }

  renderLogo = () => {
    let {logo,} = this.state
    window.scrollY > 350
      ? !logo && this.setState({logo:true,})
      : logo && this.setState({logo:false,})
  }

  render() {
    return (
      <div className="LandingWrapper">
        <div className="LandingHeader">
          <div className="HeaderWrapper">
            <div className="HeaderLogoWrapper">
              <img className={`HeaderLogo${!this.state.logo ? ' HideIt' : ''}`} alt="logo" src={require('../../assets/zendamalogo-purple.png')} />
              <h1 className="landing-title-text">Zendama</h1>
            </div>
            <div className="HeaderMenu">
            </div>
          </div>
        </div>
        <div className="LandingBanner">
          <div className="LandingTitle">
            <div className="LandingForm">
              <div className="LandingLogo"></div>
              <div className="LogoTextWrap">
                <h1>Go together if you want to go far</h1>
              </div>
              <div className="LoginForm">
                <p>Already have an account?</p>
                <input className="InputLogin"
                  type="email"
                  value={this.state.email}
                  placeholder="Email"
                  onFocus={() => this.setState({noAccess: false, email: '',})}
                  onChange={(e) => this.setState({email: e.target.value,})}
                />
                <input type="password" className="InputLogin"
                  value={this.state.password}
                  placeholder="Password"
                  onFocus={() => this.setState({noAccess: false, password: '',})}
                  onChange={(e) => this.setState({password: e.target.value,})}
                />
                <input type="submit" className='landing-button' onClick={this.loginRequest.bind(this, this.state)} value="login" />
              </div>
            </div>
          </div>
        </div>
        <div className="DividerSection">
          <div className="Section">
            <div className="SectionText">
              <p className='landing-desc-txt'>Share The Love!</p>
              <p className='landing-desc-alt-txt'>Zendama is a catalyst for harmony and friendship in the work-place: get rewards for being a good employee and helping out your co-workers or reward those that help you with something that will really make a difference. Sounds awesome right?</p>
              {/* <p className='landing-desc-alt-txt' style={{paddingBottom:'3vh',}}></p> */}
            </div>
            <input type="submit" className='SectionDividerButton' value="i wanna know more" />
          </div>
        </div>
        <div className="PersonalSection">
          <div className="Purple">
            <div className="MainSection">
              <div className="MainSectionText">
                <p className='landing-desc-txt'>What can Zendama do for your company?</p>
                <p className='landing-desc-alt-txt'>Zendama will encourage a sense of responsability amongst your employees, both over their own work and the work of colleagues; it will promote a culture of sharing each other's success and collaboration. For HR departments, it will also double as an incredible tool: detecting bottlenecks, finding topics/tasks your employees are struggling with or trully valuable employees has never been this simple!</p>
                <Link className="LinkTunnel" to="/companyregistry">
                  <input type="submit" className='landing-button' value="i wanna know more" />
                </Link>
              </div>
              <div className="SectionImage" style={{backgroundImage:`url(${require('../../assets/solidarity.svg')})`,}}></div>
            </div>
          </div>
          <div className="MainSection">
            <div className="SectionImage" style={{backgroundImage:`url(${require('../../assets/programming.svg')})`, marginRight: '60px', backgroundPosition: 'center',}}></div>
            <div className="MainSectionText">
              <p className='landing-desc-txt'>How does it work?</p>
              <p className='landing-desc-alt-txt'>So you're a tech nerd! Zendama uses blockchain technology to safely handle all Zen transactions within your company; our tech stach in general is pretty cool, so feel free to check it out below.</p>
              <input type="submit" className='SectionDividerButton' value="i wanna know more" />
            </div>
          </div>
        </div>
        <div className="CorporateSection">
        </div>
      </div>
      // <div className="landing-wrapper">
      //   <div className="landing-title">
      //     <img alt="" src={require('../../assets/zendomologo.png')} style={{maxHeight:'80px'}}/>
      //     <p className='landing-desc-alt-txt spacer'>spacer</p>
      //     <h1 className="landing-title-text" style={{color:'#aaa',}}>zendama</h1>
      //   </div>
      //   <div className='landing-desc'>
      //     <p className='landing-desc-txt'>Help your colleagues, receive rewards, share the love!</p>
      //     <p className='landing-desc-alt-txt spacer'>spacer</p>
      //     <p className='landing-desc-alt-txt'>Zendama is a catalyst for harmony and friendship in the buisness place.</p>
      //     <p className='landing-desc-alt-txt'>Get rewards from your place of work for being a good employee and helping out.</p>
      //     <p className='landing-desc-alt-txt'>Reward those who help you with something that will really make a difference.</p>
      //     <p className='landing-desc-alt-txt spacer'>spacer</p>
      //     <p className='landing-desc-alt-txt' style={{paddingBottom:'3vh',}}>Sounds good right?</p>
      //     <input className="u-full-width" style={{width:'50%',}}
      //       type="email"
      //       value={this.state.email}
      //       placeholder="Email"
      //       onFocus={() => this.setState({noAccess: false, email: '',})}
      //       onChange={(e) => this.setState({email: e.target.value,})}
      //     />
      //     <input type="password" className="u-full-width" style={{width:'50%', marginBottom:'3vh',}}
      //       value={this.state.password}
      //       placeholder="Password"
      //       onFocus={() => this.setState({noAccess: false, password: '',})}
      //       onChange={(e) => this.setState({password: e.target.value,})}
      //     />
      //     <div className='landing-button'style={{transform:'scale(1.2)',}} onClick={this.loginRequest.bind(this, this.state)}>Login</div>
      //     <p className='landing-desc-alt-txt spacer'>spacer</p>
      //   </div>
      //   <div className='landing-business'>
      //     <h5 className='landing-desc-alt-txt'>Get Started</h5>
      //     <p className='landing-desc-alt-txt spacer'>spacer</p>
      //     <div style={{display:'flex',flexDirection:'row',}}>
      //       <div className='landing-button' onClick={this.corporateRedir}>Corporate</div>
      //       <div className='landing-button' onClick={this.personalRedir}>Personal</div>
      //     </div>
      //   </div>
      //   <div className='landing-bottom-bar'>
      //     <img alt="" src={require('../../assets/github-white.svg')} style={{maxHeight:'25px',}}/>
      //     <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
      //     <img alt="" src={require('../../assets/facebook-black-icon.png')} style={{maxHeight:'35px',}}/>
      //     <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
      //     <img alt="" src={require('../../assets/twitter.svg')} style={{maxHeight:'25px',}}/>
      //   </div>
      // </div>
    );
  }
}

export default Landing;
