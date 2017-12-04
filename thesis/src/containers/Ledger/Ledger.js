import React, { Component, } from 'react';
import PieChart from 'react-minimal-pie-chart';
import './Ledger.css'
import Loader from './../../components/Loader/Loader'
import Close from '../../components/Close/Close';
import AdminExpenseSheet from '../../components/AdminExpenseSheet/AdminExpenseSheet';
import AdminUserToUserSheet from '../../components/AdminUserToUserSheet/AdminUserToUserSheet';
import {ForceGraph, ForceGraphNode, ForceGraphLink, } from 'react-vis-force';

class Ledger extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      token:  '',
      popperStat: false,
      adminDetails: null,
      UserToUser: [],
      DisplayUserToUser: false,
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

  UserToUserTransactionList(BallenceType){
    if(this.state.DisplayUserToUser) {
      return (
        <AdminUserToUserSheet
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
          AdminExpense={this.state.UserSpent}
        />
      )
    }
  }

  popUp(){
    if(this.state.popperStat) {
      return (
        <div className="Admin-popUp">
          <div className="Admin-PopUpBlock">
            <ForceGraph simulationOptions={{ animate: true, height: 700, width: 700,}}
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              {this.state.UserToUser.map((el, i) => {
                return  (
                  <ForceGraphNode
                    key={i}
                    node={{id: el.from.username, radius: el.amount/20,}}
                    fill='#FDE725FF' size={20}
                  />)
              })}
              {this.state.UserToUser.map((el, i) => {
                return  (
                  <ForceGraphNode
                    key={i+100}
                    node={{id: el.to.username, radius: el.amount/20,}}
                    fill='#481B6DFF'
                  />)
              })}
              {this.state.UserToUser.map((el, i) => {
                return  (
                  <ForceGraphLink
                    key={i+1000}
                    link={{ source: el.to.username, value: 10, target: el.from.username,}}
                  />)
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
          <div className="Admin-WalletContainer">
            <div className="Admin-DashContainer">
              <div className="Admin-HeaderContainer">
                <div className="Admin-TitleOfPage">Zen flow</div>
                <Close link="/panel"/>
              </div>
              <div className="Admin-SummaryContainer">
                <div className="Admin-SummaryDivider">
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
                        className="Transaction-Type"
                      >
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
                        className="Transaction-Type"
                      >
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
                        className="Transaction-Type"
                      >
                        <div className="FloatBox">
                          <div> Admin </div>
                          <img alt="" className="FloatBoxPic" src={require('./../../assets/adminBallence.svg')}/>
                        </div>
                      </div>
                      <div className="Transaction-Type"
                        onClick={async () => {
                          await this.setState({
                            popperStat: true,
                          })
                        }}
                      >
                        <div className="FloatBox">
                          <div> network</div>
                          <img alt="" className="FloatBoxPic" src={require('./../../assets/networkAdmin.svg')}/>
                        </div>
                      </div>
                    </div>
                    <PieChart className="Admin-PercentSpent"
                      startAngle={0}
                      radius={50}
                      lineWidth={20}
                      paddingAngle={3}
                      animationDuration={1000}
                      animate={true}
                      data={this.giveDistribution()}
                    >
                      <div className="Admin-PerRecivedText">
                        <div className="Admin-SpentTitle">GIVENS</div>
                        <div className="Admin-SpentPer">%</div>
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
