import React, { Component } from 'react';
import '../../App.css';
import './companyregistry1.css';
import { Link } from 'react-router-dom';


class CompanyRegistry1 extends Component {

  render() {
    return (
      <div className="MaxWidth">
        <div className='company-reg-container'>
          <div className='company-siginup-info'>
            <input className="u-full-width" type="Email" placeholder="Company-Email@mailbox.com" id="exampleEmailInput" />
            <input className="u-full-width" type="Email" placeholder="Company Username" id="exampleEmailInput" />
            <input className="u-full-width" type="password" placeholder="Password" />
          </div>
          <div className='company-logo'>
            <div className="img-input">
              <p>Add Your Company Logo</p>
              <input type="file" name="pic" accept="image/*" />
            </div>
            <Link to={{pathname: '/companyregistry2'}}>
              <div>
                <input class="button-primary nxt-btn" type="submit" value="Next" />
              </div>
            </Link>
          </div>
        </div>
          <p className="powered-by">Powered by Zendama</p>
      </div>
    );
  }
}

export default CompanyRegistry1;
