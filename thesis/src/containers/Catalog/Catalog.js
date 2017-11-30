import React, { Component, } from 'react';

// import { Link, } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Close from '../../components/Close/Close';
// import DropDown from '../../components/DropDown/DropDown';

import ProductList from '../../components/ProductList/ProductList';
import PopUp from '../../components/PopUp/PopUp';

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
      catalog: [],
      popped: false,
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
    fetch('https://private-3a61ed-zendama.apiary-mock.com/catalog')
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({catalog: res.catalog, loaded: true,});
      })
      .catch(e => console.error(e));
    // } else {
    //   window.location = '/login';
    // }
  }

  handleFilterProducts(arr, bool) {
    return arr.filter(el => el.isService === bool)
  }

  handleProductBuy = () => {
    this.setState({popped: !this.state.popped,})
  }

  //======================= RENDERING

  renderPopUp() {
    return (
      <PopUp
        unpop={this.handleProductBuy.bind(this)}
      />
    )
  }

  render() {
    const popped = this.state.popped
      ? this.renderPopUp()
      : '';
    console.log(this.state);
    return this.state.loaded ? (
      <div className="MaxWidth">
        <div className="CatalogPosition">
          {popped}
          <div className="TipHeader">
            <h1>Catalog</h1>
            <Close link="/panel"/>
          </div>
          <div className="ProductCatalog">
            <ProductList
              pop={this.handleProductBuy.bind(this)}
              title="Products"
              arr={this.handleFilterProducts(this.state.catalog, false)}
            />
            <ProductList
              pop={this.handleProductBuy.bind(this)}
              title="Services"
              arr={this.handleFilterProducts(this.state.catalog, true)}
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
        </div>
      </div>
    );
  }
}

export default Catalog;