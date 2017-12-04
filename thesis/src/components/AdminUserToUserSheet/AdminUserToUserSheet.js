import React, { Component, } from 'react';

import '../../App.css';
// import { pageTotal, } from './../../functions/AdminFilterFunctions'

class AdminUserToUserSheet extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null,
      transactionsToDisplay: null,
      pageTotal: null,
      pageNumber: 1,
      transIncrement: [0,9,],
      userList: [],
      selected: '',
      popperSpent: false,
    }
  }

  addDataToState(data){
    this.setState({'data': data,})
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


  async componentDidMount(){
    await this.addDataToState(this.props.UserToUser)
    await this.filteringTransactionsForPanel(this.state.transIncrement[0], this.state.transIncrement[1])
    await this.totalNumberOfPagesNeeded()
    // await this.filterUserNamesForSelection()
  }

  async incrementThePage(){
    if(this.state.pageNumber < this.state.pageTotal) {
      await this.setState((prevState, props) => ({
        transIncrement: [
          prevState.transIncrement[0] + 10,
          prevState.transIncrement[1] + 10,],
      }))
      this.filteringTransactionsForPanel(this.state.transIncrement[0], this.state.transIncrement[1])
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber + 1,}))
    }
  }

  decrementThePage(){
    if (this.state.pageNumber > 1){
      this.filteringTransactionsForPanel(0,9)
      this.setState((prevState, props) => ({pageNumber: prevState.pageNumber - 1,}))
    }
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
            <div className="Admin-PageNumber">1 </div>
            <div className="Admin-PagePossNumber"> {this.state.pageNumber} </div>
            <div className="Admin-PageNumber"> {this.state.pageTotal} </div>
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

  totalNumberOfPagesNeeded(){
    const recTranLength = this.state.data.length
    console.log(recTranLength)
    const nPagesRequired = Math.floor(recTranLength/10) + 1;
    this.setState({pageTotal: nPagesRequired,})
  }


  UserToUserTransactionList(data){
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
                  <img className="Admin-TranscationPicImg" alt="" src={el.from.profilePic}/>
                </div>
                <div className="AX-Admin-TransactionUserName">{el.from.username}</div>
              </div>
              <div className="AX-Admin-TransactionCol" id="AX-digits">
                <div>→</div>
              </div>
              <div className="AX-Admin-TransactionCol">
                <div className="Admin-TransactionPic">
                  <img className="Admin-TranscationPicImg" alt="" src={el.to.profilePic}/>
                </div>
                <div className="AX-Admin-TransactionUserName">{el.to.username}</div>
              </div>
              <div className="AX-Admin-TransactionCol" id="AX-digits">
                <div>{el.amount}</div>
              </div>
              <div></div>
            </div>
          </div>
        )
      })
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className="Admin-SheetContainer">
        <div className="Admin-BalenceHeader">
          <div className="Admin-DropDownDiv">
          </div>
          <div className="Admin-spacedivATM">
            <input onClick={ () => {
              // this.setState({popperDate: true,})
            }}
            className="Admin-RemoveFilterButton" type="submit" value="filter date"
            />
          </div>
          <div className="Admin-spacedivATM">
            <input onClick={() => {
              // this.setState({popperSpent: true,})
            }}
            className="Admin-RemoveFilterButton" type="submit" value="filter spent"
            />
          </div>
          <div className="Admin-spacedivATM">
            <input onClick={ () => {
              // this.filteringTransactionsForPanel(0,14)
              // this.handleUserErase()
            }}
            className="Admin-RemoveFilterButton" type="submit" value="All"
            />
          </div>
          <div className="Admin-DropDownDiv">
            {/* <DropDown
              func={this.handleUserSelection.bind(this)}
              placeh="Filter reciever"
              arr={this.state.userList}
            /> */}
          </div>
        </div>
        <div className="AX-Admin-TransactionItem">
          <div className="AX-TransData">
            <div className="AX-Admin-TransactionCol">
              <div></div>
            </div>
            <div className="AX-Admin-TransactionCol">
              {/* <div className="Admin-TransactionPic"> */}
                {/* <img className="Admin-TranscationPicImg" alt="" src={el.from.profilePic}/> */}
              {/* </div> */}
              <div className="AX-Admin-TransactionUserName">Giver</div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div></div>
            </div>
            <div className="AX-Admin-TransactionCol">
              {/* <div className="Admin-TransactionPic"> */}
                {/* <img className="Admin-TranscationPicImg" alt="" src={}/> */}
              {/* </div> */}
              <div className="AX-Admin-TransactionUserName">Reciever</div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div>amount</div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="Admin-TransactionContainer">
          {this.UserToUserTransactionList(this.state.transactionsToDisplay)}
        </div>
        <div className="Admin-TransactionSummaryStats">
          <div className="Admin-TransactionTitle"></div>
          <div className="Admin-TransactionTitle"></div>
          <div className="Admin-TransactionTitle"></div>
          <div className="Admin-TransactionTitle">{
            // this.pageTotal('amount')
          }</div>
          <div className="Admin-TransactionTitle"></div>
          <div className="Admin-TransactionTitle"></div>
          <div className="Admin-TransactionTitle"></div>
        </div>
        <div className="Admin-TransactionOverflowBox">
          {this.displayingNavigationPage()}
        </div>
      </div>
    )
  }
}

export default AdminUserToUserSheet;
