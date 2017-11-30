import React, { Component, } from 'react';

import '../../App.css';
import './PopUp.css';

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    }
  }

  handleQuantity = (increment, ref) => {
    if (increment) {
      ref.value++;
    }
    else {
      ref.value--;
    }
    this.setState({quantity: ref.value,})
  }

  handleUserType = (event) => {
    console.log(event);
    if (event.target.value) this.setState({quantity: event.target.value,});
    else this.setState({quantity: 0,})
  }

  render() {
    return this.props.isService ? (
      <div className="PopUpDisplay">
        <div
          onClick={() => this.props.unpop({})}
          className="PopUpOverlay"
        >
        </div>
        <div className="PopUp">
          <div style={{backgroundImage: `url(${this.props.image})`,}}className="PopUpImgWrap">
          </div>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <h5>Price: {this.props.value}</h5>
          <input type="submit" />
        </div>
      </div>
    ) : (
      <div className="PopUpDisplay">
        <div
          onClick={() => this.props.unpop({})}
          className="PopUpOverlay"
        >
        </div>
        <div className="PopUp">
          <div style={{backgroundImage: `url(${this.props.image})`,}}className="PopUpImgWrap">
          </div>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <h5>Price: {this.props.value * this.state.quantity}</h5>
          <div className="QuantitySelector">
            <input
              onClick={() => this.handleQuantity(false, this.quantity)}
              className="QuantityModifier Minus"
              type="button"
              value="-"
            />
            <input
              className="QuantityInput"
              type="number"
              ref={el => this.quantity = el}
              defaultValue="1"
              onChange={this.handleUserType}
            />
            <input
              onClick={() => this.handleQuantity(true, this.quantity)}
              className="QuantityModifier"
              type="button"
              value="+"
            />
          </div>
          <input type="submit" value="buy"/>
        </div>
      </div>
    );
  }
}

export default PopUp;
