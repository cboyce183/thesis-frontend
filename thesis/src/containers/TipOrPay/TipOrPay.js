import React, { Component, } from 'react';

// import { Link, } from 'react-router-dom';

// import Loader from '../../components/Loader/Loader';
import Close from '../../components/Close/Close';

import '../../App.css';
import './TipOrPay.css';

class TipOrPay extends Component {
  constructor(props) {
    super(props);
  }

  //======================= RENDERING

  render() {
    return (
      <div className="MaxWidth">
        <h1>Welcome To Tips</h1>
        <Close link="/panel"/>
      </div>
    );
  }
}

export default TipOrPay;