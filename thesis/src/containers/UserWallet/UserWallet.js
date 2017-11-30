import React, { Component, } from 'react';
import PieChart from 'react-minimal-pie-chart';
import './UserWallet.css'
import Loader from './../../components/Loader/Loader'
import Close from '../../components/Close/Close';
import DropDown from '../../components/DropDown/DropDown';

class UserWallet extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      token:  '',
      accountInfo: null,
      ZenFlowStats: {ZenIn: '-', ZenOut: '-', DZen: '-',},
      CompGavePer: {ZenOut: 100, CompGave: 400, UserPercentage: '0%',},
      CompRecPer: {ZenIn: 100, CompRec: 100, UserPercentage: '50%',},
      transactionPage: [0, 14,],
      transactionsToDisplay: null,
      userList: [],
      selected: '',
    }
  }

  filterUserNamesForSelection(){
    const userNameArr = []
    const res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
      if(userNameArr.indexOf(el.username) === -1) {
        acc.push({img: el.profilePic, username: el.username, id: el.userid,});
        userNameArr.push(el.username);
        return acc
      } else {
        return acc
      }
    }, [])
    this.setState({userList: res,})
  }

  handleUserSelection = (value) => {
    this.filteringNamesForPanel(value)
    this.setState({selected: value,})
  }

  filteringTransactionsForPanel(start, end){
    const res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
      if(i >= start && i < end) {
        acc.push(el);
        return acc
      } else {
        return acc
      }
    }, [])
    this.setState({transactionsToDisplay: res,})
  }

  filteringNamesForPanel(name){
    const res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
      console.log(name, "==========",el.userid)
      if(name === el.userid) {
        acc.push(el);
        console.log(acc)
        return acc
      } else {
        return acc
      }
    }, [])
    this.setState({transactionsToDisplay: res,})
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
        this.filteringTransactionsForPanel(0, 14)
        this.filterUserNamesForSelection()
        this.setState({loaded: true,})
      })
  }

  componentDidMount(){
    this.setState({token: window.localStorage.getItem('token'),})
    this.getInit();
  }

  incrementThePage(){
    this.filteringTransactionsForPanel(14,29)
  }

  decrementThePage(){
    this.filteringTransactionsForPanel(0,14)
  }

  pageTotal(col){
    if (this.state.transactionsToDisplay) {
      return this.state.transactionsToDisplay.reduce((acc, el) => {
        return acc + el[col]
      }, 0)
    }
  }


  transactionList(){
    if(this.state.transactionsToDisplay) {
      return this.state.transactionsToDisplay.map((el, i) => {
        return (
          <div key={el._id} style={{backgroundColor: !!el.given ? '#ededed' : 'white',}} className="TransactionItem">
            <div className="TransactionCol">
              <div className="TransactionPic">
                <img className="TranscationPicImg" alt="" src={el.profilePic}/>
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
    this.setState({ZenFlowStats: {ZenOut: res[0], ZenIn: res[1], DZen: res[1] - res[0],},})
  }

  companyGaveStats(){
    const user = this.state.ZenFlowStats.ZenOut;
    const comp = this.state.accountInfo.compTotalGave;
    const prec = (Math.round((user/(user+comp)*100)*10)/10).toString() + '%';
    this.setState({CompGavePer: {
      ZenOut: user,
      CompGave: comp,
      UserPercentage: prec,},})
  }

  companyRecStats(){
    const user = this.state.ZenFlowStats.ZenIn;
    const comp = this.state.accountInfo.compTotalRecived;
    const prec = (Math.round((user/(comp+user)*100)*10)/10).toString() + '%';
    this.setState({CompRecPer: {
      ZenIn: user,
      CompRec: comp,
      UserPercentage: prec,},})
  }

  render() {
    console.log('this', this.state)
    if (this.state.loaded) {
      return (
        <div className="WalletContainer">
          <div className="PannelContainer">
            <div className="PannelProfileInfo">
              <div className="UserProfilePicture">
                <img className="UserProfileImage" alt="" src={this.state.accountInfo.userInformation.profilePic}/>
              </div>
              <div className="UserProfileName">{this.state.accountInfo.userInformation.username}</div>
            </div>
            <div className="PannelToolBar"></div>
          </div>
          <div className="DashContainer">
            <div className="HeaderContainer">
              <Close link="/panel"/>
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
                      <div className="GaveTitle">GIVEN</div>
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
                  <div className="ZenFlowLabel">month-zen-flow</div>
                </div>
                <div className="TotSumIn">
                  <div className="ZenInLab">Zen Recieved</div>
                  <div className="ZenInNum">{this.state.ZenFlowStats.ZenIn}</div>
                </div>
                <div className="TotSumIn" id="UnderLineElement">
                  <div className="ZenInLab">Zen Given</div>
                  <div className="ZenInNum">{this.state.ZenFlowStats.ZenOut}</div>
                </div>
                <div className="TotSumIn">
                  <div className="ZenInLab">Δ Zen</div>
                  <div className="ZenInNum" id="ZenLargeDelta">{this.state.ZenFlowStats.DZen}</div>
                </div>
              </div>
            </div>
            <div className="SheetContainer">
              <div className="BalenceHeader">
                <div className="DropDownDiv">
                  <DropDown
                    func={this.handleUserSelection.bind(this)}
                    placeh="Filter people"
                    arr={this.state.userList}
                  />
                </div>
                <div className="spacedivATM">
                  {/* <input type="date"/>
                  <input type="date"/> */}
                </div>
                <div className="spacedivATM"></div>
                <div className="spacedivATM"></div>
                <div className="spacedivATM">
                  <input onClick={async () => {
                    this.filteringTransactionsForPanel(0,14)
                  }}
                  className="RemoveFilterButton" type="submit" value="All"
                  />
                </div>

              </div>
              <div className="TransactionItemHeader">
                <div className="TransactionTitle">User</div>
                <div className="TransactionTitle">ID</div>
                <div className="TransactionTitle">Date</div>
                <div className="TransactionTitle">Gave</div>
                <div className="TransactionTitle">Recieved</div>
                <div className="TransactionTitle">Amount</div>
              </div>
              <div className="TransactionContainer">
                {this.transactionList()}
              </div>
              <div className="TransactionSummaryStats">
                <div className="TransactionTitle"></div>
                <div className="TransactionTitle"></div>
                <div className="TransactionTitle">page totals</div>
                <div className="TransactionTitle">{this.pageTotal('given')}</div>
                <div className="TransactionTitle">{this.pageTotal('received')}</div>
                <div className="TransactionTitle"> Δ {this.pageTotal('received') - this.pageTotal('given')} </div>
              </div>
              <div className="TransactionOverflowBox">
                <div className="TransactionNavigation">
                  <div className="SheetBack"
                    onClick={() => {
                      this.decrementThePage()
                    }}
                  > &lt; </div>
                  <div className="SheetNumber"> 1 - 3 </div>
                  <div onClick={()=> {
                    this.incrementThePage()
                  }}
                  className="SheetForward"
                  > &gt;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Loader/>
      )
    }
  }
}




export default (UserWallet);
