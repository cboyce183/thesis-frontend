import React, { Component, } from 'react';
import './AboutCorporate.css';
// import { Route, } from 'react-router-dom';
import { Link, } from 'react-router-dom';

class AboutCorporate extends Component {
  loginRedir = () => window.location = '/companyregistry';
  corporateRedir = () => window.location = '/about_corporate';
  personalRedir = () => window.location = '/about_personal';

  render() {
    return (
      <div className="landing-wrapper">
        <div className="landing-title">
          <img alt="" src={require('../../../assets/zendomologo.png')} style={{maxHeight:'80px',}}/>
          <p className='landing-desc-alt-txt spacer'>spacer</p>
          <h1 className="landing-title-text" style={{color:'#aaa',}}>zendama</h1>
        </div>
        <div className='landing-desc-corp'>
          <div className='corp-container'>
            <div className="corp-p-l">
              <h3 className='corp-hover'>We will help your business thrive.</h3>
              <ul className='corp-toggle'>
                <li> Zendama shifts the responsiblity of rewarding good work off of management, and onto the community at large.</li>
                <li> In doing this, people get a sense of responsiblity: they are now responsible for, and share in each others daily successes.</li>
                <li> This in turn encourages good relationships with one another, incentivises proper workplace practices, and in doing so improves productivity.</li>
                <li> Everyone feels like they matter.</li>
              </ul>
            </div>
          </div>
          <div className='corp-container'>
            <div className="corp-p-2">
              <span><h3 className='corp-hover-2'>We take security seriously.</h3></span>
              <ul className='corp-toggle'>
                <li> Zendama doesn't handle any real money transactions our end, nor do we store any financial details, so the chance of theft is precisely zero.</li>
                <li> Our financial systems are built upon Zendomo - our own blockchain system built upon the amazing Hyperledger Fabric framework. This bleeding edge technology provides the security and transparency of currencies like Bitcoin, with an immutable ledger where all transactions are recorded. You can see a complete unalterable history of transactions in seconds. There is simply no cheating it.</li>
                <img alt="" src={require('../../../assets/zendamalogo.png')}style={{maxHeight:'50px', marginLeft:'40%', padding:'10px',}}/>
                <li> We collect only the bare minimum of user information to make the system work, and all information stored is protected by the industry standard protocols that are used by the biggest tech giants.</li>
                <li> We don't give user information away to anyone - not for marketing reasons, not for research, nor for anything.</li>
              </ul>
              <Link to="/">
                <input type="submit" className='SectionDividerButton-b' value="Back" />
              </Link>
            </div>
          </div>
        </div>
        <div className='landing-business' style={{height:'100px', padding:'10px',}}>
          <div style={{display:'flex',flexDirection:'row',}}>
            <div className='landing-button' onClick={this.loginRedir}>Sign-up</div>
            <div className='landing-button' onClick={this.personalRedir}>Personal</div>
          </div>
        </div>
        <div className='landing-bottom-bar'>
          <img alt="" src={require('../../../assets/github-white.svg')} style={{maxHeight:'25px',}}/>
          <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
          <img alt="" src={require('../../../assets/facebook-black-icon.png')} style={{maxHeight:'35px',}}/>
          <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
          <img alt="" src={require('../../../assets/twitter.svg')} style={{maxHeight:'25px',}}/>
        </div>
      </div>
    );
  }
}

export default AboutCorporate;
