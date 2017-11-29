import React, { Component, } from 'react';

// import { Link, } from 'react-router-dom';

import Loader from '../../components/Loader/Loader';
import Close from '../../components/Close/Close';
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
      catalog: [],
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

  //======================= RENDERING

  render() {
    console.log(this.state);
    return this.state.loaded ? (
      <div className="MaxWidth">
        <div className="SubWidth">
          <div className="TipHeader">
            <h1>Catalog</h1>
            <Close link="/panel"/>
          </div>
          <div className="ProductCatalog">
            <div className="ProductCategory">
              <h5>Products</h5>
              <div className="ProductList">
                <div className="ProductItem">
                  <div className="ProductDescription">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla.</p>
                    <h6>Price: 200</h6>
                  </div>
                  <div className="ProductItemImgWrapper">
                    <img
                      className="ProductItemImg"
                      alt="product"
                      src="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
                    />
                  </div>
                  <h6>Smiley Face</h6>
                  <input
                    className="BuyButton"
                    type="submit"
                    value="buy"
                  />
                </div>
                <div className="ProductItem">
                </div>
                <div className="ProductItem">
                </div>
                <div className="ProductItem">
                </div>
                <div className="ProductItem">
                </div>
              </div>
              <div className="ArrowContainer">
                <img
                  className="MoreContent"
                  src={require('../../assets/next.svg')}
                  alt="more content"
                />
              </div>
            </div>
            <div className="ProductCategory">
              <h5>Services</h5>
              <div className="ProductList">
                <div className="ProductItem">
                </div>
                <div className="ProductItem">
                </div>
                <div className="ProductItem">
                </div>
                <div className="ProductItem">
                </div>
                <div className="ProductItem">
                </div>
                <div className="ProductItem">
                </div>
              </div>
              <div className="ArrowContainer">
                <img
                  className="MoreContent"
                  src={require('../../assets/next.svg')}
                  alt="more content"
                />
              </div>
            </div>
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