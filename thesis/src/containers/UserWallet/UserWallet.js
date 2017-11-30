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
      if(i >= start && i <= end) {
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

  filteringSpentForPanel(min, max, popperType){
    let res;
    if(popperType === 'popperDate') {
      const whichCol = 'date'
      res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
        if(new Date(el[whichCol]) > new Date(min) && new Date(el[whichCol]) < new Date (max)) {
          acc.push(el);
          return acc
        } else {
          return acc
        }
      }, [])
    } else {
      let whichCol;
      popperType === 'popperSpent' ? (whichCol = 'spent') :  (whichCol = 'received')
      res = this.state.accountInfo.recentTransactions.reduce((acc,el, i) => {
        if(el[whichCol] > min && el[whichCol] < max) {
          acc.push(el);
          return acc
        } else {
          return acc
        }
      }, [])
    }
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
        this.companySpentStats();
        this.companyRecStats();
        this.filteringTransactionsForPanel(0, 14)
        this.filterUserNamesForSelection()
        this.setState({loaded: true,})
        this.totalNumberOfPagesNeeded()
      })
  }

  componentDidMount(){
    this.setState({token: window.localStorage.getItem('token'),})
    this.getInit();
  }

  incrementThePage(){
    if(this.state.pageNumber < this.state.pageTotal) {
      this.filteringTransactionsForPanel(14,29)
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber + 1,}))
    }
  }

  decrementThePage(){
    if (this.state.pageNumber > 1){
      this.filteringTransactionsForPanel(0,14)
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber - 1,}))
    }
  }

  pageTotal(col){
    if (this.state.transactionsToDisplay) {
      return this.state.transactionsToDisplay.reduce((acc, el) => {
        return acc + el[col]
      }, 0)
    }
  }

  totalNumberOfPagesNeeded(){
    const recTranLength = this.state.accountInfo.recentTransactions.length
    const nPagesRequired = Math.round(recTranLength/14)
    this.setState({pageTotal: nPagesRequired,})
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
    if(this.state.transactionsToDisplay) {
      return this.state.transactionsToDisplay.map((el, i) => {
        return (
          <div key={el._id} style={{backgroundColor: !!el.spent ? '#ededed' : 'white',}} className="TransactionItem">
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
              <div>{el.spent ? el.spent : '-'}</div>
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
      return el.spent ? ([acc[0] + el.spent, acc[1],]) : ([acc[0], el.received + acc[1],])
    }, [0,0,])
    this.setState({ZenFlowStats: {ZenOut: res[0], ZenIn: res[1], DZen: res[1] - res[0],},})
  }

  companySpentStats(){
    const user = this.state.ZenFlowStats.ZenOut;
    const comp = this.state.accountInfo.compTotalSpent;
    const prec = (Math.round((user/(user+comp)*100)*10)/10).toString() + '%';
    this.setState({CompSpentPer: {
      ZenOut: user,
      CompSpent: comp,
      UserPercentage: prec,},})
  }

  handleUserErase = (user) => {
    // this.props.func('')
    this.setState({selected: [],})
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

  popUp(title, popperType){
    if(this.state[popperType]) {
      if(title === 'Filter Date'){
        return (
          <div className="popUp">
            <div className="PopUpBlock">
              <div className="FilterPopupHeader">
                <div className="FilterTitle">{title}</div>
              </div>
              <div  className="FilterPopupBody">
                <div className="FilterVal">
                  <label className="FilterLabs">From: </label>
                  <input ref={((el) => this.fromDate = el)} type="date"/>
                </div>
                <div className="FilterVal">
                  <label className="FilterLabs">To: </label>
                  <input ref={((el) => this.toDate = el)} type="date"/>
                </div>
              </div>
              <div  className="FilterPopupTail">
                <input onClick={() => {
                  console.log(this.fromDate.value, this.toDate.value)
                  this.filteringSpentForPanel(this.fromDate.value, this.toDate.value, popperType)
                  this.setState({[popperType]: false,})
                }}
                className="PopupFilter" type="submit" value="Filter"
                />
                <input onClick={() => {
                  this.setState({[popperType]: false,})
                }}
                className="PopupFilter" type="submit" value="Back"
                />
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <div className="popUp">
            <div className="PopUpBlock">
              <div className="FilterPopupHeader">
                <div className="FilterTitle">{title}</div>
              </div>
              <div className="FilterPopupBody">
                <div className="FilterVal">
                  <label className="FilterLabs">Min: </label>
                  <input ref={((el) => this.SpendMin = el)} placeholder={0} className="InputFilter" step={50} type="number"/>
                </div>
                <div className="FilterVal">
                  <label className="FilterLabs">Max: </label>
                  <input ref={((el) => this.SpendMax = el)} placeholder={500} className="InputFilter" step={50} type="number"/>
                </div>
              </div>
              <div className="FilterPopupTail">
                <input onClick={() => {
                  this.filteringSpentForPanel(this.SpendMin.value, this.SpendMax.value, popperType)
                  this.setState({[popperType]: false,})
                }}
                className="PopupFilter" type="submit" value="Filter"
                />
                <input onClick={() => {
                  this.setState({[popperType]: false,})
                }}
                className="PopupFilter" type="submit" value="Back"
                />
              </div>
            </div>
          </div>
        )
      }
    }
  }

  render() {
    console.log('this', this.state)
    if (this.state.loaded) {
      return (
        <div>
          {this.popUp('Filter spent', 'popperSpent')}
          {this.popUp('Filter Rec', 'popperRec')}
          {this.popUp('Filter Date', 'popperDate')}
          <div className="WalletContainer">

            {/* <div className="PannelContainer">
              <div className="PannelProfileInfo">
                <div className="UserProfilePicture">
                  <img className="UserProfileImage" alt="" src={this.state.accountInfo.userInformation.profilePic}/>
                </div>
                <div className="UserProfileName">{this.state.accountInfo.userInformation.username}</div>
              </div>
              <div className="PannelToolBar"></div>
            </div> */}
            <div className="DashContainer">
              <div className="HeaderContainer">
                <div className="TitleOfPage">Zen Transaction Statement</div>
                <Close link="/panel"/>
              </div>
              <div className="SummaryContainer">
                <div className="SummaryDivider">
                  {/* <div className="pie4you">your overview within company</div> */}
                  <div className="SummaryDividerPie">
                    <div className="profileInfo">
                      <div className="UserProfilePicture">
                        <img className="UserProfileImage" alt="" src={this.state.accountInfo.userInformation.profilePic}/>
                      </div>
                      <div className="UserProfileName">{this.state.accountInfo.userInformation.username}</div>
                    </div>
                    <PieChart className="PercentSpent"
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
                      <div className="PerSpentText">
                        <div className="SpentTitle">YOUR GIVEN</div>
                        <div className="SpentPer">{
                          (Math.round(this.state.accountInfo.yourTotalGiven/
                            this.state.accountInfo.compTotalGiven*1000)/10)
                        }%</div>
                      </div>
                    </PieChart>
                    <PieChart className="PercentSpent"
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
                        <div className="SpentTitle">YOUR RECEIVED</div>
                        <div className="SpentPer">{this.state.CompRecPer.UserPercentage}</div>
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
                    <div className="ZenInLab">Zen Spent</div>
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
                    <input onClick={ () => {
                      this.setState({popperDate: true,})
                    }}
                    className="RemoveFilterButton" type="submit" value="filter date"
                    />
                  </div>
                  <div className="spacedivATM">
                    <input onClick={() => {
                      this.setState({popperSpent: true,})
                    }}
                    className="RemoveFilterButton" type="submit" value="filter spent"
                    />
                  </div>
                  <div className="spacedivATM">
                    <input onClick={ () => {
                      this.setState({popperRec: true,})
                    }}
                    className="RemoveFilterButton" type="submit" value="filter rec"
                    />
                  </div>
                  <div className="spacedivATM">
                    <input onClick={ () => {
                      this.filteringTransactionsForPanel(0,14)
                      this.handleUserErase()
                    }}
                    className="RemoveFilterButton" type="submit" value="All"
                    />
                  </div>

                </div>
                <div className="TransactionItemHeader">
                  <div className="TransactionTitle">User</div>
                  <div className="TransactionTitle">ID</div>
                  <div className="TransactionTitle">Date</div>
                  <div className="TransactionTitle">Spent</div>
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
                  <div className="TransactionTitle">{this.pageTotal('spent')}</div>
                  <div className="TransactionTitle">{this.pageTotal('received')}</div>
                  <div className="TransactionTitle"> Δ {this.pageTotal('received') - this.pageTotal('spent')} </div>
                </div>
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
