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
                


                <p className='landing-desc-alt-txt spacer'>spacer</p>
            </div>
            <div className='landing-business'>
            <h5 className='landing-desc-alt-txt'>Get Started</h5>
                <p className='landing-desc-alt-txt spacer'>spacer</p>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className='landing-button' onClick={this.corporateRedir}>Corporate</div>
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

export default AboutPersonal;
