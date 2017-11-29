import React, { Component, } from 'react';

import '../../App.css';
import './ProductList.css';

class ProductList extends Component {

  render() {
    return (
      <div className="ProductCategory">
        <h5>{this.props.title}</h5>
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
    );
  }
}

export default ProductList;
