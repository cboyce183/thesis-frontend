import React, { Component, } from 'react';

import { Link, } from 'react-router-dom';

import '../../App.css';
import './Close.css';

class Close extends Component {

  render() {
    return (
      <Link style={{textDecoration:'none',}}to={this.props.link}>
        <div className="Close">
          <img alt="close button" className="CloseImg" src={require('../../assets/cross-out.svg')}/>
        </div>
      </Link>
    )
  }
}

export default Close;
