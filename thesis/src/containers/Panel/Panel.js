import React, { Component, } from 'react';

import { Link, } from 'react-router-dom';

import PanelSquare from '../../components/PanelSquare/PanelSquare';
import NextSteps from '../../components/NextSteps/NextSteps';
import Loader from '../../components/Loader/Loader';

import '../../App.css';
import './Panel.css';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      isAdmin: false,
      loaded: false,
      remaning: 0,
      received: 0,
    }
    //following fetch only has to activate if the localstorage contains the token, uncomment for functionality.
    // if (window.localStorage.getItem('token')) {
    fetch('https://private-3a61ed-zendama.apiary-mock.com/user')
      .then(res => res.json())
      .then(res => {
        if (res.isAdmin) {
          if (!res.catalog.length) this.setState({pending: ['catalog',],});
          if (!res.usersId.length) this.setState({pending: [...this.state.pending, 'users',],});
          this.setState({isAdmin:res.isAdmin,});
        } else {
          this.setState({available: res.availableCurrency, received: res.receivedCurrency,});
        }
        this.setState({loaded: true,});
      })
      .catch(e => console.error(e));
    // } else {
    //   window.location = '/login';
    // }
  }

  handleLogout() {
    window.localStorage.removeItem('token');
    window.location = '/logout'
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
            link="/catalog"
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

  render() {
    const nextSteps = this.state.isAdmin && this.state.pending.length
      ? this.renderNextSteps(this.state.pending)
      : '';
    return this.state.loaded ? (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="Header">
            {nextSteps}
            <div className="Logout">
              <h6 onClick={this.handleLogout}>logout</h6>
            </div>
          </div>
          <div className="PanelContainer">
            <PanelSquare
              isSummary={true}
              title="Remaining Zen"
              zen={this.state.isAdmin ? '∞' : this.state.available}
              link="/tiporpay"
            />
            <PanelSquare
              isSummary={true}
              title={this.state.isAdmin ? 'Given Zen' : 'Available Zen'}
              zen={this.state.isAdmin ? '64219' : this.state.received}
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
    ) : (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="Header">
          </div>
          <Loader/>
          <h6>powered by Zendama</h6>
        </div>
      </div>
    );
  }
}

export default Panel;
