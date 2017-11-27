import React, { Component, } from 'react';

import { Link, } from 'react-router-dom';

import PanelSquare from '../../components/PanelSquare/PanelSquare';
import NextSteps from '../../components/NextSteps/NextSteps';

import '../../App.css';
import './Panel.css';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      isAdmin: false,
    }
    fetch('https://private-3a61ed-zendama.apiary-mock.com/company')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.isAdmin) {
          if (!res.catalog.length) this.setState({pending: ['catalog',],});
          if (!res.usersId.length) this.setState({pending: [...this.state.pending, 'users',],});
          this.setState({isAdmin:res.isAdmin,});
        }
      })
      .catch(e => console.log(e));
  }

  handleLogout() {
    //this method will handle logout.
  }

  //======================= RENDERING

  renderNextSteps(arr) {
    const steps = arr.map((el,i) => {
      let res;
      if (el === 'users') {
        res = (
          <NextSteps
            key={i}
            text="add employees to Zendama"
            step={i+1}
            link="/settings"
          />
        )
      } else if (el === 'catalog') {
        res = (
          <NextSteps
            key={i}
            text="add rewards to your Zendama Catalog"
            step={i+1}
            link="/settings"
          />
        )
      }
      return res;
    });
    return (
      <div className="NextSteps">
        <p>Next Steps</p>
        {steps}
      </div>
    );
  }

  renderTipOrPay() {

  }

  renderLedger() {

  }

  render() {
    // const tip = this.state.isAdmin
    // ?
    // :
    // const ledger = this.state.isAdmin
    // ?
    // :
    const nextSteps = this.state.isAdmin && this.state.pending.length
      ? this.renderNextSteps(this.state.pending)
      : '';
    return (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="Header">
            {nextSteps}
            <div className="Logout">
              <Link style={{textDecoration:'none',}} to="/logout">
                <h6>logout</h6>
                {/* <img alt="logout" className="LogoutIco" src={require('../../assets/logout.svg')}/> */}
              </Link>
            </div>
          </div>
          <div className="PanelContainer">
            <PanelSquare
              isSummary={true}
              title="Remaining Zen"
              zen={this.state.isAdmin ? '∞' : '173'}
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
