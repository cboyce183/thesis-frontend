import React, { Component, } from 'react';

import '../../App.css';
import './PanelSquare.css';

import { Link, } from 'react-router-dom';

class PanelSquare extends Component {

  renderCurrency(zen) {
    return zen && zen.match(/.+\.svg/gi)
      ? (
        <div className="Currency">
          <img
            className="PanelInfinity"
            src={require('../../assets/infinity.svg')}
            alt="infinity"
          />
        </div>
      ) : (
        <div className="Currency">
          <h1 className="Zen">{zen}</h1>
          <h2>ż</h2>
        </div>
      )
  }

  render() {
    const settings = this.props.alter === 'settings'
      ? ' Settings'
      : ''
    const summary = this.renderCurrency(this.props.zen);
    return this.props.isSummary ? (
      <Link className="Hovering" style={{textDecoration:'none',}} to={this.props.link}>
        <div className="PanelSquare">
          <div className="Wrapper">
            <h5>{this.props.title}</h5>
            {summary}
          </div>
        </div>
      </Link>
    ) : (
      <Link className={'Hovering' + settings} style={{textDecoration:'none',}} to={this.props.link}>
        <div className={'PanelSquare' + settings}>
          <img
            className="PanelImg"
            alt={this.props.alter}
            src={this.props.image}
          />
        </div>
      </Link>
    );
  }
}

export default PanelSquare;
