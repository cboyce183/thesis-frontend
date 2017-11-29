import React, { Component, } from 'react';
import PieChart from 'react-minimal-pie-chart';
import './UserWallet.css'
class UserWallet extends Component {
  constructor(props){
    super(props)
    this.state = {
      token:  '',
      accountInfo: null
    }
  }

  getInit(){
    fetch('https://private-3a61ed-zendama.apiary-mock.com/user-wallet', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),}
    })
      .then(r => r.json())
      .then(res => this.setState({accountInfo: res}))
  }

  componentDidMount(){
    this.setState({token: window.localStorage.getItem('token'),})
    this.getInit();
  }


  render() {
    console.log('this', this.state)
    return (
      <div className="WalletContainer">
        <div className="PannelContainer"></div>
        <div className="DashContainer">
          <div className="HeaderContainer">

          </div>
          <div className="SummaryContainer">
            <div className="SummaryDividerPie">
              <PieChart className="PercentGiven"
                startAngle={270}
                radius={50}
                lineWidth={20}
                paddingAngle={3}
                // rounded={true}
                animate={true}
                data={[
                  { value: 100, key: 1, color: '#CDCDCD',},
                  { value: 400, key: 2, color: 'black',},]}
              >
                <div className="PerGivenText">25%</div>
              </PieChart>
              <PieChart className="PercentGiven"
                startAngle={270}
                radius={50}
                lineWidth={20}
                paddingAngle={3}
                // rounded={true}
                animate={true}
                data={[
                  { value: 100, key: 1, color: '#CDCDCD',},
                  { value: 400, key: 2, color: 'black',},]}
              >
                <div className="PerRecivedText">25%</div>
              </PieChart>
            </div>
            <div className="SummaryDividerTot"></div>
          </div>
          <div className="SheetContainer"></div>
        </div>

      </div>
    )
  }
}




export default (UserWallet);
