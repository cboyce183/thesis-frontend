import React, { Component, } from 'react';
import './AdminExpenseSheet.css'
import DropDown from '../DropDown/DropDown';

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
          <div className="Admin-SheetNumber"> 1 - {this.state.pageTotal} </div>
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
      console.log(el.to.username, "=======", name)
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
          <div key={el._id} className="AX-Admin-TransactionItem">
            <div className="AX-date">{el.date}</div>
            <div className="AX-TransData">
              <div className="AX-Admin-TransactionCol">
                <div>{el.reason}</div>
              </div>
              <div className="AX-Admin-TransactionCol">
                <div className="Admin-TransactionPic">
                  <img className="Admin-TranscationPicImg" alt="" src={el.to.profilePic}/>
                </div>
                <div className="AX-Admin-TransactionUserName">{el.to.username}</div>
              </div>
              <div className="AX-Admin-TransactionCol" id="AX-digits">
                <div>{el[col1]}</div>
              </div>
              <div className="AX-Admin-TransactionCol" id="AX-digits">
                <div>{el[col2]}</div>
              </div>
            </div>
          </div>
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

  render() {
    console.log(this.state)
    return (
      <div className="Admin-SheetContainer">
        <div className="Admin-BalenceHeader">
          <div className="Admin-DropDownDiv">
            <div className="AX-date">{"el.date"}</div>
            <div className="AX-TransData">
              <div className="AX-Admin-TransactionCol">
                <div>{"el.reason"}</div>
              </div>
              <div className="AX-Admin-TransactionCol">
                <div className="Admin-TransactionPic">
                  <img className="Admin-TranscationPicImg" alt="" src={"el.to.profilePic"}/>
                </div>
                <div className="AX-Admin-TransactionUserName">
                  {this.renderingTheDropDown()}
                </div>
              </div>
              <div className="AX-Admin-TransactionCol" id="AX-digits">
                <div>{"el[col1]"}</div>
              </div>
              <div className="AX-Admin-TransactionCol" id="AX-digits">
                <div>{"el[col2]"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="AX-Admin-TransactionItem">
          <div className="AX-TransData">
            <div className="AX-Admin-TransactionCol">
            </div>
            <div className="AX-Admin-TransactionCol">
              <div className="AX-Admin-TransactionUserName">User</div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div>amount</div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div>ballence</div>
            </div>
          </div>
        </div>
        <div className="Admin-TransactionContainer">
          {this.AdminExpenseTransactionList(this.state.transactionsToDisplay, this.props.col1, this.props.col2)}
        </div>
        <div className="AX-Admin-TransactionSummary">
          <div className="AX-TransData">
            <div className="AX-Admin-TransactionCol">
            </div>
            <div className="AX-Admin-TransactionCol">
              <div className="AX-Admin-TransactionUserName"></div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div>{this.pageTotal(this.state.data, 'amount')}</div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div>{this.pageTotal(this.state.data, 'toBallence')}</div>
            </div>
          </div>
        </div>
        <div className="Admin-TransactionOverflowBox">
          {this.displayingNavigationPage()}
        </div>
      </div>
    )
  }
}

export default AdminExpenseSheet;
