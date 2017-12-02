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
        id: 1,
        img: 'http://lindsey.es',
        username: 'Lindsey',
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
    console.log(value);
    const result = this.state.userList.filter((user) => user['username'].indexOf(value) !== -1);
    this.setState({
      result,
    })
  }

  render() {
    const { result, } = this.state;
    return (
      <div className="manage-users-container">
        <div className='filter-add-users'>
          <h4 className="manage-users-label">Users</h4>
          <div className="row">
            <div className="ten columns">
              <input
                placeholder="Search for users"
                type="text"
                onChange={(e) => this.handleUserSelection(e.target)}
              />
            </div>
            <div className="two columns">
              <button className="u-pull-right u-cf button-primary "><img className="plus" alt='trash' src={require('../../assets/add.svg')}/></button>
            </div>
          </div>
        </div>
        <div className='rm-users'>
          <h4>User list and Rm goes here</h4>
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
