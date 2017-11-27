import React, { Component, } from 'react';

import '../../App.css';
import './NextSteps.css';

import { Link, } from 'react-router-dom';

class NextSteps extends Component {
  render() {
    return (
      <Link style={{ textDecoration:'none', }} to={this.props.link}>
        <div className="Step">
          <div className="Number">
            <p>{this.props.step}</p>
          </div>
          <div className="Text">
            <p>{this.props.text}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default NextSteps;
