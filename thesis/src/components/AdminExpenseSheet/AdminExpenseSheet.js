import React, { Component, } from 'react';
import './AdminExpenseSheet.css'
import DropDown from '../DropDown/DropDown';
const popperType = 'popperSpent'



class AdminExpenseSheet extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: null,
      transactionsToDisplay: null,
      pageTotal: null,
      pageNumber: 1,
      userList: [],
      selected: '',
      popperSpent: false,
    }
  }



  addDataToState(data){
    this.setState({'data': data,})
  }

  totalNumberOfPagesNeeded(){
    const recTranLength = this.state.data.length
    console.log(recTranLength)
    const nPagesRequired = Math.floor(recTranLength/10) + 1;
    this.setState({pageTotal: nPagesRequired,})
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

  async getMounted(){
    await this.addDataToState(this.props.AdminExpense)
    await this.filteringTransactionsForPanel(0,9)
    await this.totalNumberOfPagesNeeded()
    await this.filterUserNamesForSelection()
  }

  handleUserSelection = (value) => {
    this.filteringNamesForPanel(value)
    this.setState({selected: value,})
  }


  filteringNamesForPanel(name){
    const res = this.state.data.reduce((acc,el, i) => {
      if(el.to.username === name) {
        acc.push(el);
        return acc
      } else {
        return acc
      }
    }, [])
    this.setState({transactionsToDisplay: res,})
  }


  filteringTransactionsForPanel(start, end){
    if(this.state.data) {
      const res = this.state.data.reduce((acc,el, i) => {
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

  filterUserNamesForSelection(){
    const userNameArr = []
    const res = this.state.data.reduce((acc,el, i) => {
      if(userNameArr.indexOf(el.to.username) === -1) {
        acc.push({img: el.to.profilePic, username: el.to.username, id: el.to.username,});
        userNameArr.push(el.to.username);
        return acc
      } else {
        return acc
      }
    }, [])
    this.setState({userList: res,})
  }


  handleUserErase = (user) => {
    this.setState({selected: [],})
  }

  renderingTheDropDown(){
    if(this.state.userList){
      return (<DropDown
        func={this.handleUserSelection.bind(this)}
        placeh="Filter reciever"
        arr={this.state.userList}
      />)
    }
  }

  AdminExpenseTransactionList(data, col1, col2){
    if(data){
      return data.map((el, i) => {
        return (
          <tr key={el._id} className="rowow"><td>{el.date}</td><td>{el.reason}</td><td>{el[this.props.trans].username}</td>
          <td>{el[col2]}</td><td>{el[col1]}</td></tr>
        )
      })
    }
  }


  incrementThePage(){
    if(this.state.pageNumber < this.state.pageTotal) {
      this.filteringTransactionsForPanel(10,19)
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber + 1,}))
    }
  }

  decrementThePage(){
    if (this.state.pageNumber > 1){
      this.filteringTransactionsForPanel(0,9)
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber - 1,}))
    }
  }

  pageTotal(data, col){
    if(this.state.data){
      return data.reduce((acc, el) => {
        return acc + el[col]
      }, 0)
    }
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
    }
    this.setState({transactionsToDisplay: res,})
  }

  render() {
    return (
      <div className="Admin-SheetContainer">
        <table className="main-table">
          <thead><tr><th>Date</th><th>Reason</th><th>User</th><th>Ammount</th><th>Balance</th></tr></thead>
        <tbody>
          {this.AdminExpenseTransactionList(this.state.transactionsToDisplay, this.props.col1, this.props.col2)}
        </tbody>
        <tfoot><tr><td className="da-button" onClick={() => {this.props.popperFilter()}}>Apply filter</td><td></td><td></td><td>{this.pageTotal(this.state.data, 'amount')}</td><td>{this.pageTotal(this.state.data, 'tobalance')}</td></tr></tfoot>
        </table>
        <div>{this.displayingNavigationPage()}</div>
      </div>
    )
  }
}

export default AdminExpenseSheet;
