import React, { Component, } from 'react';

// import { Link, } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Close from '../../components/Close/Close';
import DropDown from '../../components/DropDown/DropDown';

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
      selected: '',
      max: false,
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

  handleUserSelection = (value) => {
    this.setState({selected: value,})
  }

  handleMaxZen = (event) => {
    if (event.target.value > this.state.available) this.setState({max: true,});
    else this.setState({max: false,});
  }

  handleResetZen = (event) => {
    if (event.target.value > this.state.available) event.target.value = this.state.available;
    this.setState({max: false,})
  }

  //======================= RENDERING

  render() {
    console.log(this.state.max);
    const highlight = this.state.max
      ? 'Highlight'
      : '';
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
                  <DropDown
                    func={this.handleUserSelection.bind(this)}
                    placeh="the person you want to give zen to"
                    arr={this.state.userList}
                  />
                  <h5>how much?</h5>
                  <input
                    className={highlight}
                    type="number"
                    max={this.state.available}
                    placeholder="the amount of zen you want to give"
                    onChange={this.handleMaxZen}
                    onBlur={this.handleResetZen}
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