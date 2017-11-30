import React, { Component, } from 'react';

import '../../App.css';
import './PopUp.css';

class PopUp extends Component {

  render() {
    console.log(this.props);
    return this.props.isService ? (
      <div className="PopUpDisplay">
        <div
          onClick={() => this.props.unpop({})}
          className="PopUpOverlay"
        >
        </div>
        <div className="PopUp">
          <h3>{this.props.title}</h3>
          <div className="PopUpImgWrap">
            <img
              className="PopUpImg"
              alt="product"
              src={this.props.image}
            />
          </div>
          <p>{this.props.description}</p>
          <h4>{this.props.value}</h4>
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
          <h3>{this.props.title}</h3>
          <div className="PopUpImgWrap">
            <img
              className="PopUpImg"
              alt="product"
              src={this.props.image}
            />
          </div>
          <p>{this.props.description}</p>
          <h4>{this.props.value}</h4>
          <div className="QuantitySelector">
            <input className="QuantityModifier Minus" type="button" value="-"/>
            <input className="QuantityInput" type="number" defaultValue="1"/>
            <input className="QuantityModifier" type="button" value="+"/>
          </div>
          <input type="submit" />
        </div>
      </div>
    );
  }
}

export default PopUp;
