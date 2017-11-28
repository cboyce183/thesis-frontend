import React, { Component, } from 'react';

import '../../App.css';
import './DropDown.css';

//takes array as props, displays a list of users and a search bar. If you type a name it will filter out the users and when you click add it
class DropDown extends Component {

  state = {
    users: false,
    selected: [],
  }

  renderUserDropdown(arr) {
    return arr.map((el,i) => {
      return (
        <div className="UserItem" key={i} value={el.id}>
          <img
            className="UserItemPic"
            alt={el.username}
            src={el.img}
          />
          {el.username}
        </div>
      )
    });
  }

  renderUserList = () => {
    this.setState({users: !this.state.users,})
  }

  render() {
    const dropdown = this.renderUserDropdown(this.props.arr);
    return (
      <div className="DropDown">
        <input
          placeholder={this.props.placeh}
          type="text"
          onFocus={this.renderUserList}
          onBlur={this.renderUserList}
        />
        { this.state.users
          ? (
            <div className="UserList">
              {dropdown}
            </div>
          ) : (
            ''
          )
        }
      </div>
    );
  }
}

export default DropDown;
