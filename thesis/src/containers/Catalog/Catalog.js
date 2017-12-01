import React, { Component, } from 'react';

// import { Link, } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Close from '../../components/Close/Close';
// import DropDown from '../../components/DropDown/DropDown';

import ProductList from '../../components/ProductList/ProductList';
import ProductPopUp from '../../components/ProductPopUp/ProductPopUp';

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
      selectedProduct: {},
      popped: false,
    }
    // if (window.localStorage.getItem('token')) {
    fetch('https://private-3a61ed-zendama.apiary-mock.com/user')
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

  handlePopUp = (product) => {
    this.setState({
      selectedProduct: product,
      popped: !this.state.popped,
    })
  }

  //======================= RENDERING

  renderPopUp(product) {
    return (
      <ProductPopUp
        id={product.id}
        isService={product.isService}
        title={product.title}
        image={product.image}
        description={product.description}
        value={product.price}
        schedule={product.schedule}
        unpop={this.handlePopUp.bind(this)}
      />
    )
  }

  render() {
    const popped = this.state.popped
      ? this.renderPopUp(this.state.selectedProduct)
      : '';
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
              pop={this.handlePopUp.bind(this)}
              title="Products"
              arr={this.handleFilterProducts(this.state.catalog, false)}
            />
            <ProductList
              pop={this.handlePopUp.bind(this)}
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