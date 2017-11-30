import React, { Component, } from 'react';

import '../../App.css';
import './PopUp.css';

class PopUp extends Component {

  /*
  parent component must have following functions:
  handlePopUp = (product) => {
    this.setState({
      selectedProduct: product,
      popped: !this.state.popped,
    })
  }

  renderPopUp() {
    return (
      <ProductPopUp
        unpop={this.handlePopUp.bind(this)}
      />
    )
  }

  along with a state element called "popped" that starts out as false. Also, to display the pop up, you must include the following function
  within your render():

  const popped = this.state.popped
  ? this.renderPopUp(this.state.selectedProduct)
  : '';

  then just include a {popped} within your jsx and the popup will display.
  */

  render() {
    return (
      <div className="PopUpDisplay">
        <div
          onClick={() => this.props.unpop({})}
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
