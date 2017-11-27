import React, { Component, } from 'react';

import { Link, } from 'react-router-dom';

import PanelSquare from '../../components/PanelSquare/PanelSquare';

import '../../App.css';
import './Panel.css';

class Panel extends Component {

  handleLogout() {
    //this method will handle logout.
  }

  //======================= RENDERING

  render() {
    return (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="Logout">
            <Link to="/logout">
              <img alt="logout" className="LogoutIco" src={require('../../assets/logout.svg')}/>
            </Link>
          </div>
          <div className="PanelContainer">
            <PanelSquare
              isSummary={true}
              title="Remaining Zen"
              zen="173"
              link="/tiporpay"
            />
            <PanelSquare
              isSummary={true}
              title="Available Zen"
              zen="1346"
              link="/ledger"
            />
            <PanelSquare
              alter="cart"
              image={require('../../assets/cart.svg')}
              link="/catalog"
            />
            <PanelSquare
              alter="settings"
              image={require('../../assets/settings.svg')}
              link="/settings"
            />
          </div>
          <h6>powered by Zendama</h6>
        </div>
      </div>
    );
  }
}

export default Panel;
