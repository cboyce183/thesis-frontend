import React, { Component } from 'react';
import '../../App.css';
import './companyregistry2.css';
import { Link } from 'react-router-dom';


class CompanyRegistry2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coinName:'',
      wklyAllow:'',
    }
  }


  render() {
    return (
      <div className="MaxWidth">
        <div className="coin-info-container">
          <div className="company-coin-logo">
            <img src='https://www.bitcoin.com/wp-content/uploads/2017/06/index_question.svg' alt='bicoin logo'/>
          </div>
          <div className="company-coin-info">
            <div className="coin-name-allow-cont">
              <p>Name Your Company Currency</p>
              <input
              className="u-full-width coin-info"
              type="email"
              placeholder="Coin Name"
              id="exampleEmailInput"
              value={this.state.coinName}
              onChange={(e) => this.setState({coinName: e.target.value,})}
              />
              <input
              className="u-full-width coin-info"
              type="email"
              placeholder="Weekly Allowance $"
              id="exampleEmailInput"
              value={this.state.wklyAllow}
              onChange={(e) => this.setState({wklyAllow: e.target.value,})}
              />
              <Link to={{pathname: '/panel'}}>
              <input
              className="button-primary nxt-btn"
              type="submit"
              value="Next"
              />
              </Link>
            </div>
          </div>
        </div>
        <div className="powered-by-coin">
          <p>Powered by Zendama</p>
        </div>
      </div>
    );
  }
}

export default CompanyRegistry2;
