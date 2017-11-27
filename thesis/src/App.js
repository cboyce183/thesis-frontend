import React, { Component, } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Landing } from './containers/Landing/landing';
import CompanyRegistry1 from './containers/CompanyRegistry1/companyregistry1';
import { CompanyRegistry2 } from './containers/CompanyRegistry2/companyregistry2';
import { Login } from './containers/Login/login';
import { TiporPay } from './containers/TiporPay/tiporpay';
import { Ledger } from './containers/Ledger/ledger';
import { Catalog } from './containers/Catalog/catalog';
import { Settings } from './containers/Settings/settings';
import { Logout } from './containers/Logout/logout';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Route path="/landing" component={Landing}/>
      <Route path="/companyregistry1" component={CompanyRegistry1}/>
      <Route path="/companyregistry2" component={CompanyRegistry2}/>
      <Route path="/login" component={Login}/>
      <Route path="/tiporpay" component={TiporPay}/>
      <Route path="/ledger" component={Ledger}/>
      <Route path="/catalog" component={Catalog}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/logout" component={Logout}/>
      </div>
    );
  }
}

export default App;
