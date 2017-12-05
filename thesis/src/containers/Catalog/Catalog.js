import React, { Component, } from 'react';

// import { Link, } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Close from '../../components/Close/Close';
// import DropDown from '../../components/DropDown/DropDown';

import ProductList from '../../components/ProductList/ProductList';
import ProductPopUp from '../../components/ProductPopUp/ProductPopUp';
import ProductAdd from '../../components/ProductAdd/ProductAdd';

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
      add: false,
      serviceAdd: null,
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
        // .then(r => console.log("user log in response ", r))
        .then(res => {
          if (res.isAdmin) {
            this.setState({isAdmin:res.isAdmin,});
          } else {
            console.log(res)
            this.setState({remaining: res.availableCurrency, received: res.receivedCurrency,});
          }
        })
        .catch(e => console.error(e));
      fetch('http://192.168.0.37:4200/catalog',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
        })
        .then(res => res.json())
        // .then(r => console.log("this is the response", r))
        .then(res => {
          this.setState({catalog: res.catalog, loaded: true,});
        })
        .catch(e => console.error(e));
    } else {
      window.location = '/login';
    }
  }

  handleFilterProducts(arr, bool) {
    return arr.filter(el => el.isService === bool)
  }

  handlePopUp = (product) => {
    console.log("handle product ", product)
    this.setState({
      selectedProduct: product,
      popped: !this.state.popped,
    })
  }

  handleProductAdd = (category) => {
    this.setState({
      serviceAdd: category,
      add: !this.state.add,
    })
  }

  //======================= RENDERING

  renderProductAdd() {
    return (
      <ProductAdd
        service={this.state.serviceAdd}
        unpop={this.handleProductAdd.bind(this)}
      />
    )
  }

  renderPopUp(product) {
    console.log("product", product)
    return (
      <ProductPopUp
        isAdmin={this.state.isAdmin}
        available={this.state.received}
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
    console.log(this.state)
    const popped = this.state.popped
      ? this.renderPopUp(this.state.selectedProduct)
      : null;
    const add = this.state.add
      ? this.renderProductAdd()
      : null;
    const availableZen = !this.state.isAdmin
      ? (<h4 className="AvailableZenCatalog">Available Zen: {this.state.received}ż</h4>)
      : null;
    return this.state.loaded ? (
      <div className="MaxWidth">
        <div className="CatalogPosition">
          {popped}
          {add}
          <div className="TipHeader">
            <h1>Catalog</h1>
            <Close link="/panel"/>
          </div>
          {availableZen}
          <div className="ProductCatalog">
            <ProductList
              isAdmin={this.state.isAdmin}
              pop={this.handlePopUp.bind(this)}
              add={this.handleProductAdd.bind(this)}
              title="Products"
              arr={this.handleFilterProducts(this.state.catalog, false)}
            />
            <ProductList
              isAdmin={this.state.isAdmin}
              pop={this.handlePopUp.bind(this)}
              add={this.handleProductAdd.bind(this)}
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
