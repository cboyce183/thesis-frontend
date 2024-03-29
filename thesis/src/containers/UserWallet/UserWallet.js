import React, { Component, } from 'react';
import PieChart from 'react-minimal-pie-chart';
import './UserWallet.css'
import Loader from './../../components/Loader/Loader'
import Close from '../../components/Close/Close';
import DropDown from '../../components/DropDown/DropDown';
import viridis from './../../assets/verdis.json'

class UserWallet extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      userTransactions: null,
      userSpentCompTotal: null,
      userToUserCompTotal: null,
      userInfo: null,
      ZenFlowStats: {ZenIn: '-', ZenOut: '-', DZen: '-',},
      CompSpentPer: {ZenOut: 100, CompSpent: 400, UserPercentage: '0%',},
      CompRecPer: {ZenIn: 100, CompRec: 100, UserPercentage: '50%',},
      transactionPage: [0, 14,],
      // transactionsToDisplay: null,
      userList: [],
      selected: '',
      pageNumber: 1,
      totalPages: 1,
      popperSpent: false,
      popperRec: false,
      popperDate: false,
      filter: null,
      filterpop: false,
    }
  }

  async getInit(){
    if (window.localStorage.getItem('token')) {
      await fetch('http://192.168.0.37:4200/company',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
        })
        .then(res => res.json())
        .then(res => {
          if (res.isAdmin) {
            this.setState({isAdmin:res.isAdmin, userInfo: res,});
          } else {

            this.setState({available: res.availableCurrency, received: res.receivedCurrency, userInfo: res,});
          }
        })
        .catch(e => console.error(e));


      fetch('http://192.168.0.37:4200/admin-transactions', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
      })
        .then(r => r.json())
        // .then(a =>         console.log("the response form teh db", a))
        .then(res => this.setState({
          userTransactions: res.recentTransactions.sort((a, b) =>  b.date - a.date),
          userSpentCompTotal: res.userSpentCompTotal,
          userToUserCompTotal: res.userToUserCompTotal,}))
        .then(async (update) => {
          // this.companySpentStats();
          // this.companyRecStats();
          await this.filteringTransactionsForPanel(0, 8)
          await this.filterUserNamesForSelection()
          await this.totalNumberOfPagesNeeded()
          await this.manageZenFlowStats()
          await this.setState({loaded: true,})
        })
    } else {
      window.location = '/';
    }
  }

  filteringTransactionsForPanel(start, end){
    const res = this.state.userTransactions.reduce((acc,el, i) => {
      if(i >= start && i <= end) {
        acc.push(el);
        return acc
      } else {
        return acc
      }
    }, [])
    this.setState({pageTransactions: res,})
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
    // this.setState({userTransactions: res,})
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
    // this.setState({userTransactions: res,})
  }



  componentDidMount(){
    this.getInit();
  }

  incrementThePage(){
    if(this.state.pageNumber < this.state.pageTotal) {
      this.filteringTransactionsForPanel(8,14)
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber + 1,}))
    }
  }

  decrementThePage(){
    if (this.state.pageNumber > 1){
      this.filteringTransactionsForPanel(0,7)
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber - 1,}))
    }
  }

  pageTotal(col){
    if (this.state.pageTransactions) {
      // return this.state.pageTransactions.reduce((acc, el) => {
      //   return acc + Number(el.amount)
      // }, 0)
      return "."
    }
  }

  totalNumberOfPagesNeeded(){
    if(this.state.userTransactions){
      const recTranLength = this.state.userTransactions.length
      const nPagesRequired = Math.round(recTranLength/9)
      this.setState({pageTotal: nPagesRequired,})
    }
  }

  displayingNavigationPage(){
    if(this.state.pageTotal  > 1) {
      return (
        <div className="TransactionNavigation">
          <div className="SheetBack"
            onClick={() => {
              this.decrementThePage()
            }}
          > &lt; </div>
          <div className="SheetNumber"> 1 - {this.state.pageTotal} </div>
          <div onClick={()=> {
            this.incrementThePage()
          }}
          className="SheetForward"
          > &gt;
          </div>
        </div>
      )
    }
  }


  transactionList(){
    if(this.state.pageTransactions && this.state.userInfo) {

      return this.state.pageTransactions.map((el, i) => {
        const bool1 = el.from.username ===  this.state.userInfo.username; // they gave
        const bool2 = el.to.username !==  null; // and they didn
        // console.log("bool1", bool1, el)
        return (
          <tr key={i} className="main-tr">
            <td>{((new Date(Number(el.date))).getDate())+'-'+((new Date(Number(el.date))).getMonth() + 1 )+'-'+((new Date(Number(el.date))).getFullYear())}</td>
            <td><img className="TranscationPicImg" alt="" src={
              bool1 ? el.to.profilePic : el.from.profilePic
            }/></td>
            <td>{
              bool1 ? (el.to.username ? el.to.username : 'admin' ): (el.from.username ? el.from.username : 'admin' )
            }</td>
            <td>{ bool1 && bool2 ? el.amount : '-'}</td>
            <td>{ !bool1 ? el.amount : '-'}</td>
            <td>{ bool1 && !bool2 ? el.amount : '-'}</td>
            <td>{ bool1 && !bool2 ? el.fromBalanceTokens : (!bool1 ? el.toBalanceTokens : '-') }</td>
            <td>{ bool1 && bool2 ? el.fromBalanceCredits : '-' }</td>
          </tr>
        )
      })
    }
  }

  async manageZenFlowStats(){
    // console.log(" enter the function ")
    if(this.state.userTransactions && this.state.userInfo) {
      // sum the recieved
      // console.log("zen stats")
      const recieved = await this.state.userTransactions.reduce((acc, el) => {
        // console.log("zen recived stats", el)
        const bool1 = el.from.username ===  this.state.userInfo.username; // they gave
        if( !bool1){
          console.log(" if statement", el.amount)
          return Number(el.amount) + acc
        } else {
          return acc;
        }
      }, 0)
      // sum the spent
      const spent = await this.state.userTransactions.reduce((acc, el) => {
        const bool1 = el.from.username ===  this.state.userInfo.username; // they gave
        const bool2 = el.to.username !==  null; // and they didn
        if( bool1 && !bool2 ){
          return Number(el.amount) + acc
        } else {
          return acc
        }
      }, 0)

      const given = await this.state.userTransactions.reduce((acc, el) => {
        const bool1 = el.from.username ===  this.state.userInfo.username; // they gave
        const bool2 = el.to.username !==  null; // and they didn
        if( bool1 && bool2  ){
          return Number(el.amount) + acc
        } else {
          return acc
        }
      }, 0)
      this.setState({ZenFlowStats: {Given: given , ZenOut: spent, ZenIn: recieved, DZen: recieved - spent,},})
    }
  }

  companySpentStats(){
    const user = this.state.ZenFlowStats.ZenOut;
    const comp = this.state.userSpentCompTotal;
    const prec = (Math.round((user/(user+comp)*100)*10)/10).toString() + '%';
    this.setState({CompSpentPer: {
      ZenOut: user,
      CompSpent: comp,
      UserPercentage: prec,},})
  }

  handleUserErase = (user) => {
    this.setState({selected: [],})
  }

  companyRecStats(){
    const user = this.state.ZenFlowStats.ZenIn;
    const comp = this.state.userToUserCompTotal;
    const prec = (Math.round((user/(comp+user)*100)*10)/10).toString() + '%';
    this.setState({CompRecPer: {
      ZenIn: user,
      CompRec: comp,
      UserPercentage: prec,},})
  }

  popUp(title, popperType){
    // if(this.state[popperType]) {
    //   if(title === 'Filter Date'){
    //     return (
    //       <div className="popUp">
    //         <div className="PopUpBlock">
    //           <div className="FilterPopupHeader">
    //             <div className="FilterTitle">{title}</div>
    //           </div>
    //           <div  className="FilterPopupBody">
    //             <div className="FilterVal">
    //               <label className="FilterLabs">From: </label>
    //               <input ref={((el) => this.fromDate = el)} type="date"/>
    //             </div>
    //             <div className="FilterVal">
    //               <label className="FilterLabs">To: </label>
    //               <input ref={((el) => this.toDate = el)} type="date"/>
    //             </div>
    //           </div>
    //           <div  className="FilterPopupTail">
    //             <input onClick={() => {
    //               console.log(this.fromDate.value, this.toDate.value)
    //               this.filteringSpentForPanel(this.fromDate.value, this.toDate.value, popperType)
    //               this.setState({[popperType]: false,})
    //             }}
    //             className="PopupFilter" type="submit" value="Filter"
    //             />
    //             <input onClick={() => {
    //               this.setState({[popperType]: false,})
    //             }}
    //             className="PopupFilter" type="submit" value="Back"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   } else {
    //     return(
    //       <div className="popUp">
    //         <div className="PopUpBlock">
    //           <div className="FilterPopupHeader">
    //             <div className="FilterTitle">{title}</div>
    //           </div>
    //           <div className="FilterPopupBody">
    //             <div className="FilterVal">
    //               <label className="FilterLabs">Min: </label>
    //               <input ref={((el) => this.SpendMin = el)} placeholder={0} className="InputFilter" step={50} type="number"/>
    //             </div>
    //             <div className="FilterVal">
    //               <label className="FilterLabs">Max: </label>
    //               <input ref={((el) => this.SpendMax = el)} placeholder={500} className="InputFilter" step={50} type="number"/>
    //             </div>
    //           </div>
    //           <div className="FilterPopupTail">
    //             <input onClick={() => {
    //               this.filteringSpentForPanel(this.SpendMin.value, this.SpendMax.value, popperType)
    //               this.setState({[popperType]: false,})
    //             }}
    //             className="PopupFilter" type="submit" value="Filter"
    //             />
    //             <input onClick={() => {
    //               this.setState({[popperType]: false,})
    //             }}
    //             className="PopupFilter" type="submit" value="Back"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   }
    // }
  }
  applyFilter = () => {
    // switch (this.state.filter) {
    // case 'date':
    //   return (
    //     <input onClick={ () => {
    //       this.setState({popperDate: true,})
    //     }}
    //     className="RemoveFilterButton" type="submit" value="by date"
    //     />
    //   );
    // case 'received':
    //   return (
    //     <input onClick={ () => {
    //       this.setState({popperRec: true,})
    //     }}
    //     className="RemoveFilterButton" type="submit" value="by received"
    //     />
    //   );
    // case 'spent':
    //   return (
    //     <input onClick={ () => {
    //       this.setState({popperSpent: true,})
    //     }}
    //     className="RemoveFilterButton" type="submit" value="by spent"
    //     />
    //   );
    // default:
    //   return (
    //     <div onClick={this.toggleFilter}>
    //       {this.renderFilter()}
    //     </div>
    //   );
    // }
  }
  toggleFilter = () => {
    // this.setState({ filterpop: !this.state.filterpop,})
  }
  renderFilter = () => {
    // if (!this.state.filterpop) return ( <div className="popdownsr">filter</div> );
    // return (
    //   <div className="popdown">
    //     <div className="popdownjr" onClick={() => this.setState({popperDate:true,})}>Date</div>
    //     <div className="popdownjr" onClick={() => this.setState({popperRec:true,})}>Zen received</div>
    //     <div className="popdownjr" onClick={() => this.setState({popperSpent:true,})}>Zen given</div>
    //     <div className="popdownjr" onClick={() => this.filteringTransactionsForPanel(0,14)}>Reset</div>
    //   </div>
    // );
  }
  render() {
    console.log('the state', this.state)
    if (this.state.loaded) {
      return (
        <div className="WalletWrapper">
          {this.popUp('Filter spent', 'popperSpent')}
          {this.popUp('Filter Rec', 'popperRec')}
          {this.popUp('Filter Date', 'popperDate')}
          <div className="WalletContainer">
            <div className="DashContainer">
              <div className="HeaderContainer">
                <div className="TitleOfPage">History</div>
                <Close link="/panel"/>
              </div>
              <div className="SummaryContainer">
                <div className="SummaryDivider">
                  <div className="SummaryDividerPie">
                    <div style={{display:'flex'}}>
                      <PieChart className="PercentSpent pie1"
                        startAngle={0}
                        radius={50}
                        lineWidth={30}
                        paddingAngle={3}
                        animationDuration={2000}
                        animate={true}
                        data={[
                          { value:  this.state.userToUserCompTotal - this.state.ZenFlowStats.Given, key: 1, color: viridis[0],},
                          { value: this.state.ZenFlowStats.Given, key: 2, color: viridis[50],},
                        ]}
                      >
                        <div className="PerSpentText">
                          <div className="SpentTitle">GIVEN</div>
                          <div className="SpentPer">{
                            (Math.round(this.state.ZenFlowStats.Given/
                              (this.state.userToUserCompTotal)*1000)/10)
                          }%</div>
                        </div>
                      </PieChart>
                      <PieChart className="PercentSpent pie1"
                        startAngle={0}
                        radius={50}
                        lineWidth={30}
                        paddingAngle={3}
                        animationDuration={2000}
                        animate={true}
                        data={[
                          { value:  this.state.userToUserCompTotal - this.state.ZenFlowStats.ZenIn, key: 1, color: viridis[44],},
                          { value: this.state.ZenFlowStats.ZenIn, key: 2, color: viridis[88],},
                        ]}
                      >
                        <div className="PerSpentText">
                          <div className="SpentTitle">RECIEVED</div>
                          <div className="SpentPer">{
                            (Math.round(this.state.ZenFlowStats.ZenIn/
                              (this.state.userToUserCompTotal)*1000)/10)
                          }%</div>
                        </div>
                      </PieChart>
                      <PieChart className="PercentSpent pie2"
                        startAngle={0}
                        radius={50}
                        lineWidth={30}
                        paddingAngle={3}
                        animationDuration={2000}
                        animate={true}
                        data={[
                          { value: this.state.userSpentCompTotal - this.state.ZenFlowStats.ZenOut, key: 1, color: viridis[99],},
                          { value: this.state.ZenFlowStats.ZenOut, key: 2, color: viridis[66],},]}
                      >
                        <div className="PerRecivedText">
                          <div className="SpentTitle">SPENT</div>
                          <div className="SpentPer">{
                            (Math.round(this.state.ZenFlowStats.ZenOut/
                                (this.state.userSpentCompTotal)*1000)/10)
                          } % </div>
                        </div>
                      </PieChart>
                    </div>
                  </div>
                </div>
                <div className="SummaryDividerTot">
                  <div className="TotSumIn">
                    <div className="ZenInLab">Received</div>
                    <div className="ZenInNum">{this.state.ZenFlowStats.ZenIn}</div>
                  </div>
                  <div className="TotSumIn" id="UnderLineElement">
                    <div className="ZenInLab">Spent</div>
                    <div className="ZenInNum">{this.state.ZenFlowStats.ZenOut}</div>
                  </div>
                  <div className="TotSumIn">
                    <div className="ZenInLab">remaining</div>
                    <div className="ZenInNum" id="ZenLargeDelta">{this.state.ZenFlowStats.DZen}</div>
                  </div>
                </div>
              </div>
              <div className="SheetContainer-wallet">
                <div className="BalenceHeader">
                  <div className="DropDownDiv">
                    <DropDown
                      func={this.handleUserSelection.bind(this)}
                      placeh="Filter people"
                      arr={this.state.userList}
                    />
                  </div>
                  <div className="spacedivATM">
                  {this.applyFilter()}
                  </div>
                </div>

                <table className="main-table">
                    <thead className="main-thead"><tr className="main-tr"><th className="main-th">date</th><th className="main-th">user</th><th className="main-th">id</th><th className="main-th">given</th><th className="main-th">received</th><th className="main-th">spent</th><th className="main-th">net token</th><th className="main-th">net credit</th></tr></thead>
                    <tbody className="main-tbody">
                     {this.transactionList()}
                    </tbody>
                    <tfoot className="main-tfoot"><tr className="main-tr"><th className="main-th"></th><th className="main-th"></th><th className="main-th"></th><th className="main-th">{this.pageTotal('spent')}</th><th className="main-th">{this.pageTotal('received')}</th><th className="main-th">{this.pageTotal('received')}</th></tr></tfoot>
                </table>
                <div className="TransactionOverflowBox">
                  {this.displayingNavigationPage()}
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
