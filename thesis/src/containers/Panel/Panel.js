import React, { Component, } from 'react';

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
    // console.log((window.localStorage.getItem('token')))
    if (window.localStorage.getItem('token')) {
      fetch('http://192.168.0.37:4200/company',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
        })
        .then(res => res.json())
        .then(res => {
          if (res.isAdmin) {
            if (!res.catalogN) this.setState({pending: ['catalog',],});
            if (!res.usersIdN) this.setState({pending: [...this.state.pending, 'users',],});
            this.setState({isAdmin:res.isAdmin,});
            this.setState({totalGiven:res.totalGiven,});
          } else {
            this.setState({available: res.availableCurrency, received: res.receivedCurrency,});
          }
          this.setState({loaded: true,});
        })
        .catch(e => console.error(e));
    } else {
      window.location = '/login';
    }
  }

  handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location = '/';
  }

  //======================= RENDERING

  renderNextSteps = () => {
    const steps = this.state.pending.map((el,i) => {
      let res;
      if (el === 'users') {
        res = (
          <NextSteps
            key={i}
            text="Add Employees"
            step={i+1}
            link="/settings"
          />
        )
      } else if (el === 'catalog') {
        res = (
          <NextSteps
            key={i}
            text="Add Rewards"
            step={i+1}
            link="/catalog"
          />
        )
      }
      return res;
    });
    return (
      <div className="NextSteps">
        <img alt="left arrow" src={require('../../assets/right-arrow.svg')} className="arrow-left"/>
        {steps}
      </div>
    );
  }

  render() {
    const nextSteps = this.state.isAdmin && this.state.pending.length
      ? this.renderNextSteps()
      : '';
    return this.state.loaded ? (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="Header">
            {nextSteps}
            <div className="Logout">
              <h6 onClick={this.handleLogout} style={{marginRight:'5vw', marginLeft:'5vw'}} className="Logout">logout</h6>
            </div>
          </div>
          <div className="PanelContainer">
            <PanelSquare
              isSummary={true}
              title={this.state.isAdmin ? 'Pay User' : 'Remaining Zen'}
              zen={this.state.isAdmin ? require('../../assets/infinity.svg') : this.state.available}
              link="/tiporpay"
            />
            <PanelSquare
              isSummary={true}
              title={this.state.isAdmin ? 'Admin Dashboard' : 'Available Zen'}
              zen={this.state.isAdmin ? this.state.totalGiven : this.state.received}
              link={this.state.isAdmin ? '/ledger' : '/user-wallet'}
            />
            <PanelSquare
              alter="cart"
              image={require('../../assets/cart.svg')}
              link="/catalog"
              imgScale={0.75}
            />
            <PanelSquare
              alter="settings"
              image={require('../../assets/settings.svg')}
              link="/settings"
            />
          </div>
          {/* <h6>powered by Zendama</h6> */}
        </div>
      </div>
    ) : (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="Header">
          </div>
          <Loader/>
          {/* <h6>powered by Zendama</h6> */}
        </div>
      </div>
    );
  }
}

export default Panel;
