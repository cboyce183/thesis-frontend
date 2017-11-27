import React, { Component, } from 'react';

import '../../App.css';
import './PanelSquare.css';

import { Link, } from 'react-router-dom';

class PanelSquare extends Component {
  render() {
    const settings = this.props.alter === 'settings'
      ? ' Settings'
      : ''
    return this.props.isSummary ? (
      <Link style={{textDecoration:'none',}} to={this.props.link}>
        <div className="PanelSquare">
          <div className="Wrapper">
            <h5>{this.props.title}</h5>
            <div className="Currency">
              <h1>{this.props.zen}</h1>
              <h2>ż</h2>
            </div>
          </div>
        </div>
      </Link>
    ) : (
      <Link style={{textDecoration:'none',}} to={this.props.link}>
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
