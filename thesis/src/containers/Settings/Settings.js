import React, { Component, } from 'react';
import '../../App.css';
import './Settings.css';
import ReactFileReader from 'react-file-reader';
import Close from '../../components/Close/Close';


const style = {
  borderWidth:'1.5px',
  borderStyle: 'solid',
  borderColor: '#040223',
  fontWeight: '650',
}

class Settings extends Component {
  constructor(props){
    super(props);

    this.state = {
      pending: [],
      isAdmin: false,
      loaded: false,
      remaning: 0,
      received: 0,
      adminName:'',
      address:'',
      editing:false,
      position:'',
      displayName:'',
      firstName:'',
      username:'',
      profilePic:'',
      logo:'',
      weeklyAllow:'',
      allowance:'',
      name:'',
      saveSettingEdits:{},
    }

    //following fetch only has to activate if the localstorage contains the token, uncomment for functionality.
    // if (window.localStorage.getItem('token')) {
    fetch('https://private-3a61ed-zendama.apiary-mock.com/company')
      .then(res => res.json())
      .then(res => {
        if (res.isAdmin) {
          if (!res.catalog.length) this.setState({pending: ['catalog',],});
          if (!res.usersId.length) this.setState({pending: [...this.state.pending, 'users',],});
          this.setState({isAdmin:res.isAdmin, logo:res.logo, weeklyAllow: res.weeklyAllow, name:res.name, address:res.address,});
        } else {
          this.setState({available: res.availableCurrency, received: res.receivedCurrency, firstName: res.firstName, username: res.username, profilePic: res.profilePic, position: res.position, });
        }
        this.setState({loaded: true,});
      })
      .catch(e => console.error(e));
    // } else {
    //   window.location = '/login';
    // }

  }

  updateUserSettings = () => {
    return fetch('https://private-b133c5-zendama.apiary-mock.com/user', {
      method: 'PUT',
      body: JSON.stringify({
        firstName:this.state.firstName,
        position:this.state.position,
        username:this.state.username,
        profilePic:this.state.profilePic,
        logo:this.state.logo,
        name:this.state.name,
        address:this.state.address,
        weeklyAllow:this.state.weeklyAllow,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(this.checkStatus)
      .then(()=> console.log('updated edits in Admin settings :)'),
        this.setState({editing:false,}))
  }

  updateAdminSettings = () => {
    return fetch('https://private-b133c5-zendama.apiary-mock.com/settings', {
      method: 'PUT',
      body: JSON.stringify({
        logo:this.state.logo,
        name:this.state.name,
        address:this.state.address,
        weeklyAllow:this.state.weeklyAllow,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(this.checkStatus)
      .then(()=> console.log('updated edits in Admin settings :)'),
        this.setState({editing:false,}))
  }

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  handleFiles = files => {
    this.setState({
      imagePath:files.base64,
      displayImg: true,
    })
  }

  handleSettingsInfo = e => {
    e.preventDefault();
    if(this.state.editing) {
      this.setState({ editing: false, });
    } else {
      this.setState({ editing: true, });
    }
  }


  onFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render () {
    return  !this.state.isAdmin ? (
      <div className='MaxWidth'>
        <div className='settings-container'>
          <div className='settings-img'>
            <h3 className='settings-label'>User Settings</h3>
            <div className="img-input-settings">
              <div className='set-pic'>
                <img className='settings-upload-pic' name='profilePic' onChange={this.onFieldChange} src={this.state.profilePic} alt='settings pic'/>
                {
                  this.state.displayImg && (
                    <img className='settings-upload-pic' src={this.state.imagePath} alt='settings pic'/>
                  )
                }
              </div>
              <div className='settings-pic'>
                <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                  <button className='btn-upload' style={style}>Upload Your Photo</button>
                </ReactFileReader>
              </div>
            </div>
          </div>
          <div className='settings-info'>
            <div>
              <input
                className="u-full-width"
                type="text"
                name="firstName"
                placeholder={this.state.firstName}
                disabled={!this.state.editing}
                onChange={this.onFieldChange}
              />
            </div>
            <div>
              <input
                className="u-full-width"
                type="text"
                name="position"
                disabled={!this.state.editing}
                placeholder={this.state.position}
                onChange={this.onFieldChange}
              />
            </div>
            <div>
              <input
                className="u-full-width"
                type="text"
                name="username"
                placeholder={this.state.username}
                disabled={!this.state.editing}
                onChange={this.onFieldChange}
              />
            </div>
            <div className='edit-btn-settings'>
              <input
                className="settings-btn"
                style={style}
                type="submit"
                value={this.state.editing ? 'SAVE' : 'EDIT'}
                onClick={this.state.editing ? this.updateUserSettings : this.handleSettingsInfo}
              />
            </div>
          </div>
          <div className='close-btn'>
            <Close link="/panel"/>
          </div>
        </div>
        <div>
          <h6 className='pwr-by-settings'>powered by Zendama</h6>
        </div>
      </div>
    ) :
      (
        <div className='MaxWidth'>
          <div className='settings-container'>
            <div className='settings-img'>
              <h3 className='settings-label'>Admin Settings</h3>
              <div className="img-input-settings">
                <div className='set-pic'>
                  <img className='settings-upload-pic' name='logo' onChange={this.onFieldChange} src={this.state.logo} alt='settings pic'/>
                  {
                    this.state.displayImg && (
                      <img className='settings-upload-pic' src={this.state.imagePath} alt='settings pic'/>
                    )
                  }
                </div>
                <div className='settings-pic'>
                  <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                    <button className='btn-upload' style={style}>Upload Your Logo</button>
                  </ReactFileReader>
                </div>
              </div>
            </div>
            <div className='settings-info'>
              <div>
                <input
                  className="u-full-width"
                  type="text"
                  name="name"
                  placeholder={this.state.name}
                  disabled={!this.state.editing}
                  onChange={this.onFieldChange}
                />
              </div>
              <div>
                <input
                  className="u-full-width"
                  type="text"
                  name="address"
                  placeholder={this.state.address}
                  disabled={!this.state.editing}
                  onChange={this.onFieldChange}
                />
              </div>
              <div>
                <input
                  className="u-full-width"
                  type="text"
                  name="weeklyAllow"
                  placeholder={this.state.weeklyAllow}
                  disabled={!this.state.editing}
                  onChange={this.onFieldChange}
                />
              </div>
              <div className='edit-btn-settings'>
                <input
                  className="settings-btn"
                  style={style}
                  type="submit"
                  onClick={this.state.editing ? this.updateAdminSettings : this.handleSettingsInfo}
                  value={this.state.editing ? 'SAVE' : 'EDIT'}
                />
              </div>
              <div>
                <input
                  className="settings-btn"
                  style={style}
                  type="submit"
                  value="Manage Users"
                  placeholder="Manage Users"
                />
              </div>
            </div>
            <div className='close-btn'>
              <Close link="/panel"/>
            </div>
          </div>
          <div>
            <h6 className='pwr-by-settings'>powered by Zendama</h6>
          </div>
        </div>
      );
  }
}

export default Settings;
