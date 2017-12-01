import React, { Component, } from 'react';
import PieChart from 'react-minimal-pie-chart';
import './Ledger.css'
import Loader from './../../components/Loader/Loader'
import Close from '../../components/Close/Close';
import AdminExpenseSheet from '../../components/AdminExpenseSheet/AdminExpenseSheet';
import AdminUserToUserSheet from '../../components/AdminUserToUserSheet/AdminUserToUserSheet';
import DropDown from '../../components/DropDown/DropDown';

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


  UserToUserTransactionList(){
    if(this.state.DisplayUserToUser) {
      return <AdminUserToUserSheet UserToUser={this.state.UserToUser}/>
    }
  }

  AdminExpenseTransactionList(){
    if(this.state.DisplayAdminExpense) {
      return <AdminExpenseSheet AdminExpense={this.state.AdminExpense}/>
    }
  }

  UserSpentTransactionList(){
    if(this.state.DisplayUserSpent) {
      return this.state.UserSpent.map((el, i) => {
        return (
          <div key={el._id} className="Admin-TransactionItem">
            <div className="Admin-TransactionCol">
              <div className="Admin-TransactionPic">
                <img className="Admin-TranscationPicImg" alt="" src={el.from.profilePic}/>
              </div>
            </div>
            <div className="Admin-TransactionCol">
              <div>{el.from.username}</div>
            </div>
            <div className="Admin-TransactionCol">
              <div>{'--------'}</div>
            </div>
            <div className="Admin-TransactionCol">
              <div>{el.amount}</div>
            </div>
            <div className="Admin-TransactionCol">
              <div>{'--------'}</div>
            </div>
            <div className="Admin-TransactionCol">
              <div>{el.to.username}</div>
            </div>
            <div className="Admin-TransactionCol">
              <div className="Admin-TransactionPic">
                <img className="Admin-TranscationPicImg" alt="" src={el.to.profilePic}/>
              </div>
            </div>
          </div>
        )
      })
    }
  }

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

  popUp(title, popperType){
    // if(this.state[popperType]) {
    //   if(title === 'Filter Date'){
    //     return (
    //       <div className="Admin-popUp">
    //         <div className="Admin-PopUpBlock">
    //           <div className="Admin-FilterPopupHeader">
    //             <div className="Admin-FilterTitle">{title}</div>
    //           </div>
    //           <div  className="Admin-FilterPopupBody">
    //             <div className="Admin-FilterVal">
    //               <label className="Admin-FilterLabs">From: </label>
    //               <input ref={((el) => this.fromDate = el)} type="date"/>
    //             </div>
    //             <div className="Admin-FilterVal">
    //               <label className="Admin-FilterLabs">To: </label>
    //               <input ref={((el) => this.toDate = el)} type="date"/>
    //             </div>
    //           </div>
    //           <div  className="Admin-FilterPopupTail">
    //             <input onClick={() => {
    //               console.log(this.fromDate.value, this.toDate.value)
    //               this.filteringSpentForPanel(this.fromDate.value, this.toDate.value, popperType)
    //               this.setState({[popperType]: false,})
    //             }}
    //             className="Admin-PopupFilter" type="submit" value="Filter"
    //             />
    //             <input onClick={() => {
    //               this.setState({[popperType]: false,})
    //             }}
    //             className="Admin-PopupFilter" type="submit" value="Back"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   } else {
    //     return(
    //       <div className="Admin-popUp">
    //         <div className="Admin-PopUpBlock">
    //           <div className="Admin-FilterPopupHeader">
    //             <div className="Admin-FilterTitle">{title}</div>
    //           </div>
    //           <div className="Admin-FilterPopupBody">
    //             <div className="Admin-FilterVal">
    //               <label className="Admin-FilterLabs">Min: </label>
    //               <input ref={((el) => this.SpendMin = el)} placeholder={0} className="Admin-InputFilter" step={50} type="number"/>
    //             </div>
    //             <div className="FilterVal">
    //               <label className="Admin-FilterLabs">Max: </label>
    //               <input ref={((el) => this.SpendMax = el)} placeholder={500} className="Admin-InputFilter" step={50} type="number"/>
    //             </div>
    //           </div>
    //           <div className="Admin-FilterPopupTail">
    //             <input onClick={() => {
    //               this.filteringSpentForPanel(this.SpendMin.value, this.SpendMax.value, popperType)
    //               this.setState({[popperType]: false,})
    //             }}
    //             className="Admin-PopupFilter" type="submit" value="Filter"
    //             />
    //             <input onClick={() => {
    //               this.setState({[popperType]: false,})
    //             }}
    //             className="Admin-PopupFilter" type="submit" value="Back"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   }
    // }
  }

  render() {
    console.log('this', this.state)
    if (this.state.loaded) {
      return (
        <div>
          {this.popUp('Filter spent', 'popperSpent')}
          {this.popUp('Filter Rec', 'popperRec')}
          {this.popUp('Filter Date', 'popperDate')}
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
                        <div>User flow</div>
                      </div>
                      <div
                        onClick={() => {
                          this.setState({
                            DisplayUserToUser: false,
                            DisplayAdminExpense: false,
                            DisplayUserSpent: true,
                          })
                        }}
                        className="Transaction-Type">
                        <div>Spent</div>
                      </div>
                      <div
                        onClick={() => {
                          this.setState({
                            DisplayUserToUser: false,
                            DisplayAdminExpense: true,
                            DisplayUserSpent: false,
                          })
                        }}
                        className="Transaction-Type">
                        <div>Admin</div>
                      </div>
                      <div className="Transaction-Type">
                        <div>XXX</div>
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
                      animationDuration={3000}
                      // rounded={true}
                      animate={true}
                      data={[
                        { value: this.state.CompRecPer.ZenIn, key: 1, color: 'black',},
                        { value: this.state.CompRecPer.CompRec, key: 2, color: '#CDCDCD',},]}
                    >
                      <div className="Admin-PerRecivedText">
                        <div className="Admin-SpentTitle">YOUR RECEIVED</div>
                        <div className="Admin-SpentPer">{this.state.CompRecPer.UserPercentage}</div>
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
                    <div className="Admin-ZenInNum">{this.state.ZenFlowStats.ZenIn}</div>
                  </div>
                  <div className="Admin-TotSumIn" id="UnderLineElement">
                    <div className="Admin-ZenInLab">User Zen Spent</div>
                    <div className="Admin-ZenInNum">{this.state.ZenFlowStats.ZenOut}</div>
                  </div>
                  <div className="Admin-TotSumIn">
                    <div className="Admin-ZenInLab">Δ Zen</div>
                    <div className="Admin-ZenInNum" id="ZenLargeDelta">{this.state.ZenFlowStats.DZen}</div>
                  </div>
                </div>
              </div>

                {this.AdminExpenseTransactionList()}
                {this.UserToUserTransactionList()}
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
