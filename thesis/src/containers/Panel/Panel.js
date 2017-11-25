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
            </div>
            <div className="PanelSquare">
            </div>
            <div className="PanelSquare">
            </div>
            <div className="PanelSquare">
              <img alt="settings" src={require('../../assets/settings.svg')}/>
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
