import React, { Component, } from 'react';
import './App.css';
import { Route, } from 'react-router-dom';
import Landing from './containers/Landing/Landing';
import Panel from './containers/Panel/Panel';
import CompanyRegistry from './containers/CompanyRegistry1/CompanyRegistry1';
import CompanyRegistry2 from './containers/CompanyRegistry2/CompanyRegistry2';
import Login from './containers/Login/Login';
import TipOrPay from './containers/TipOrPay/TipOrPay';
import Ledger from './containers/Ledger/Ledger';
import Catalog from './containers/Catalog/Catalog';
import Settings from './containers/Settings/Settings';
import Logout from './containers/Logout/Logout';
import UserSignup from './containers/UserSignup/UserSignup';
import Cropping from './containers/Cropping/Cropping';
import UserWallet from './containers/UserWallet/UserWallet';
import AboutCorporate from './containers/Landing/AboutCorporate.js';
import AboutPersonal from './containers/Landing/AboutPersonal.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing}/>
        <Route path="/panel" component={Panel}/>
        <Route path="/companyregistry" component={CompanyRegistry}/>
        <Route path="/companyregistry2" component={CompanyRegistry2}/>
        <Route path="/login" component={Login}/>
        <Route path="/tiporpay" component={TipOrPay}/>
        <Route path="/ledger" component={Ledger}/>
        <Route path="/catalog" component={Catalog}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/usersignup" component={UserSignup}/>
        <Route path="/cropping" component={Cropping}/>
        <Route path="/user-wallet" component={UserWallet}/>
        <Route path="/about_corporate" component={AboutCorporate}/>
        <Route path="/about_personal" component={AboutPersonal}/>
      </div>
    );
  }
}

export default App;
