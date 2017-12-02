import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import '../../App.css';
import './ManageUsers.css';
import DropDown from '../DropDown/DropDown';


class ManageUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      userList:[{
        id: '',
        img: '',
        username: '',
      },],
      result: [],
    }

    fetch('https://private-3a61ed-zendama.apiary-mock.com/tips')
      .then(res => res.json())
      .then(res => {
        this.setState({loaded: true, userList:res.users,});
      })
      .catch(e => console.error(e));
  }


  handleUserSelection = ({ value, }) => {
    console.log('user list', this.state.userList);
    const result = this.state.userList.filter((user) => user['username'].indexOf(value) !== -1);
    this.setState({
      result,
    })
  }


  addUser = (value) => {
    this.checkEmailValid(value)
    if (!this.state.emailWarning){
      console.log('here');
    }
  }

  checkEmailValid(email){
    // regex email expression, which should cover 99% of cases.
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const bool = re.test(email)
    if (bool) {
      this.setState({emailValid: true,});
    }
    else {
      this.setState({emailWarning: true,});
    }
  }

  // deleteUser= () => {
  //   const result = this.state.userList
  // }

  render() {
    const { result, } = this.state;
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
              <button onClick={() => this.addUser(this.useremail.value)}className="u-pull-right u-cf button-primary "><img className="plus" alt='trash' src={require('../../assets/add.svg')}/></button>
            </div>
          </div>
        </div>
        <div className='rm-user-list'>
          <h4>Add or Remove users</h4>
          <ul>
            {result.length ? result.map((user, i) => (
              <div key={i} className="row">
                <div className="one columns">
                  <img alt="user_img" className='trash' src={user.img} />
                </div>
                <div className="nine columns">
                  <li>{user.username}</li>
                </div>
                <div className="two columns">
                  <button className="u-pull-right u-cf button-primary "><img className="trash" alt='trash' src={require('../../assets/delete-button.svg')}/></button>
                </div>
              </div>
            )) : ''}
          </ul>
        </div>
      </div>
    )
  }
}

export default ManageUsers;
