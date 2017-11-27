import React, { Component, } from 'react';

import { Link, } from 'react-router-dom';

import '../../App.css';
import './Close.css';

class Close extends Component {

  render() {
    return (
      <Link to={this.props.link}>
        <div href="#" class="Close" />
      </Link>
    )
  }
}

export default Close;
