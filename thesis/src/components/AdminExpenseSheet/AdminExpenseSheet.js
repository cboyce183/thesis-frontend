import React, { Component, } from 'react';
import './AdminExpenseSheet.css'
class AdminExpenseSheet extends Component {

  AdminExpenseTransactionList(data){
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
              <div>{el.amount}</div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div>{el.toBallence}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  pageTotal(data, col){
    return data.reduce((acc, el) => {
      return acc + el[col]
    }, 0)
  }



  render() {
    return (
      <div className="Admin-SheetContainer">
        <div className="Admin-BalenceHeader">
          <div className="Admin-DropDownDiv">
            {/* <DropDown
              func={this.handleUserSelection.bind(this)}
              placeh="Filter giver"
              arr={this.state.userList}
            /> */}
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
          {this.AdminExpenseTransactionList(this.props.AdminExpense)}
        </div>
        <div className="AX-Admin-TransactionSummary">
          <div className="AX-TransData">
            <div className="AX-Admin-TransactionCol">
            </div>
            <div className="AX-Admin-TransactionCol">
              <div className="AX-Admin-TransactionUserName"></div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div>{this.pageTotal(this.props.AdminExpense, 'amount')}</div>
            </div>
            <div className="AX-Admin-TransactionCol" id="AX-digits">
              <div>{this.pageTotal(this.props.AdminExpense, 'toBallence')}</div>
            </div>
          </div>
        </div>
        <div className="Admin-TransactionOverflowBox"></div>
      </div>
    )
  }
}

export default AdminExpenseSheet;
