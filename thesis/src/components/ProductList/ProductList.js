import React, { Component, } from 'react';

import '../../App.css';
import './ProductList.css';

import ProductItem from '../ProductItem/ProductItem';

class ProductList extends Component {

  renderProductList(arr) {
    return arr.map((el,i) =>{
      console.log(el)
      return (
        <ProductItem
          isAdmin={this.props.isAdmin}
          pop={this.props.pop}
          key={i}
          id={el._id}
          isService={el.isService}
          schedule={el.schedule}
          description={el.description}
          price={el.price}
          image={el.picture}
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
          {this.props.isAdmin
            ? (
              <input
                type="submit"
                value="+"
                onClick={() => this.props.add(this.props.title)}
              />
            ) : null}
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
