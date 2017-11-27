import React, { Component, } from 'react';

import '../../App.css';
import './PanelSquare.css';

class PanelSquare extends Component {
  render() {
    const settings = this.props.alter === 'settings'
      ? ' Settings'
      : ''
    return this.props.isSummary ? (
      <div className="PanelSquare">
        <div className="Wrapper">
          <h5>{this.props.title}</h5>
          <div className="Currency">
            <h1>{this.props.zen}</h1>
            <h2>ż</h2>
          </div>
        </div>
      </div>
    ) : (
      <div className={'PanelSquare' + settings}>
        <img
          className="PanelImg"
          alt={this.props.alter}
          src={this.props.image}
        />
      </div>
    );
  }
}
//remeber to leave index.js as it was!!!!!
export default PanelSquare;
