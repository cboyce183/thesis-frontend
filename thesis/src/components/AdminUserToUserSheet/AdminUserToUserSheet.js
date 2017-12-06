import React, { Component, } from 'react';

import '../../App.css';
// import { pageTotal, } from './../../functions/AdminFilterFunctions'

class AdminUserToUserSheet extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null,
      popperFilter: false,
      filteredTransactions: null,
      transactionsToDisplay: null,
      pageTotal: null,
      pageNumber: 1,
      transIncrement: [0,9,],
      userList: [],
      selected: '',
      popperSpent: false,
      parametersForFiltering: {
        date: {from: null, to: null,},
        amount: {min: null, max: null,},
      },
    }
  }

  addDataToState(data){
    this.setState({'data': data,})
  }

  filteringTransactionsForPanel(data, start, end){
    if(data) {
      const res = data.reduce((acc,el, i) => {
        if(i >= start && i <= end) {
          acc.push(el);
          return acc
        } else {
          return acc
        }
      }, [])
      this.setState({transactionsToDisplay: res,})
    }
  }


  async componentDidMount(){
    await this.addDataToState(this.props.UserToUser)
    await this.filteringTransactionsForPanel(
      this.state.data,
      this.state.transIncrement[0],
      this.state.transIncrement[1])
    await this.totalNumberOfPagesNeeded(this.state.data)
    this.filterUserNamesForSelection('from')
    this.filterUserNamesForSelection('to')
  }

  async incrementThePage(){
    if(this.state.pageNumber < this.state.pageTotal) {
      await this.setState((prevState, props) => ({
        transIncrement: [
          prevState.transIncrement[0] + 10,
          prevState.transIncrement[1] + 10,],
      }))
      if(this.state.filteredTransactions) {
        this.filteringTransactionsForPanel(
          this.state.filteredTransactions,
          this.state.transIncrement[0],
          this.state.transIncrement[1])
        this.setState((prevState, props) => ({pageNumber: prevState.pageNumber + 1,}))
      }
      else {
        this.filteringTransactionsForPanel(
          this.state.data,
          this.state.transIncrement[0],
          this.state.transIncrement[1])
        this.setState((prevState, props) => ({pageNumber: prevState.pageNumber + 1,}))
      }
    }
  }

  async decrementThePage(){
    if (this.state.pageNumber > 1){
      await this.setState((prevState, props) => ({
        transIncrement: [
          prevState.transIncrement[0] - 10,
          prevState.transIncrement[1] - 10,],
      }))
      if(this.state.filteredTransactions) {
        this.filteringTransactionsForPanel(
          this.state.filteredTransactions,
          this.state.transIncrement[0],
          this.state.transIncrement[1])
        this.setState((prevState, props) => ({pageNumber: prevState.pageNumber - 1,}))
      }
      else {this.filteringTransactionsForPanel(
        this.state.data,
        this.state.transIncrement[0],
        this.state.transIncrement[1])
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber - 1,}))}
    }
  }

  async passingFilteringValues(){
    await this.setState({parametersForFiltering: this.props.parametersForFiltering,})
    await this.filterAmountDateGiverReciever(this.state.data)
    // await this.totalNumberOfPagesNeeded(this.state.transactionsToDisplay)
    // this.setState({pageNumber: 1, transIncrement: [0,9,],})
  }

  filterUserNamesForSelection(flowDirection){
    const userNameArr = []
    const res = this.state.data.reduce((acc,el, i) => {
      if(userNameArr.indexOf(el[flowDirection].username) === -1) {
        acc.push({img: el[flowDirection].profilePic, username: el[flowDirection].username, id: el[flowDirection].userid,},);
        userNameArr.push(el[flowDirection].username);
        return acc
      } else {
        return acc
      }
    }, [])
    this.setState({['user'+ flowDirection + 'List']: res,})
  }

  async filterAmountDateGiverReciever(data){
    const filterObj = await this.state.parametersForFiltering;

    const res = await data.reduce((acc, el) => {
      // console.log(filterObj.userGiv.username, "======", el.from.username )
      if(
        /// filter by amount
        el.amount <= Number(filterObj.amount.max) && el.amount >= Number(filterObj.amount.min) &&
        /// filter by date
        new Date(el.date) >= new Date(filterObj.date.from)  && new Date(el.date) <= new Date (filterObj.date.to) &&
        /// for the usernames
        (!filterObj.userGiv ? true : (el.from.username === filterObj.userGiv.username)) &&
        (!filterObj.userRec ? true : (el.to.username === filterObj.userRec.username))
      ) {
        acc.push(el);
        return acc;
      } else {
        return acc;
      }
    }, [])
    await this.setState({filteredTransactions: res,})
    await this.setState({pageNumber: 1,
      transIncrement: [0,9,],})
    await this.totalNumberOfPagesNeeded(this.state.filteredTransactions)
    await this.filteringTransactionsForPanel(
      this.state.filteredTransactions,
      this.state.transIncrement[0],
      this.state.transIncrement[1])
  }


  displayingNavigationPage(){
    if(this.state.pageTotal  > 1) {
      return (
        <div className="Admin-TransactionNavigation">
          <div className="Admin-SheetBack"
            onClick={() => {
              this.decrementThePage()
            }}
          > &lt; </div>
          <div className="Admin-SheetNumber">
            <div className="Admin-PagePossNumber"> {this.state.pageNumber} </div>
          </div>
          <div onClick={()=> {
            this.incrementThePage()
          }}
          className="Admin-SheetForward"
          > &gt;
          </div>
        </div>
      )
    }
  }

  totalNumberOfPagesNeeded(data){
    const recTranLength = data.length
    const nPagesRequired = Math.floor(recTranLength/11) + 1;
    this.setState({pageTotal: nPagesRequired,})
  }



  UserToUserTransactionList(data){
    if(data){
      return data.map((el, i) => {
        return (
          <tr key={el.date}><td>{(new Date(Number(el.date))).toString()}</td><td>{el.reason}</td><td>{el.from.username}</td><td>{el.to.username}</td><td>{Number(el.amount)}</td></tr>
        )
      })
    }
  }

  pageTotal(data, col){
    if(this.state.data){
      return data.reduce((acc, el) => {
        return acc + Number(el[col])
      }, 0)
    }
  }

  applyFilter = () => {
    this.props.popperFilter();
  }
  resetFilter = () => {
    this.filteringTransactionsForPanel(this.state.data,0, 9);
    this.setState({pageNumber: 1,
      transIncrement: [0,9,],});
    this.totalNumberOfPagesNeeded(this.state.data);
    this.setState({filteredTransactions: null,});
  }
  render() {
    return (
      <div className="Admin-SheetContainer">
        <table className="main-table">
          <thead className="main-thead">
            <tr className="main-tr">
            <th className="main-th">Date</th><th className="main-th">Reason</th> <th className="main-th">Giver</th> <th className="main-th">Recipient</th> <th className="main-th">Amount</th>
            </tr>
          </thead>
          <tbody className="main-tbody">
             {this.UserToUserTransactionList(this.state.transactionsToDisplay)}
          </tbody>
          <tfoot className="main-tfoot">
            <tr className="main-tr">
            <td className="da-button" onClick={this.applyFilter}>Filter</td> <td className="da-button" onClick={this.resetFilter}>Reset</td> <td></td> <td></td> <td>Total: {this.pageTotal(this.state.data, 'amount')}</td>
            </tr>
          </tfoot>
        </table>
        <div className="Admin-TransactionOverflowBox">
          {this.displayingNavigationPage()}
        </div>
      </div>
    )
  }
}

export default AdminUserToUserSheet;
