import React, { Component, } from 'react';

import '../../App.css';
import './ProductItem.css';

class ProductItem extends Component {

  render() {
    return (
      <div className="ProductItem">
        <div className="ProductDescription">
          <p>{this.props.description}</p>
          <h6>Price: {this.props.price}</h6>
        </div>
        <div className="ProductItemImgWrapper">
          <img
            className="ProductItemImg"
            alt="product"
            src={this.props.image}
          />
        </div>
        <h6>{this.props.title}</h6>
        <input
          className="BuyButton"
          type="submit"
          value="buy"
          onClick={() => this.props.pop()}
        />
      </div>
    );
  }
}

export default ProductItem;
