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
        <div className='how-works-banner'>
        <h1 className='how-label'>So how does it work?</h1>
        </div>
        <div className='how-container'>

          <div className='landing-desc-how'>
          <p className='works-section1-label'> You as employer decide on a weekly allowance of Zen to give to your team.</p>
            <ul className='corp-toggle-works'>
              <li>They in turn can reward each other with Zen for good deeds.</li>
              <li> You also provide one or more things that your team can buy with Zen: but heres the catch - they can only spend Zen they have received from others. Zen is designed to have no monetary value outside of the business, which helps ensure fair play and proper use of the Zendama system.</li>
            </ul>



            <div className='section2-works'>
            <div className='section2-words'>
            <p className='para-1'> How much Zen you choose to allocate each week, and how much rewards cost is completely down to you, so we provide you with a bespoke admin tool for managing your account.</p>
            <p> It's really that simple - a happier workplace with less micromanagement, almost overnight.</p>
            <input type="submit" className='SectionDividerButton' value="Back" />
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HowitWorks;
