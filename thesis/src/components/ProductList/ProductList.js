import React, { Component, } from 'react';

import '../../App.css';
import './ProductList.css';

class PanelSquare extends Component {

  render() {
    return (
      <div className="PanelSquare">
        <img
          className="PanelImg"
          alt={this.props.alter}
          src={this.props.image}
        />
      </div>
    );
  }
}

export default PanelSquare;
