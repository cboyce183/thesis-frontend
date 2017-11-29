import React, { Component, } from 'react';

// import { Link, } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
// import Close from '../../components/Close/Close';
// import DropDown from '../../components/DropDown/DropDown';

import '../../App.css';
import './Catalog.css';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      loaded: false,
      remaning: 0,
      received: 0,
    }
    // if (window.localStorage.getItem('token')) {
    fetch('https://private-3a61ed-zendama.apiary-mock.com/company')
      .then(res => res.json())
      .then(res => {
        if (res.isAdmin) {
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

  render() {
    return this.state.loaded ? (
      <div className="MaxWidth">
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

export default Catalog;