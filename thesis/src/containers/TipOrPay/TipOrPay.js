import React, { Component, } from 'react';

// import { Link, } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Close from '../../components/Close/Close';

import '../../App.css';
import './TipOrPay.css';

class TipOrPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      isAdmin: false,
      loaded: false,
      remaning: 0,
      received: 0,
      userList: [],
    }
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
      })
      .catch(e => console.error(e));
    fetch('https://private-3a61ed-zendama.apiary-mock.com/tips')
      .then(res => res.json())
      .then(res => {
        this.setState({loaded: true, userList:res.users,});
      })
      .catch(e => console.error(e));
    // } else {
    //   window.location = '/login';
    // }
  }

  //======================= RENDERING

  renderUserDropdown(arr) {
    const options = arr.map((el,i) => {
      return (
        <option key={i} value={el.id}>{el.username}</option>
      )
    });
    return (
      <select className="u-full-width">
        <option value="Option 1">the person you want to give zen to</option>
        {options}
      </select>
    )
  }

  render() {
    const userSelect = this.renderUserDropdown(this.state.userList);
    return this.state.loaded ? (
      <div className="MaxWidth">
        <div className="Centering">
          <div className="Shadow">
            <div className="SubWidth">
              <div className="TipHeader">
                <h1>Tip</h1>
                <Close link="/panel"/>
              </div>
              <div className="TipForm">
                <div className="TipInput">
                  <h5>who?</h5>
                  {userSelect}
                  <h5>how much?</h5>
                  <input
                    type="number"
                    placeholder="the amount of zen you want to give"
                  />
                  <h5>why?</h5>
                  <input
                    type="text"
                    placeholder="the person you're tiping will see this so be nice :-)"
                  />
                  <input
                    type="submit"
                    value="tip"
                  />
                </div>
                <div className="TipRemaining">
                  <h5>available giving zen</h5>
                  <h1>{this.state.available}</h1>
                </div>
              </div>
              <h6>powered by Zendama</h6>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="Header">
          </div>
          <Loader/>
        </div>
      </div>
    );
  }
}

export default TipOrPay;