import React, { Component, } from 'react';
import '../../App.css';
import './ManageUsers.css';

const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class ManageUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      userList:[],
      result: [],
    }
    fetch('https://private-3a61ed-zendama.apiary-mock.com/tips')
      .then(res => res.json())
      .then(res => {
        this.setState({loaded: true, userList:res.users, result:res.users,});
      })
      .catch(e => console.error(e));
  }

  handleUserSelection = ({ value, }) => {
    this.handleEmailValidation(value);
    const result = this.state.userList.filter((user) => user['username'].indexOf(value) !== -1);
    this.setState({
      result,
    })
  }

  handleUserAdd = (value) => {
    if (this.state.emailValid) {
      const token = window.localStorage.getItem('token');
      fetch('http://192.168.0.37:4200/user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify({
          email: value,
        }),
        mode: 'cors',
      })
        .then(res => {
        });
    }
  }

  handleUserDelete = (index) => {
    const userList = this.state.userList;
    if (index > -1) {
      const deleted = userList.splice(index, 1)[0];
      fetch('https://private-b133c5-zendama.apiary-mock.com/user', {
        method: 'DELETE',
        body: JSON.stringify(deleted.id),
        headers: new Headers({
          'Content-Type' : 'application/json',
        }),
      })
        .then(response => {
        });
    }
    this.setState({ result: userList,})
  }

  handleEmailValidation = (email) => {
    const bool = re.test(email)
    if (bool) {
      this.setState({emailValid: true,});
    }
    else {
      this.setState({emailValid: false,});
    }
  }

  render() {
    const users = this.state.result;
    return (
      <div className="manage-users-container">
        <div className='filter-add-users'>
          <h4 className="manage-users-label">Users</h4>
          <div className="row">
            <div className="ten columns">
              <input
                ref={el => this.useremail = el}
                placeholder="Search for users"
                type="text"
                onChange={(e) => this.handleUserSelection(e.target)}
              />
            </div>
            <div className="two columns">
              <button onChange={(e) => this.handleUserSelection(e.target)} onClick={() => this.handleUserAdd(this.useremail.value)} className="u-pull-right u-cf button-primary"><img className="plus" alt='trash' src={require('../../assets/add.svg')}/></button>
            </div>
          </div>
        </div>
        <div className='rm-user-list'>
          <h4>Add or Remove users</h4>
          <ul>
            {users.map((user, index) => (
              <div key={index} className="row">
                <div className="one columns">
                  <img alt="user_img" className='trash' src={user.img} />
                </div>
                <div className="nine columns">
                  <li>{user.username}</li>
                </div>
                <div className="two columns">
                  <button onClick={() => this.handleUserDelete(index)} className="u-pull-right u-cf button-primary"><img className="trash" alt='trash' src={require('../../assets/delete-button.svg')}/></button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ManageUsers;
