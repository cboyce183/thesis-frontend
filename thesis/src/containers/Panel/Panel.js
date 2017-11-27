import React, { Component, } from 'react';

import { Link, } from 'react-router-dom';

import PanelSquare from '../../components/PanelSquare/PanelSquare';
import NextSteps from '../../components/NextSteps/NextSteps';

import '../../App.css';
import './Panel.css';

class Panel extends Component {
  constructor(props) {
    super(props);
    //this will contain the fetch which will contain the flag for next steps if missing info and will specify isAdmin.
  }

  handleLogout() {
    //this method will handle logout.
  }

  //======================= RENDERING

  renderNextSteps(arr) {
    return arr.map((el,i) => {
      if (el === 'users') {
        return (
          <NextSteps
            text="add employees to Zendama"
            step={i+1}
            link="/settings"
          />
        )
      } if (el === 'catalog') {
        return (
          <NextSteps
            text="add rewards to your Zendama Catalog"
            step={i+1}
            link="/settings"
          />
        )
      }
    })
  }

  render() {
    const nextSteps = this.renderNextSteps(['catalog','users',])
    return (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="Header">
            <div className="NextSteps">
              <p>Next Steps</p>
              {nextSteps}
            </div>
            <div className="Logout">
              <Link to="/logout">
                <img alt="logout" className="LogoutIco" src={require('../../assets/logout.svg')}/>
              </Link>
            </div>
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
