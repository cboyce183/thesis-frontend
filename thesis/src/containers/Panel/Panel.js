import React, { Component, } from 'react';

import '../../App.css';
import './Panel.css';

class Panel extends Component {
  render() {
    return (
      <div className="MaxWidth">
        <div className="PanelPosition">
          <div className="PanelContainer">
            <div className="PanelSquare">
              <div className="Wrapper">
                <h5>Remaining Zen</h5>
                <div className="Currency">
                  <h1>173</h1>
                  <h2>ż</h2>
                </div>
              </div>
            </div>
            <div className="PanelSquare">
              <div className="Wrapper">
                <h5>Available Zen</h5>
                <div className="Currency">
                  <h1>1209</h1>
                  <h2>ż</h2>
                </div>
              </div>
            </div>
            <div className="PanelSquare">
              <img
                className="PanelImg"
                alt="settings"
                src={require('../../assets/cart.svg')}
              />
            </div>
            <div className="PanelSquare Settings">
              <img
                className="PanelImg"
                alt="settings"
                src={require('../../assets/settings.svg')}
              />
            </div>
          </div>
          <h6>powered by Zendama</h6>
        </div>
      </div>
    );
  }
}
//remeber to leave index.js as it was!!!!!
export default Panel;
