import React, { Component, } from 'react';
import '../../App.css';
import './Settings.css';
import ReactFileReader from 'react-file-reader';
import Close from '../../components/Close/Close';
import PopUp from '../../components/PopUp/PopUp';
import ManageUsers from '../../components/MangageUsers/ManageUsers';
import '../../components/PopUp/PopUp.css';
import SketchPicker from 'react-color';
import reactCSS from 'reactcss';


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
      received: 0,
      adminName:'',
      address:'',
      editing:false,
      position:'',
      firstName:'',
      username:'',
      profilePic:'',
      logo:'',
      weeklyAllow:'',
      allowance:'',
      name:'',
      popped: false,
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      userList:[],
    }

    //following fetch only has to activate if the localstorage contains the token, uncomment for functionality.
    // if (window.localStorage.getItem('token')) {
    fetch('https://private-3a61ed-zendama.apiary-mock.com/user')
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
        color:this.state.color,
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

  handleUserSelection = (value) => {
    this.setState({selected: value,})
  }

  handleFiles = files => {
    this.setState({
      imagePath:files.base64,
      uploaded: true,
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

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker,})
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false,})
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb,})
  };

  handleFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handlePopUp = () => {
    this.setState({
      popped: !this.state.popped,
    })
  }

  renderPopUp() {
    return (
      <PopUp
        unpop={this.handlePopUp.bind(this)}>
        <ManageUsers />
      </PopUp>
    )
  }

  renderLogoPicker = () => {
    return this.state.uploaded
      ? (
        <img
          className="img-company-reg-logo"
          name="logo"
          onChange={this.handleFieldChange}
          src={this.state.imagePath}
          alt='company Logo'
        />
      ) : (
        <ReactFileReader base64={true} handleFiles={this.handleFiles}>
          <div className="logo-upload-container">
            <p className="logo-upload-text">upload your logo</p>
          </div>
        </ReactFileReader>
      )
  }


  renderProfilePic = () => {
    return this.state.uploaded
      ? (
        <img
          className="img-company-reg-logo"
          name="logo"
          onChange={this.handleFieldChange}
          src={this.state.imagePath}
          alt='company Logo'
        />
      ) : (
        <ReactFileReader base64={true} handleFiles={this.handleFiles}>
          <div className="logo-upload-container">
            <p className="logo-upload-text">upload your profile pic</p>
          </div>
        </ReactFileReader>
      )
  }


  render () {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          background: '#fff',
          borderRadius: '3px',
          borderStyle: 'solid',
          borderWidth: '1.5px',
          borderColor: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          color: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    const popup = this.state.popped ? this.renderPopUp() : null;

    return  !this.state.isAdmin ? (
      <div className='MaxWidth'>
        <div className="header-settings">
          <h1 className='settings-label'>User Settings</h1>
          <div className='close-btn'>
            <Close link="/panel"/>
          </div>
        </div>
        <div className='settings-container-user'>
          <div className='settings-img'>
            <div className="img-input-settings">
              <div className='settings-pic'>
                {this.renderProfilePic()}
              </div>
            </div>
          </div>
          <div className='settings-info'>
            <div>
              <h4 className="admin-input-labels">Name</h4>
              <input
                className="u-full-width"
                type="text"
                name="firstName"
                placeholder={this.state.firstName}
                disabled={!this.state.editing}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              <h4 className="admin-input-labels">Position</h4>
              <input
                className="u-full-width"
                type="text"
                name="position"
                disabled={!this.state.editing}
                placeholder={this.state.position}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              <h4 className="admin-input-labels">Display Name</h4>
              <input
                className="u-full-width"
                type="text"
                name="username"
                placeholder={this.state.username}
                disabled={!this.state.editing}
                onChange={this.handleFieldChange}
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
        </div>
        <footer className='footer-pwr-by'>
          <h6 className='pwr-by-settings'>powered by Zendama</h6>
        </footer>
      </div>
    ) :
      (
        <div>
          {popup}
          <div className='MaxWidth'>
            <div className="header-settings">
              <h1 className='settings-label'>Admin Settings</h1>
              <div className='close-btn'>
                <Close link="/panel"/>
              </div>
            </div>
            <div>
              <div className="container-settings">

                <div className='settings-info'>
                  <input
                    className="u-full-width settings-input"
                    type="text"
                    name="name"
                    placeholder={this.state.name}
                    disabled={!this.state.editing}
                    onChange={this.handleFieldChange}
                  />
                  <input
                    className="u-full-width settings-input"
                    type="text"
                    name="address"
                    placeholder={this.state.address}
                    disabled={!this.state.editing}
                    onChange={this.handleFieldChange}
                  />
                  <input
                    className="u-full-width settings-input"
                    type="number"
                    name="weeklyAllow"
                    placeholder={this.state.weeklyAllow}
                    disabled={!this.state.editing}
                    onChange={this.handleFieldChange}
                  />
                  <div className="admin-set-btns">
                    <div
                      className="settings-btn"
                      onClick={this.state.editing ? this.updateUserSettings : this.handleSettingsInfo}
                    >{this.state.editing ? 'Save' : 'Edit'}</div>
                    <div
                      className="settings-btn"
                      type="submit"
                      onClick={this.handlePopUp}
                    >Manage Users</div>
                  </div>
                </div>

                <div className='settings-container'>
                  <div className='set-pic'>
                    {this.renderLogoPicker()}
                  </div>
                  <div className='settings-color'>
                    <input
                      style={styles.swatch}
                      onClick={ this.handleClick}
                      onChange={this.handleFieldChange}
                      name="color"
                      className="settings-btn"
                      type="submit"
                      value="Choose a theme color"
                    />
                    { this.state.displayColorPicker ? <div style={ styles.popover }>
                      <div style={ styles.cover } onClick={ this.handleClose }/>
                      <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                    </div> : null }
                  </div>
                </div>
                <div className='settings-info-admin'>
                  <div className="admin-input-labels">
                    <h4>Name</h4>
                    <input
                      className="u-full-width"
                      type="text"
                      name="name"
                      placeholder={this.state.name}
                      disabled={!this.state.editing}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className="admin-input-labels">
                    <h4 >Address</h4>
                    <input
                      className="u-full-width"
                      type="text"
                      name="address"
                      placeholder={this.state.address}
                      disabled={!this.state.editing}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className="admin-input-labels">
                    <h4 className="settings-label">Allowance</h4>
                    <input
                      className="u-full-width"
                      type="text"
                      name="weeklyAllow"
                      placeholder={this.state.weeklyAllow}
                      disabled={!this.state.editing}
                      onChange={this.handleFieldChange}
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
                  <div className="mng-users-btn">
                    <input
                      style={style}
                      type="submit"
                      value="Manage Users"
                      title="Users List"
                      placeholder="Manage Users"
                      onClick={this.handlePopUp}
                    />
                  </div>
                </div>
              </div>
            </div>
            <footer className='footer-pwr-by'>
              <h6 className='pwr-by-settings'>powered by Zendama</h6>
            </footer>
          </div>
        </div>
      );
  }
}

export default Settings;
