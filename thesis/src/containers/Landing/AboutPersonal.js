import React, { Component, } from 'react';
import './Landing.css';
import { Route, } from 'react-router-dom';


class AboutPersonal extends Component {
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
            <div className='landing-desc'>
                <div className='landing-desc-personal'>
                <p>
                    Zendama is easy! You receive an allocation of Zen to give to your colleagues every week. This is intended to be distributed by you as a reward for being awesome
                    and helping you or others out. You can give it for any deserving reason - maybe Alice helped you with a difficult client,
                    or Mo tidied up the breakroom when it was a complete mess. Zen is a gesture of good will for doing good deeds.
                </p>
                <p className='landing-desc-alt-txt spacer'>spacer</p>
                <p>
                    The Zen you in turn receive can be spent on perks provided by your place of work, such as food, drinks, event tickets,
                    or even gift vouchers for a luxury spa (although you'll have to negotiate this with your boss!). Accumulate good karma from being
                    a good employee, and get the rewards you deserve with your Zen. Everyones a winner!
                </p>
                <p className='landing-desc-alt-txt spacer'>spacer</p>
                <p>
                    To sign up, your company will need to have an account (from which they can invite you to create your own account). See the corporate page to get started using Zendama in your place of work.
                </p>
                </div>
            </div>
            <div className='landing-business' style={{padding:0}}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className='landing-button' onClick={this.corporateRedir}>Corporate</div>
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

export default AboutPersonal;
