import React, { Component, } from 'react';

import '../../App.css';
import './Loader.css';

class PanelSquare extends Component {

  render() {
    return (
      <div className="Wrap">
        <div className="Spinner"></div>
      </div>
    )
  }
}

export default PanelSquare;
