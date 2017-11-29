import React, { Component, } from 'react';

import '../../App.css';
import './ProductList.css';

import ProductItem from '../ProductItem/ProductItem';

class ProductList extends Component {

  render() {
    return (
      <div className="ProductCategory">
        <h5>{this.props.title}</h5>
        <div className="ProductList">
          <ProductItem
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla."
            price="200"
            image="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
            title="Smiley Face"
          />
          <ProductItem
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla."
            price="200"
            image="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
            title="Smiley Face"
          />
          <ProductItem
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla."
            price="200"
            image="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
            title="Smiley Face"
          />
          <ProductItem
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla."
            price="200"
            image="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
            title="Smiley Face"
          />
          <ProductItem
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla."
            price="200"
            image="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
            title="Smiley Face"
          />
          <ProductItem
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla."
            price="200"
            image="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
            title="Smiley Face"
          />
          <ProductItem
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla."
            price="200"
            image="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
            title="Smiley Face"
          />
          <ProductItem
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus, est ac volutpat bibendum, risus lorem aliquet, bla bla bla bla bla bla."
            price="200"
            image="https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300"
            title="Smiley Face"
          />
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
