import React, { Component, } from 'react';

import '../../App.css';
import './PopUp.css';

class PopUp extends Component {

  /*

  this component is used as such:
  <PopUp>
    //your content goes here
  </PopUp>

  parent component must have following functions:
  handlePopUp = (product) => {
    this.setState({
      selectedProduct: product,
      popped: !this.state.popped,
    })
  }

  renderPopUp() {
    return (
      <PopUp
        unpop={this.handlePopUp.bind(this)}
      >
      </PopUp>
    )
  }

  along with a state element called "popped" that starts out as false. Also, to display the pop up, you must include the following function
  within your render():

  const popped = this.state.popped
  ? this.renderPopUp(this.state.selectedProduct)
  : '';

  then just include a {popped} within your jsx and the popup will display.
  */

  handleUnPop = () => {
    this.props.unpop({})
  }

  renderWidthAndHeight = () => {
    if (this.props.width && this.props.height) {
      return {width: `${this.props.width}`, height: `${this.props.height}`,};
    } else if (this.props.width) {
      return {width: `${this.props.width}`, height: '650px',};
    } else if (this.props.height) {
      return {width: '450px', height: `${this.props.height}`,};
    } else {
      return {width: '450px', height: '650px',};
    }
  }

  render() {
    return (
      <div className="PopUpDisplay">
        <div
          onClick={this.handleUnPop}
          className="PopUpOverlay"
        >
        </div>
        <div className="PopUp" style={this.renderWidthAndHeight()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PopUp;
