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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//remeber to leave index.js as it was!!!!!
export default Panel;
