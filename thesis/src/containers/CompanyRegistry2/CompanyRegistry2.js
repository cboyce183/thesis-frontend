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
      weeklyAllow:'',
    }
  }

  getCompanySignIn = (data) => {
    const {
      email,
      name,
      password,
      logo,
    } = this.props.saveInfo
    fetch ('http://192.168.0.37:4200/add-company', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
        logo,
        coinName: this.state.coinName,
        weeklyAllow: this.state.weeklyAllow,
      }),
    })
      .then(response => {
        if (response.status === 201) window.location = '/panel';
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
                value={this.state.weeklyAllow}
                onChange={(e) => this.setState({weeklyAllow: e.target.value,})}
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
