import React, { Component, } from 'react';

import '../../App.css';
import './ProductItem.css';

class ProductItem extends Component {

  render() {
    const product = this.props;
    return (
      <div className="ProductItem">
        <div className="ProductDescription">
          <p>{this.props.description}</p>
          <h6>Price: {this.props.price}</h6>
        </div>
        <div style={{backgroundImage: `url(${this.props.image})`,}} className="ProductItemImgWrapper">
        </div>
        <h6>{this.props.title}</h6>
        <input
          className="BuyButton"
          type="submit"
          value="buy"
          onClick={() => this.props.pop(product)}
        />
      </div>
    );
  }
}

export default ProductItem;
