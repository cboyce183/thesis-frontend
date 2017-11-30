import React, { Component, } from 'react';

import '../../App.css';
import './PopUp.css';

class PopUp extends Component {

  render() {
    return this.props.isService ? (
      <div
        onClick={this.props.unpop}
        className="PopUpOverlay"
      >
        <div className="PopUp">
        </div>
      </div>
    ) : (
      <div className="PopUpDisplay">
        <div
          onClick={this.props.unpop}
          className="PopUpOverlay"
        >
        </div>
        <div className="PopUp">
        </div>
      </div>
    );
  }
}

export default PopUp;
