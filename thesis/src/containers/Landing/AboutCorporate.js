import React, { Component, } from 'react';
import './Landing.css';
import { Route, } from 'react-router-dom';
import Collapsible from 'react-collapsible';


class AboutCorporate extends Component {
  loginRedir = () => window.location = '/login';
  corporateRedir = () => window.location = '/about_corporate';
  personalRedir = () => window.location = '/about_personal';  

  render() {
    return (
        <div className="landing-wrapper">
            <div className="landing-title">
                <img src={require('../../assets/zendomologo.png')} style={{maxHeight:'80px'}}/>
                <p className='landing-desc-alt-txt spacer'>spacer</p>
                <h1 className="landing-title-text" style={{color:'#aaa'}}>zendama</h1>
            </div>
            <div className='landing-desc-corp'>
                <div className='corp-container'>
                    <h3 className='corp-hover'>We will help your business thrive.</h3>
                    <ul className='corp-toggle'>
                    <li> Zendama shifts the responsiblity of rewarding good work off of management, and onto the community at large.</li>
                    <li> In doing this, people get a sense of responsiblity: they are now responsible for, and share in each others daily successes.</li>
                    <li> This in turn encourages good relationships with one another, incentivises proper workplace practices, and in doing so improves productivity.</li>
                    <li> Everyone feels like they matter.</li>
                    </ul>
                </div>
                <div className='corp-container'>
                    <h3 className='corp-hover'>So how does it work?</h3>
                    <ul className='corp-toggle'>
                    <li> You as employer decide on a weekly allowance of Zen to give to your team. They in turn can reward each other with Zen for good deeds.</li>
                    <li> You also provide one or more things that your team can buy with Zen: but heres the catch - they can only spend Zen they have received from others. Zen is designed to have no monetary value outside of the business, which helps ensure fair play and proper use of the Zendama system.</li>
                    <li> How much Zen you choose to allocate each week, and how much rewards cost is completely down to you, so we provide you with a bespoke admin tool for managing your account.</li>
                    <li> It's really that simple - a happier workplace with less micromanagement, almost overnight.</li>
                    </ul>
                </div>
                <div className='corp-container'>
                    <h3 className='corp-hover'>We take security seriously.</h3>
                    <ul className='corp-toggle'>
                    <li> Zendama doesn't handle any real money transactions our end, nor do we store any financial details, so the chance of theft is precisely zero.</li>
                    <li> Our financial systems are built upon Zendomo - our own blockchain system built upon the amazing Hyperledger Fabric framework. This bleeding edge technology provides the security and transparency of currencies like Bitcoin, with an immutable ledger where all transactions are recorded. You can see a complete unalterable history of transactions in seconds. There is simply no cheating it.</li>
                    <img src={require('../../assets/zendamalogo.png')}style={{maxHeight:'50px', marginLeft:'40%', padding:'10px'}}/>
                    <li> We collect only the bare minimum of user information to make the system work, and all information stored is protected by the industry standard protocols that are used by the biggest tech giants.</li>
                    <li> We don't give user information away to anyone - not for marketing reasons, not for research, nor for anything.</li>
                    </ul>
                </div>
            </div>
            <div className='landing-business' style={{height:'100px', padding:'10px'}}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className='landing-button' onClick={this.loginRedir}>Sign-up</div>
                    <div className='landing-button' onClick={this.personalRedir}>Personal</div>
                </div>
            </div>
            <div className='landing-bottom-bar'>
                <img src={require('../../assets/github-white.svg')} style={{maxHeight:'25px'}}/>
                <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
                <img src={require('../../assets/facebook-black-icon.png')} style={{maxHeight:'35px'}}/>
                <p className='landing-desc-alt-txt smallspacer'>spaaaaa</p>
                <img src={require('../../assets/twitter.svg')} style={{maxHeight:'25px'}}/>
            </div>
        </div>
    );
  }
}

export default AboutCorporate;
