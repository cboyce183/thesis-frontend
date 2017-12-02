import React, { Component, } from 'react';
import PieChart from 'react-minimal-pie-chart';
import './Ledger.css'
import Loader from './../../components/Loader/Loader'
import Close from '../../components/Close/Close';
import AdminExpenseSheet from '../../components/AdminExpenseSheet/AdminExpenseSheet';
import AdminUserToUserSheet from '../../components/AdminUserToUserSheet/AdminUserToUserSheet';
// import AdminUserSpentSheet from '../../components/AdminUserSpentSheet/AdminUserSpentSheet';
import DropDown from '../../components/DropDown/DropDown';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';




class Ledger extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      token:  '',
      accountInfo: null,
      ZenFlowStats: {ZenIn: '-', ZenOut: '-', DZen: '-',},
      CompSpentPer: {ZenOut: 100, CompSpent: 400, UserPercentage: '0%',},
      CompRecPer: {ZenIn: 100, CompRec: 100, UserPercentage: '50%',},
      transactionPage: [0, 14,],
      transactionsToDisplay: null,
      userList: [],
      selected: '',
      pageNumber: 1,
      totalPages: 1,
      popperSpent: false,
      popperRec: false,
      popperDate: false,
      adminDetails: null,
      UserToUser: [],
      DisplayUserToUser: true,
      AdminExpense: [],
      DisplayAdminExpense: false,
      UserSpent: [],
      DisplayUserSpent: false,
    }
  }



  filteringTypesOfTransactions(resp){
    const trans = resp.transactions;
    const u2u = [];
    const addExp = [];
    const userSp = [];
    trans.forEach( el => {
      if (el.type === 'UserToUser') u2u.push(el)
      if (el.type === 'AdminExpense') addExp.push(el)
      if (el.type === 'UserSpent') userSp.push(el)
    })
    this.setState({UserToUser: u2u,})
    this.setState({AdminExpense: addExp,})
    this.setState({UserSpent: userSp,})
  }

  filterUserNamesForSelection(){
    // const userNameArr = []
    // const res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
    //   if(userNameArr.indexOf(el.username) === -1) {
    //     acc.push({img: el.profilePic, username: el.username, id: el.userid,});
    //     userNameArr.push(el.username);
    //     return acc
    //   } else {
    //     return acc
    //   }
    // }, [])
    // this.setState({userList: res,})
  }

  handleUserSelection = (value) => {
    // this.filteringNamesForPanel(value)
    // this.setState({selected: value,})
  }

  filteringTransactionsForPanel(start, end){
    // const res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
    //   if(i >= start && i <= end) {
    //     acc.push(el);
    //     return acc
    //   } else {
    //     return acc
    //   }
    // }, [])
    // this.setState({transactionsToDisplay: res,})
  }

  filteringNamesForPanel(name){
    // const res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
    //   if(name === el.userid) {
    //     acc.push(el);
    //     console.log(acc)
    //     return acc
    //   } else {
    //     return acc
    //   }
    // }, [])
    // this.setState({transactionsToDisplay: res,})
  }

  filteringSpentForPanel(min, max, popperType){
    // let res;
    // if(popperType === 'popperDate') {
    //   const whichCol = 'date'
    //   res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
    //     if(new Date(el[whichCol]) > new Date(min) && new Date(el[whichCol]) < new Date (max)) {
    //       acc.push(el);
    //       return acc
    //     } else {
    //       return acc
    //     }
    //   }, [])
    // } else {
    //   let whichCol;
    //   popperType === 'popperSpent' ? (whichCol = 'spent') :  (whichCol = 'received')
    //   res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
    //     if(el[whichCol] > min && el[whichCol] < max) {
    //       acc.push(el);
    //       return acc
    //     } else {
    //       return acc
    //     }
    //   }, [])
    // }
    // this.setState({transactionsToDisplay: res,})
  }


  getInit(){
    fetch('https://private-3a61ed-zendama.apiary-mock.com/admin-transactions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
    })
      .then(r => r.json())
      // .then(p => console.log(p))
      .then(res => {
        this.setState({adminDetails: res.adminDetails,})
        this.setState({loaded: true,})
        this.filteringTypesOfTransactions(res)
      })
      // .then(res => this.setState({accountInfo: res,}))
      // .then(zenStat => this.manageZenFlowStats())
      // .then(update => {
      //   this.companySpentStats();
      //   this.companyRecStats();
      //   this.filteringTransactionsForPanel(0, 14)
      //   this.filterUserNamesForSelection()
      //   this.setState({loaded: true,})
      //   this.totalNumberOfPagesNeeded()
      // })
  }

  componentDidMount(){
    // this.setState({token: window.localStorage.getItem('token'),})
    this.getInit();
  }

  incrementThePage(){
    // if(this.state.pageNumber < this.state.pageTotal) {
    //   this.filteringTransactionsForPanel(14,29)
    //   this.setState((prevState, props) => ({pageNumber: prevState.pageNumber + 1,}))
    // }
  }

  decrementThePage(){
    // if (this.state.pageNumber > 1){
    //   this.filteringTransactionsForPanel(0,14)
    //   this.setState((prevState, props) => ({pageNumber: prevState.pageNumber - 1,}))
    // }
  }

  pageTotal(col){
    // if (this.state.transactionsToDisplay) {
    //   return this.state.transactionsToDisplay.reduce((acc, el) => {
    //     return acc + el[col]
    //   }, 0)
    // }
  }

  totalNumberOfPagesNeeded(){
    // const recTranLength = this.state.accountInfo.recentTransactions.length
    // const nPagesRequired = Math.round(recTranLength/14)
    // this.setState({pageTotal: nPagesRequired,})
  }

  displayingNavigationPage(){
    // if(this.state.pageTotal  > 1) {
    //   return (
    //     <div className="Admin-TransactionNavigation">
    //       <div className="Admin-SheetBack"
    //         onClick={() => {
    //           this.decrementThePage()
    //         }}
    //       > &lt; </div>
    //       <div className="Admin-SheetNumber"> 1 - {this.state.pageTotal} </div>
    //       <div onClick={()=> {
    //         this.incrementThePage()
    //       }}
    //       className="Admin-SheetForward"
    //       > &gt;
    //       </div>
    //     </div>
    //   )
    // }
  }


  UserToUserTransactionList(BallenceType){
    if(this.state.DisplayUserToUser) {
      return (<AdminUserToUserSheet
        UserToUser={this.state.UserToUser}/>
      )
    }
  }



  AdminExpenseTransactionList(col2, col1, col3){
    if(this.state.DisplayAdminExpense) {
      return (<AdminExpenseSheet
        ref={el => this.child = el}
        col2={col2}
        col1={col1}
        AdminExpense={this.state.AdminExpense}/>)
    }
    if(this.state.DisplayUserSpent) {
      return (<AdminExpenseSheet
        ref={el => this.child = el}
        col2={col1}
        col1={col2}
        AdminExpense={this.state.UserSpent}/>)
    }
  }

  // UserSpentTransactionList(){
  //   if(this.state.DisplayUserSpent) {
  //     return <AdminUserSpentSheet AdminExpense={this.state.UserSpent}/>
  //   }
  // }

  manageZenFlowStats(){
    // const res = this.state.accountInfo.recentTransactions.reduce((acc, el) => {
    //   return el.spent ? ([acc[0] + el.spent, acc[1],]) : ([acc[0], el.received + acc[1],])
    // }, [0,0,])
    // this.setState({ZenFlowStats: {ZenOut: res[0], ZenIn: res[1], DZen: res[1] - res[0],},})
  }

  companySpentStats(){
    // const user = this.state.ZenFlowStats.ZenOut;
    // const comp = this.state.accountInfo.compTotalSpent;
    // const prec = (Math.round((user/(user+comp)*100)*10)/10).toString() + '%';
    // this.setState({CompSpentPer: {
    //   ZenOut: user,
    //   CompSpent: comp,
    //   UserPercentage: prec,},})
  }

  handleUserErase = (user) => {
    // this.props.func('')
    this.setState({selected: [],})
  }

  companyRecStats(){
    // const user = this.state.ZenFlowStats.ZenIn;
    // const comp = this.state.accountInfo.compTotalRecived;
    // const prec = (Math.round((user/(comp+user)*100)*10)/10).toString() + '%';
    // this.setState({CompRecPer: {
    //   ZenIn: user,
    //   CompRec: comp,
    //   UserPercentage: prec,},})
  }

  popUp(){
    if(this.state.popperRec) {
      return (
        <div className="Admin-popUp">
          <div className="Admin-PopUpBlock">
            <ForceGraph simulationOptions={{ animate: true, height: 300, width: 300,}}
              xmlnsXlink="http://www.w3.org/1999/xlink">
              {this.state.UserToUser.map((el, i) => {
                return  <ForceGraphNode key={i} node={{id: el.from.username,}} fill="red" />
              })}
              {this.state.UserToUser.map((el, i) => {
                return  <ForceGraphNode key={i+100} node={{id: el.to.username,}} fill="blue" />
              })}
              {this.state.UserToUser.map((el, i) => {
                return  <ForceGraphLink key={i+1000} link={{ source: el.to.username, target: el.from.username,}} />
              })}
            </ForceGraph>
          </div>
        </div>
      )
    }
  }

  giveDistribution(){
    const colours = ['#440154FF', '#481B6DFF', '#46337EFF', '#3F4889FF', '#365C8DFF',
      '#2E6E8EFF', '#277F8EFF', '#21908CFF', '#1FA187FF', '#2DB27DFF', '#4AC16DFF',
      '#71CF57FF', '#9FDA3AFF', '#CFE11CFF', '#FDE725FF',]
    return this.state.UserToUser.reduce((acc, el, i) => {
      acc.push({ value: el.amount, key: el._id, color: colours[Math.round(i*1.5)],})
      return acc;
    }, [])
  }

  sumAdminExpense(typeOfTransaction){
    if(typeOfTransaction){
      return typeOfTransaction.reduce((acc, el) => {
        return acc + el.amount
      }, 0)
    }
  }

  render() {
    console.log('this', this.state)
    if (this.state.loaded) {
      return (
        <div>
          {this.popUp()}
          {/* {this.popUp('Filter Rec', 'popperRec')}
          {this.popUp('Filter Date', 'popperDate')} */}
          <div className="Admin-WalletContainer">

            {/* <div className="PannelContainer">
              <div className="PannelProfileInfo">
                <div className="UserProfilePicture">
                  <img className="UserProfileImage" alt="" src={this.state.accountInfo.userInformation.profilePic}/>
                </div>
                <div className="UserProfileName">{this.state.accountInfo.userInformation.username}</div>
              </div>
              <div className="PannelToolBar"></div>
            </div> */}
            <div className="Admin-DashContainer">
              <div className="Admin-HeaderContainer">
                <div className="Admin-TitleOfPage">Zen flow</div>
                <Close link="/panel"/>
              </div>
              <div className="Admin-SummaryContainer">
                <div className="Admin-SummaryDivider">
                  {/* <div className="pie4you">your overview within company</div> */}
                  <div className="Admin-SummaryDividerPie">
                    <div className="Admin-profileInfo">
                      <div className="Admin-UserProfilePicture">
                        <img className="Admin-UserProfileImage" alt="" src={this.state.adminDetails.profilePic}/>
                      </div>
                      <div className="Admin-UserProfileName">{this.state.adminDetails.username}</div>
                    </div>
                    <div className="Admin-Dashboard">
                      <div
                        onClick={() => {
                          this.setState({
                            DisplayUserToUser: true,
                            DisplayAdminExpense: false,
                            DisplayUserSpent: false,
                          })
                        }}
                        className="Transaction-Type">
                        <div className="FloatBox">
                          <div> user flow</div>
                          <img alt="" className="FloatBoxPic" src={require('./../../assets/userFlow.svg')}/>
                        </div>
                      </div>
                      <div
                        onClick={async () => {
                          await this.setState({
                            DisplayUserToUser: false,
                            DisplayAdminExpense: false,
                            DisplayUserSpent: true,
                          })
                          this.child.getMounted()
                        }}
                        className="Transaction-Type">
                        <div className="FloatBox">
                          <div> spent box</div>
                          <img alt="" className="FloatBoxPic" src={require('./../../assets/userSpent.svg')}/>
                        </div>
                      </div>
                      <div
                        onClick={async () => {
                          await this.setState({
                            DisplayUserToUser: false,
                            DisplayAdminExpense: true,
                            DisplayUserSpent: false,
                          })
                          this.child.getMounted()
                        }}
                        className="Transaction-Type">
                        <div className="FloatBox">
                          <div> Admin </div>
                          <img alt="" className="FloatBoxPic" src={require('./../../assets/adminBallence.svg')}/>
                        </div>
                      </div>
                      <div className="Transaction-Type"
                        onClick={async () => {
                          await this.setState({
                            popperRec: true,
                          })
                        }}>
                        <div className="FloatBox">
                          <div> network</div>
                          <img alt="" className="FloatBoxPic" src={require('./../../assets/networkAdmin.svg')}/>
                        </div>
                      </div>
                    </div>
                    {/* <PieChart className="Admin-PercentSpent"
                      startAngle={270}
                      radius={50}
                      lineWidth={20}
                      paddingAngle={3}
                      animationDuration={3000}
                      animate={true}
                      data={[
                        { value: this.state.accountInfo.yourTotalGiven, key: 1, color: 'black',},
                        { value: this.state.accountInfo.compTotalGiven, key: 2, color: '#CDCDCD',},]}
                    >
                      <div className="Admin-PerSpentText">
                        <div className="Admin-SpentTitle">YOUR GIVEN</div>
                        <div className="Admin-SpentPer">{
                          (Math.round(this.state.accountInfo.yourTotalGiven/
                            this.state.accountInfo.compTotalGiven*1000)/10)
                        }%</div>
                      </div>
                    </PieChart> */}
                    <PieChart className="Admin-PercentSpent"
                      startAngle={0}
                      radius={50}
                      lineWidth={20}
                      paddingAngle={3}
                      animationDuration={2000}
                      // rounded={true}
                      animate={true}
                      data={this.giveDistribution()}
                    >
                      <div className="Admin-PerRecivedText">
                        <div className="Admin-SpentTitle">GIVENS</div>
                        <div className="Admin-SpentPer">{"vag"}</div>
                      </div>
                    </PieChart>
                  </div>
                </div>
                <div className="Admin-SummaryDividerTot">
                  <div className="Admin-TotSumTitle">
                    <div className="Admin-ZenFlowLabel">month-zen-flow</div>
                  </div>
                  <div className="Admin-TotSumIn">
                    <div className="Admin-ZenInLab">User Zen Flow</div>
                    <div className="Admin-ZenInNum">{this.sumAdminExpense(this.state.UserToUser)}</div>
                  </div>
                  <div className="Admin-TotSumIn">
                    <div className="Admin-ZenInLab">User Zen Spent</div>
                    <div className="Admin-ZenInNum">{this.sumAdminExpense(this.state.UserSpent)}</div>
                  </div>
                  <div className="Admin-TotSumIn">
                    <div className="Admin-ZenInLab">Admin Zen Spent</div>
                    <div className="Admin-ZenInNum">{this.sumAdminExpense(this.state.AdminExpense)}</div>
                  </div>
                </div>
              </div>
              {this.AdminExpenseTransactionList('toBallence', 'amount', 'fromBalence')}
              {this.UserToUserTransactionList()}
              {/* {this.UserSpentTransactionList()} */}
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




export default (Ledger);
