import React, { Component, } from 'react';
//import './Landing.css';
import './AboutPersonal.css';
import { Link, } from 'react-router-dom';
// import { Route, } from 'react-router-dom';


class AboutPersonal extends Component {
  loginRedir = () => window.location = '/login';
  corporateRedir = () => window.location = '/about_corporate';
  personalRedir = () => window.location = '/about_personal';

  render() {
    return (
      <div className="landing-wrapper">
        <div className='about-personal-banner'>
          <h1 className='personal-label'>Share the love</h1>
        </div>
        <div className='landing-desc-per'>
          <div className="words-aboutper">
            <div className='icon-personal'></div>
            <div className='section1-personal-words'>
              <p>
                Zendama is easy! You receive an allocation of Zen to give to your colleagues every week. This is intended to be distributed by you as a reward for being awesome
                and helping you or others out. You can give it for any deserving reason - maybe Alice helped you with a difficult client,
                or Mo tidied up the breakroom when it was a complete mess. Zen is a gesture of good will for doing good deeds.
              </p>
              <p className='landing-desc-alt-txt spacer'>spacer</p>
              <p>
                "The Zen you in turn receive can be spent on perks provided by your place of work, such as food, drinks, event tickets,
                or even gift vouchers for a luxury spa (although you'll have to negotiate this with your boss!). Accumulate good karma from being
                a good employee, and get the rewards you deserve with your Zen. Everyones a winner!"
              </p>
            </div>
          </div>
          <div className='section2-personal'>
            <div className='sec2-words'>
              <p className='sign-up-works'>
                'To sign up, your company will need to have an account (from which they can invite you to create your own account). See the corporate page to get started using Zendama in your place of work.'
              </p>
              <div className='landing-button-works' onClick={this.corporateRedir}>Corporate</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPersonal;
