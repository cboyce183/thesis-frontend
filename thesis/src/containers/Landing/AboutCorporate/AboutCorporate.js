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
        <div className="about-corp-banner">
          <h1 className='corp-banner-label'>What can Zendama do for your company?</h1>
        </div>
        <div className='landing-desc-corporate'>
          <div className='section1'>
            <p>We will help your business thrive.</p>
            <ul>
              <li> Zendama shifts the responsiblity of rewarding good work off of management, and onto the community at large.</li>
              <li> In doing this, people get a sense of responsiblity: they are now responsible for, and share in each others daily successes.</li>
              <li> This in turn encourages good relationships with one another, incentivises proper workplace practices, and in doing so improves productivity.</li>
              <li> Everyone feels like they matter.</li>
            </ul>
          </div>
          <div className='section2'>

          <div className='words-sections2'>
            <p>We take security seriously.</p>
            <ul>
              <li> Zendama doesn't handle any real money transactions our end, nor do we store any financial details, so the chance of theft is precisely zero.</li>
              <li> Our financial systems are built upon Zendomo - our own blockchain system built upon the amazing Hyperledger Fabric framework. This bleeding edge technology provides the security and transparency of currencies like Bitcoin, with an immutable ledger where all transactions are recorded. You can see a complete unalterable history of transactions in seconds. There is simply no cheating it.</li>
              <li> We collect only the bare minimum of user information to make the system work, and all information stored is protected by the industry standard protocols that are used by the biggest tech giants.</li>
              <li> We don't give user information away to anyone - not for marketing reasons, not for research, nor for anything.</li>
            </ul>
            <div className='landing-button' onClick={this.loginRedir}>Sign-up</div>
            <Link to='/'>
              <div className='landing-button'>Back</div>
            </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default AboutCorporate;
