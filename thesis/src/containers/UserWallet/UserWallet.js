import React, { Component, } from 'react';
import PieChart from 'react-minimal-pie-chart';
import './UserWallet.css'
// import PanelSquare from './../../componets/Loader/Loader'


class UserWallet extends Component {
  constructor(props){
    super(props)
    this.state = {
      token:  '',
      accountInfo: null,
      ZenFlowStats: {ZenIn: '-', ZenOut: '-', DZen: '-',},
      CompGavePer: {ZenOut: 100, CompGave: 400, UserPercentage: '0%',},
      CompRecPer: {ZenIn: 100, CompRec: 100, UserPercentage: '50%',},
    }
  }

  getInit(){
    fetch('https://private-3a61ed-zendama.apiary-mock.com/user-wallet', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
    })
      .then(r => r.json())
      .then(res => this.setState({accountInfo: res,}))
      .then(zenStat => this.manageZenFlowStats())
      .then(update => {
        this.companyGaveStats();
        this.companyRecStats();
      })
  }

  componentDidMount(){
    this.setState({token: window.localStorage.getItem('token'),})
    this.getInit();
  }

  transactionList(list){
    if(this.state.accountInfo) {
      return this.state.accountInfo.recentTransactions.map(el => {
        return (
          <div key={el._id} style={{backgroundColor: !!el.given ? '#ededed' : 'white',}} className="TransactionItem">
            <div className="TransactionCol">
              <div className="TransactionPic">
                <img alt="" src={{url: el.profilePic,}}/>
              </div>
            </div>
            <div className="TransactionCol">
              <div>{el.username}</div>
            </div>
            <div className="TransactionCol">
              <div>{el.date}</div>
            </div>
            <div className="TransactionCol">
              <div>{el.given ? el.given : '-'}</div>
            </div>
            <div className="TransactionCol">
              <div>{el.received ? el.received : '-'}</div>
            </div>
            <div className="TransactionCol">
              <div>{el.amount}</div>
            </div>
          </div>
        )
      })
    }
  }

  manageZenFlowStats(){
    const res = this.state.accountInfo.recentTransactions.reduce((acc, el) => {
      return el.given ? ([acc[0] + el.given, acc[1],]) : ([acc[0], el.received + acc[1],])
    }, [0,0,])
    this.setState({ZenFlowStats: {ZenIn: res[0], ZenOut: res[1], DZen: res[1] - res[0],},})
  }

  companyGaveStats(){
    const user = this.state.ZenFlowStats.ZenOut;
    const comp = this.state.accountInfo.compTotalGave;
    const prec = (Math.round((user/comp*100)*10)/10).toString() + '%';
    this.setState({CompGavePer: {
      ZenOut: user,
      CompGave: comp,
      UserPercentage: prec,},})
  }

  companyRecStats(){
    const user = this.state.ZenFlowStats.ZenIn;
    const comp = this.state.accountInfo.compTotalRecived;
    const prec = (Math.round((user/comp*100)*10)/10).toString() + '%';
    this.setState({CompRecPer: {
      ZenIn: user,
      CompRec: comp,
      UserPercentage: prec,},})
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
            <div className="SummaryDivider">
              <div className="pie4you">Overview within comp4any</div>
              <div className="SummaryDividerPie">
                <PieChart className="PercentGiven"
                  startAngle={270}
                  radius={50}
                  lineWidth={20}
                  paddingAngle={3}
                  animationDuration={3000}
                  // rounded={true}
                  animate={true}
                  data={[
                    { value: this.state.CompGavePer.ZenOut, key: 1, color: 'black',},
                    { value: this.state.CompGavePer.CompGave, key: 2, color: '#CDCDCD',},]}
                >
                  <div className="PerGivenText">
                    <div className="GaveTitle">GAVE</div>
                    <div className="GavePer">{this.state.CompGavePer.UserPercentage}</div>
                  </div>
                </PieChart>
                <PieChart className="PercentGiven"
                  startAngle={0}
                  radius={50}
                  lineWidth={20}
                  paddingAngle={3}
                  animationDuration={3000}
                  // rounded={true}
                  animate={true}
                  data={[
                    { value: this.state.CompRecPer.ZenIn, key: 1, color: 'black',},
                    { value: this.state.CompRecPer.CompRec, key: 2, color: '#CDCDCD',},]}
                >
                  <div className="PerRecivedText">
                    <div className="GaveTitle">RECEIVED</div>
                    <div className="GavePer">{this.state.CompRecPer.UserPercentage}</div>
                  </div>
                </PieChart>
              </div>
            </div>
            <div className="SummaryDividerTot">
              <div className="TotSumTitle">
                <div className="ZenFlowLabel">manage-zen-flow</div>
              </div>
              <div className="TotSumIn">
                <div className="ZenInLab">Zen in</div>
                <div className="ZenInNum">{this.state.ZenFlowStats.ZenIn}</div>
              </div>
              <div className="TotSumIn" id="UnderLineElement">
                <div className="ZenInLab">Zen out</div>
                <div className="ZenInNum">{this.state.ZenFlowStats.ZenOut}</div>
              </div>
              <div className="TotSumIn">
                <div className="ZenInLab">Δ Zen</div>
                <div className="ZenInNum" id="ZenLargeDelta">{this.state.ZenFlowStats.DZen}</div>
              </div>
            </div>
          </div>
          <div className="SheetContainer">
            <div className="BalenceHeader"></div>
            <div className="BalenceContainer">
              <div className="TransactionItem">
                <div className="TransactionTitle">user</div>
                <div className="TransactionTitle">id</div>
                <div className="TransactionTitle">Date</div>
                <div className="TransactionTitle">Gave</div>
                <div className="TransactionTitle">Recieved</div>
                <div className="TransactionTitle">Amount</div>
              </div>
              {this.transactionList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}




export default (UserWallet);
