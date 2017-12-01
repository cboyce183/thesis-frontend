import React, { Component, } from 'react';

import '../../App.css';
import './DropDown.css';

class DropDown extends Component {

  state = {
    users: false,
    selected: [],
    list: [],
  }

  //a prop must be passed to the DropDown component that contains the function that handles the user selection.

  componentDidMount() {
    this.setState({list: this.props.arr,})
    console.log("dropdown", this.props.arr)
  }

  handleFilters(event) {
    const filtered = event.value
      ? this.state.list.filter(el => el.username.includes(event.value))
      : this.props.arr;
    this.setState({list: filtered,});
  }

  handleUserSelection = (user) => {
    this.props.func(user.id);
    this.setState({selected: [user,],});
  }

  handleUserErase = (user) => {
    this.props.func('')
    this.setState({selected: [],users: !this.state.users,list:this.props.arr,})
  }

  //=====================================RENDERING

  renderUserDropdown = (arr) => {
    return arr.map((el,i) => {
      return (
        <div
          className="UserItem"
          key={i}
          onMouseDown={() => this.handleUserSelection(el)}
        >
          <img
            className="UserItemPic"
            alt={el.username}
            src={el.img}
          />
          <p>{el.username}</p>
        </div>
      )
    });
  }

  renderSelectedUser(user) {
    return user.map((el,i) => {

      return (
        <div className="SelectedUserItem" key={i}>
          <img
            className="SelectedUserPic"
            alt={el.username}
            src={el.img}
          />
          <p>{el.username.split(' ')[0]}</p>
          <div
            onClick={this.handleUserErase}
            className="EraseSelectedUser"
          >
            <img
              alt="delete selection"
              className="EraseSelectionImg"
              src={require('../../assets/cross-out.svg')}
            />
          </div>
        </div>
      );
    })
  }

  renderUserList = () => {
    this.setState({users: !this.state.users,})
  }

  render() {
    const dropdown = this.renderUserDropdown(this.state.list);
    const selection = this.renderSelectedUser(this.state.selected);
    return this.state.selected.length
      ? (
        <div className="UserSelection">
          {selection}
        </div>
      ) : (
        <div className="DropDown">
          <input
            placeholder={this.props.placeh}
            type="text"
            onFocus={this.renderUserList}
            onBlur={this.renderUserList}
            onChange={(e) => this.handleFilters(e.target)}
          />
          { this.state.users
            ? (
              <div className="UserList">
                {dropdown}
              </div>
            ) : (
              null
            )
          }
        </div>
      );
  }
}

export default DropDown;
