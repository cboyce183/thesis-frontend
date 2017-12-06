import React, { Component, } from 'react';
import { Route, } from 'react-router-dom';

import './App.css';

import Landing from './containers/Landing/Landing';
import Panel from './containers/Panel/Panel';
import CompanyRegistry from './containers/CompanyRegistry/CompanyRegistry';
import TipOrPay from './containers/TipOrPay/TipOrPay';
import Ledger from './containers/Ledger/Ledger';
import Catalog from './containers/Catalog/Catalog';
import Settings from './containers/Settings/Settings';
import UserSignup from './containers/UserSignup/UserSignup';
import UserWallet from './containers/UserWallet/UserWallet';
import AboutCorporate from './containers/Landing/AboutCorporate/AboutCorporate.js';
import AboutPersonal from './containers/Landing/AboutPersonal/AboutPersonal.js';
import HowitWorks from './containers/Landing/HowitWorks/HowitWorks.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing}/>
        <Route path="/panel" component={Panel}/>
        <Route path="/companyregistry" component={CompanyRegistry}/>
        <Route path="/tiporpay" component={TipOrPay}/>
        <Route path="/ledger" component={Ledger}/>
        <Route path="/catalog" component={Catalog}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/usersignup" component={UserSignup}/>
        <Route path="/user-wallet" component={UserWallet}/>
        <Route path="/about_corporate" component={AboutCorporate}/>
        <Route path="/about_personal" component={AboutPersonal}/>
        <Route path="/howitworks" component={HowitWorks}/>
      </div>
    );
  }
}

export default App;
