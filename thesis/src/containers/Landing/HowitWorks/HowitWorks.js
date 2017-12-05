import React, { Component, } from 'react';
//import './Landing.css';
import './HowitWorks.css';
import { Link, } from 'react-router-dom';
// import { Route, } from 'react-router-dom';


class HowitWorks extends Component {
  loginRedir = () => window.location = '/login';
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
        <div className='landing-desc overlay'>
          <div className='landing-desc-how'>
            <h3 className='corp-hover'>So how does it work?</h3>
            <ul className='corp-toggle'>
              <li> You as employer decide on a weekly allowance of Zen to give to your team. They in turn can reward each other with Zen for good deeds.</li>
              <li> You also provide one or more things that your team can buy with Zen: but heres the catch - they can only spend Zen they have received from others. Zen is designed to have no monetary value outside of the business, which helps ensure fair play and proper use of the Zendama system.</li>
              <li> How much Zen you choose to allocate each week, and how much rewards cost is completely down to you, so we provide you with a bespoke admin tool for managing your account.</li>
              <li> It's really that simple - a happier workplace with less micromanagement, almost overnight.</li>
            </ul>
            <Link to="/">
              <input type="submit" className='SectionDividerButton' value="Back" />
            </Link>
          </div>
        </div>
        <div className='landing-business' style={{padding:0,}}>
          <div style={{display:'flex',flexDirection:'row',}}>
            <div className='landing-button' onClick={this.corporateRedir}>Corporate</div>
          </div>
        </div>
        <div className='landing-bottom-bar'>
          <img alt="" src={require('../../../assets/github-white.svg')} style={{maxHeight:'25px',}}/>
          <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
          <img alt="" src={require('../../../assets/facebook-black-icon.png')} style={{maxHeight:'35px',}}/>
          <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
          <img alt="" src={require('../../../assets/twitter.svg')} className="twitter-icon"style={{maxHeight:'25px',}}/>
        </div>
      </div>
    );
  }
}

export default HowitWorks;
