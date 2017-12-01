import React, { Component, } from 'react';
// import { NavLink, } from 'react-router-dom';
// import './Login.css';
// please feel free to delete roerto was just playing with tokens...
class Ledger extends Component {
  constructor(props){
    super(props)
    this.state = {
      token:  '',
    }
  }

  getInit(){
    fetch('http://192.168.0.37:3000/info', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),}
    })
      .then(r => r.json())
      .then(res => console.log(res))
  }

  componentDidMount(){
    this.setState({token: window.localStorage.getItem('token'),})
    this.getInit();
  }


  render() {
    console.log('this', window.localStorage.getItem('token'))
    return (
      <div className="Container">
            hello
      </div>
    )
  }
}




export default (Ledger);
