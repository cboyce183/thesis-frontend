import React, { Component, } from 'react';
import '../../App.css';
import './CompanyRegistry2.css';
import { connect, } from 'react-redux';
import { saveCompanyInfo, } from '../../actions';


class CompanyRegistry2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coinName:'',
      wklyAllow:'',
    }
  }

  getCompanySignIn = (data) => {
    const {
      companyEmail,
      companyUserName,
      companyPassword,
      companyLogo,
    } = this.props.saveInfo
    fetch ('https://private-b133c5-zendama.apiary-mock.com/company', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyEmail,
        companyUserName,
        companyPassword,
        companyLogo,
        coinName: this.state.coinName,
        wklyAllow: this.state.wklyAllow,
      }),
    })
      .then(response => {
        if (response.status === 200) window.location = '/panel';
      });
  }

  render() {
    return (
      <div className="MaxWidth">
        <div className="coin-info-container">
          <div className="company-coin-logo">
            <img className='coin-upload' src='https://www.bitcoin.com/wp-content/uploads/2017/06/index_question.svg' alt='bicoin logo'/>
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
              <input
                className="button-primary nxt-btn"
                type="submit"
                value="Next"
                onClick={this.getCompanySignIn}
              />
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
