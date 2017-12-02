import React, { Component, } from 'react';

import '../../App.css';


class AdminUserToUserSheet extends Component {
  UserToUserTransactionList(data){
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
  render() {
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
          {this.UserToUserTransactionList(this.props.UserToUser)}
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
          {/* {this.displayingNavigationPage()} */}
        </div>
      </div>
    )
  }
}

export default AdminUserToUserSheet;
