import React, { Component, } from 'react';

import PanelSquare from '../../components/PanelSquare/PanelSquare';

import '../../App.css';
import './Panel.css';

class Panel extends Component {
  render() {
    return (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="PanelContainer">
            <PanelSquare
              isSummary={true}
              title="Remaining Zen"
              zen="173"
            />
            <PanelSquare
              isSummary={true}
              title="Available Zen"
              zen="1346"
            />
            <PanelSquare
              alter="cart"
              image={require('../../assets/cart.svg')}
            />
            <PanelSquare
              alter="settings"
              image={require('../../assets/settings.svg')}
            />
          </div>
          <h6>powered by Zendama</h6>
        </div>
      </div>
    );
  }
}
//remeber to leave index.js as it was!!!!!
export default Panel;
