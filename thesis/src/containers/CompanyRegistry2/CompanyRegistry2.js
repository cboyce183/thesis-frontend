import React, { Component, } from 'react';
import '../../App.css';
import './CompanyRegistry2.css';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';

class CompanyRegistry2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coinName:'',
      wklyAllow:'',
    }
  }

  getCompanySignIn (data) {
    const {
      companyEmail,
      companyUserName,
      companyPassword,
      companyLogo,
    } = this.props.saveCompanyInfo
    return fetch ('https://private-b133c5-zendama.apiary-mock.com/company', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        companyEmail,
        companyUserName,
        companyPassword,
        companyLogo,
        coinName: data.coinName,
        wklyAllow: data.wklyAllow,
      },
    })
  }

  handleCompanyCurrency = (e) => {
    this.setState({
      coinName: e.target.value,
      wklyAllow: e.target.value,
    })}

  render() {
    return (
      <div className="MaxWidth">
        <div className="coin-info-container">
          <div className="company-coin-logo">
            <img src='https://www.bitcoin.com/wp-content/uploads/2017/06/index_question.svg' alt='bicoin logo'/>
          </div>
          <div className="company-coin-info">
            <div className="coin-name-allow-cont">
              <p className='label-currency'>Name Your Company Currency</p>
              <input
                className="u-full-width coin-info"
                type="text"
                placeholder="Currency Name"
                value={this.state.coinName}
                onChange={(e) => this.setState({coinName: e.target.value,})}
              />
              <input
                className="u-full-width coin-info"
                type="number"
                placeholder="Weekly Allowance $"
                value={this.state.wklyAllow}
                onChange={(e) => this.setState({wklyAllow: e.target.value,})}
              />
              <Link to={{pathname: '/panel',}}>
                <input
                  className="button-primary nxt-btn"
                  type="submit"
                  value="Next"
                  onClick={this.handleCompanyCurrency}
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

const mapStateToProps = (state) => ({
  saveInfo: state.saveCompanyInfo,
});

export default connect(mapStateToProps)(CompanyRegistry2);
