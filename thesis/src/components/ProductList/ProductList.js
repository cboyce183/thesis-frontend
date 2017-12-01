import React, { Component, } from 'react';

import '../../App.css';
import './ProductList.css';

import ProductItem from '../ProductItem/ProductItem';

class ProductList extends Component {

  renderProductList(arr) {
    return arr.map((el,i) =>{
      return (
        <ProductItem
          isAdmin={this.props.isAdmin}
          pop={this.props.pop}
          key={i}
          id={el.id}
          isService={el.isService}
          schedule={el.schedule}
          description={el.description}
          price={el.value}
          image={el.img}
          title={el.name}
        />
      )
    })
  }

  render() {
    const products = this.renderProductList(this.props.arr);
    return (
      <div className="ProductCategory">
        <div className="ProductCategoryTitle">
          <h5>{this.props.title}</h5>
          {this.props.isAdmin ? <input
            type="submit"
            value="+"
          /> : null}
        </div>
        <div className="ProductList">
          {products}
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
