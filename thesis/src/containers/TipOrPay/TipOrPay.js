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
      isAdmin: false,
      loaded: false,
      remaning: 0,
      received: 0,
      userList: [],
      selected: '',
      max: false,
      attempted: false,
      success: true,
    }
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
        // .then(r => console.log(r))
        .then(res => {
          if (res.isAdmin) {
            this.setState({isAdmin:res.isAdmin,});
          } else {

            this.setState({available: res.availableCurrency, received: res.receivedCurrency,});
          }
        })
        .catch(e => console.error(e));
      fetch('http://192.168.0.37:4200/tip',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
        })
        .then(res => res.json())
        .then(res => {
          console.log("res", res)
          this.setState({loaded: true, userList:res.users,});
        })
        .catch(e => console.error(e));
    } else {
      window.location = '/login';
    }
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
    else if (event.target.value < 0) event.target.value = 0;
    this.setState({max: false,})
  }

  handleTip = (quantity, motive) => {
    console.log(quantity, motive, this.state.selected)
    fetch('http://192.168.0.37:4200/tip', {
      method: 'PUT',
      body: JSON.stringify({
        id: this.state.selected,
        amount: quantity,
        reason: motive,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},})
      .then(res => {
        if (res.status === 200) this.setState({success: true, attempted: true,})
        else this.setState({success: false, attempted: true,})
      });
  }

  //======================= RENDERING

  renderButtonMessage = () => {
    if (this.state.attempted) {
      setTimeout(() => {
        this.setState({attempted: false,})
      }, 2000);
      if (this.state.success) {
        return 'SUCCESS!';
      } else {
        return 'SOMETHING WENT WRONG';
      }
    } else {
      return 'Submit';
    }
  }

  renderButtonClass(text) {
    if (text !== 'Submit') {
      if (text === 'SUCCESS!') {
        return 'Success';
      } else {
        return 'Failure';
      }
    } else {
      return 'Standard';
    }
  }

  renderRemainder(state) {
    if (state.isAdmin) {
      return (
        <div className="TipRemaining">
          <h5>available giving zen</h5>
          <img
            className="TipInfinite"
            alt="infinity"
            src={require('../../assets/infinity.svg')}
          />
        </div>
      )
    } else {
      return (
        <div className="TipRemaining">
          <h5>available giving zen</h5>
          <h1>{state.available}</h1>
        </div>
      )
    }
  }

  render() {
    console.log("trhe state", this.state)
    const message = this.renderButtonMessage();
    const buttonClass = this.renderButtonClass(message);
    const remaining = this.renderRemainder(this.state);
    const highlight = this.state.max
      ? 'Highlight'
      : '';
    return this.state.loaded ? (
      <div className="MaxWidth">
        <div className="Centering">
          <div className="Shadow">
            <div className="SubWidth">
              <div className="TipHeader">
                <h2>Tip</h2>
                <Close link="/panel"/>
              </div>
              <div className="TipForm">
                <div className="TipInput">
                  <DropDown
                    func={this.handleUserSelection.bind(this)}
                    placeh="The person you want to give to *"
                    arr={this.state.userList}
                  />
                  <input
                    ref={el => this.quantity = el}
                    className={highlight}
                    type="number"
                    max={this.state.available}
                    placeholder="The amount you want to give *"
                    onChange={this.handleMaxZen}
                    onBlur={this.handleResetZen}
                  />
                  <input
                    ref={el => this.reason = el}
                    type="text"
                    placeholder="Message *"
                  />
                  <input
                    className="extra-css ${buttonClass}"
                    type="submit"
                    value={message}
                    onClick={() => this.handleTip(this.quantity.value, this.reason.value)}
                  />
                </div>
                {remaining}
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
          <h6>powered by Zendama</h6>
        </div>
      </div>
    );
  }
}

export default TipOrPay;
