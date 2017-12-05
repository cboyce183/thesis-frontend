import React, { Component, } from 'react';
import PieChart from 'react-minimal-pie-chart';
import './Ledger.css'
import Loader from './../../components/Loader/Loader'
import Close from '../../components/Close/Close';
import AdminExpenseSheet from '../../components/AdminExpenseSheet/AdminExpenseSheet';
import AdminUserToUserSheet from '../../components/AdminUserToUserSheet/AdminUserToUserSheet';
import {ForceGraph, ForceGraphNode, ForceGraphLink, } from 'react-vis-force';
import DropDown from '../../components/DropDown/DropDown';
import viridis from './../../assets/verdis.json'


class Ledger extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      popperFilter: false,
      token:  '',
      popperStat: false,
      adminDetails: null,
      UserToUser: [],
      DisplayUserToUser: false,
      AdminExpense: [],
      DisplayAdminExpense: false,
      UserSpent: [],
      DisplayUserSpent: false,
      parametersForFiltering: {
        date: {from: null, to: null,},
        amount: {min: null, max: null,},
        userGiver: null,
        userReciever: null,
      },
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

  getInit(){
    fetch('https://private-3a61ed-zendama.apiary-mock.com/admin-transactions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
    })
      .then(r => r.json())
      .then(res => {
        this.setState({adminDetails: res.adminDetails,})
        this.setState({loaded: true,})
        this.filteringTypesOfTransactions(res)
        this.setState({DisplayUserToUser: true,})
      })
  }

  componentDidMount(){
    this.getInit();
  }


  passingThePopper = () => {
    this.setState({popperFilter: true,})
  }

  UserToUserTransactionList(BallenceType){
    if(this.state.DisplayUserToUser) {
      return (
        <AdminUserToUserSheet
          ref={(el) => this.AdminUserToUserSheet = el}
          parametersForFiltering={this.state.parametersForFiltering}
          popperFilter={this.passingThePopper}
          UserToUser={this.state.UserToUser}
        />
      )
    }
  }

  AdminExpenseTransactionList(col2, col1, col3){
    if(this.state.DisplayAdminExpense) {
      return (
        <AdminExpenseSheet
          ref={el => this.child = el}
          col2={col2}
          col1={col1}
          trans={'to'}
          popperFilter={this.passingThePopper}
          AdminExpense={this.state.AdminExpense}
        />
      )
    }
    if(this.state.DisplayUserSpent) {
      return (
        <AdminExpenseSheet
          ref={el => this.child = el}
          col2={col1}
          col1={col2}
          trans={'from'}
          popperFilter={this.passingThePopper}
          AdminExpense={this.state.UserSpent}
        />
      )
    }
  }

  popUp(){
    if(this.state.popperStat) {

      const result = this.state.UserToUser.reduce((acc, el) => {
        acc.push({
          userA: el.from.username,
          userB: el.to.username,
          dptA: el.from.department,
          dptB: el.to.department,
          amount: el.amount,})
        return acc;
      }, [])
      return (
        <div className="Admin-popUp">
          <div className="Admin-PopUpBlock" onClick={()=> this.setState({popperStat: false,})}>
            <ForceGraph simulationOptions={{ animate: true, height: 700, width: 700,}}
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              {result.map((el, i) => {
                return  (
                  <ForceGraphNode
                    key={i}
                    node={{id: el.userA, radius: 10,}}
                    fill={el.dptA === 'seniour' ? '#FDE725FF' : '#481B6DFF'}
                  />)
              })}
              {result.map((el, i) => {
                return  (
                  <ForceGraphNode
                    key={i+100}
                    node={{id: el.userB, radius: 10,}}
                    fill={el.dptB === 'seniour' ? '#FDE725FF' : '#481B6DFF'}
                  />)
              })}
              {result.map((el, i) => {
                return  (
                  <ForceGraphLink
                    key={i+1000}
                    link={{ source: el.userA, value: el.amount, target: el.userB,}}
                  />)
              })}
            </ForceGraph>
          </div>
        </div>
      )
    }
  }

  handleUserSelection = (value) => {
    this.setState({selectedFrom: value,})
  }

  waitDropDownGiver(){
    if(this.AdminUserToUserSheet){
      return (
        <div className="DropDownName" style={{zIndex: 99,}}>
          <DropDown
            ref={(el) => this.userGive = el}
            func={this.handleUserSelection.bind(this)}
            placeh= {'Filter givers'}
            arr={this.AdminUserToUserSheet.state.userfromList
            }
          />
        </div>
      )
    }
  }

  waitDropDownReciever(bool){
    if(this.AdminUserToUserSheet){
      return (
        <div className="DropDownName" style={{zIndex: 1,}}>
          <DropDown
            ref={(el) => this.userRec = el}
            func={this.handleUserSelection.bind(this)}
            placeh= {'Filter reciever'}
            arr={this.AdminUserToUserSheet.state.usertoList}
          />
        </div>
      )
    }
  }

  filterPopUp(){
    if(this.state.popperFilter) {
      return (
        <div className="Admin-popUp">
          <div className="Admin-PopUpBlock">
            <div className="AdminFiltercontain">
              <h3> Filter </h3>
            </div>
            <div className="AdminFiltercontain">
              <h5> Date </h5>
              <label>From:</label>
              <input ref={((el) => this.fromDate = el)} type='date'/>
              <label>To:</label>
              <input ref={((el) => this.toDate = el)} type='date'/>
            </div>
            <div className="AdminFiltercontain">
              <h5> Amount </h5>
              <label>min:</label>
              <input
                ref={(el) => this.minAmount = el}
                type="number"
                placeholder={0}
                className="InputFilter"
                step={50}
              />
              <label>max:</label>
              <input
                ref={(el) => this.maxAmount = el}
                type="number"
                placeholder={500}
                className="InputFilter"
                step={50}
              />
            </div>
            <div className="AdminFiltercontain">
              <h5>Givers</h5>
              {this.waitDropDownGiver()}
            </div>
            <div className="AdminFiltercontain">
              <h5>Recievers</h5>
              {this.waitDropDownReciever()}
            </div>
            <div className="AdminFiltercontain">
              <input onClick={ () => {
                this.setState({popperFilter: false,})
              }}
              type="submit" value="back"
              />
              <input onClick={async () => {
                await this.setState({parametersForFiltering: {
                  date: {
                    from: this.fromDate.value === '' ? '1-1-1970' : this.fromDate.value,
                    to: this.toDate.value === '' ?  '1-1-2999' : this.toDate.value,
                  },
                  amount: {
                    min: this.minAmount.value === '' ? 0 : this.minAmount.value,
                    max: this.maxAmount.value === '' ? 99999 : this.maxAmount.value,
                  },
                  userRec: this.userRec.state.selected[0],
                  userGiv: this.userGive.state.selected[0],
                },})
                await this.AdminUserToUserSheet.passingFilteringValues()
                this.setState({popperFilter: false,})
              }}
              type="submit" value="filter"
              />
            </div>
          </div>
        </div>
      )
    }
  }

  giveDistribution(){
    const colours = viridis;
    const larr = this.state.UserToUser.length;
    const n = colours.length/larr;
    return this.state.UserToUser.reduce((acc, el, i) => {
      acc.push({ value: el.amount, key: el._id, color: colours[Math.round(i*n)],})
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
    if (this.state.loaded) {
      return (
        <div style={{display:'flex'}}>
          {this.popUp()}
          {this.filterPopUp()}
          <div style={{width:'auto', height:'100vh'}} className="nav-full-h">
              <div
                onClick={() => {
                  this.setState({
                    DisplayUserToUser: true,
                    DisplayAdminExpense: false,
                    DisplayUserSpent: false,
                  })
                }}
                className="Transaction-Type"
                style={{marginTop:'50px'}}
              >
              User Transactions
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
                className="Transaction-Type"
              >
              Purchase Requests
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
                className="Transaction-Type"
              >
              Admin Transactions
              </div>
              <div className="Transaction-Type"
                onClick={async () => {
                  await this.setState({
                    popperStat: true,
                  })
                }}
              >
              Economy
              </div>
          </div>

          <div className="Admin-WalletContainer">
            <div className="Admin-DashContainer">
              <div className="Admin-HeaderContainer" style={{display:'flex', flexFlow:'row',justifyContent:'space-between', marginBottom:'20px'}}>
                <div style={{display:'flex'}}>
                <img className="Admin-UserProfileImage" alt="" src={this.state.adminDetails.profilePic} style={{height:'40px',width:'40px', borderRadius:'50%', marginRight:'50px'}}/>
                <div className="Admin-TitleOfPage">Admin Dashboard</div>
                </div>
                <Close link="/panel"/>
              </div>
              <div className="Admin-SummaryContainer">
                    <PieChart className="Admin-PercentSpent"
                      startAngle={0}
                      radius={50}
                      lineWidth={30}
                      paddingAngle={2}
                      animationDuration={1000}
                      animate={true}
                      data={this.giveDistribution()}
                    >
                      <div className="Admin-PerRecivedText">
                        <div className="Admin-SpentTitle">User Activity</div>
                        <div className="Admin-SpentPer">%</div>
                      </div>
                    </PieChart>
                <div className="Admin-SummaryDividerTot">
                  <div className="Admin-TotSumIn">
                    <div className="Admin-ZenInLab">User Net Flow</div>
                    <div className="Admin-ZenInNum">{this.sumAdminExpense(this.state.UserToUser)}</div>
                  </div>
                  <div className="Admin-TotSumIn">
                    <div className="Admin-ZenInLab">User Expenses</div>
                    <div className="Admin-ZenInNum">{this.sumAdminExpense(this.state.UserSpent)}</div>
                  </div>
                  <div className="Admin-TotSumIn">
                    <div className="Admin-ZenInLab">Admin Expenses</div>
                    <div className="Admin-ZenInNum">{this.sumAdminExpense(this.state.AdminExpense)}</div>
                  </div>
                </div>
              </div>
              
              {this.AdminExpenseTransactionList('toBallence', 'amount', 'fromBalence')}
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
