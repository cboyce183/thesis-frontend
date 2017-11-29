import React, { Component, } from 'react';
import '../../App.css';
import './Settings.css';
import ReactFileReader from 'react-file-reader';



class Settings extends Component {
  constructor(props){
    super(props);

    this.state = {
      settingValues:{},
      pending: [],
      isAdmin: false,
      loaded: false,
      remaning: 0,
      received: 0,
      adminName:'',
      address:'',
    }
    //following fetch only has to activate if the localstorage contains the token, uncomment for functionality.
    // if (window.localStorage.getItem('token')) {
    fetch('https://private-3a61ed-zendama.apiary-mock.com/user')
      .then(res => res.json())
      .then(res => {
        if (res.isAdmin) {
          if (!res.catalog.length) this.setState({pending: ['catalog',],});
          if (!res.usersId.length) this.setState({pending: [...this.state.pending, 'users',],});
          this.setState({isAdmin:res.isAdmin,});
        } else {
          this.setState({available: res.availableCurrency, received: res.receivedCurrency,});
        }
        this.setState({loaded: true,});
      })
      .catch(e => console.error(e));
    // } else {
    //   window.location = '/login';
    // }
  }

  handleFiles = files => {
    this.setState({
      imagePath:files.base64,
      displayImg: true,
    })
  }
  //create func console.log(this.settingsName.value);

  adminorUser = () => {
    console.log('this is a test are an admin', this.state.isAdmin);
  }


  handleChange = e => {
    e.preventDefault();
    let settingValues = this.state.settingValues;
    let name = e.target.type;
    let value = e.target.value;
    settingValues[name] = value;
    this.setState({settingValues,
    })
  }

  handleSettingsInfo = e => {
    e.preventDefault();
    console.log('this is displayname', this.displayName);
    console.log('this is adminName', this.adminName);
    console.log('this is settings name: ', this.settingsName.value)
  }

  render() {
    return (
      <div className='MaxWidth'>
        {
          this.state.isAdmin &&  (
            <div className='settings-container'>
              <div className='settings-img'>
                <h3 className='settings-label'>User Settings</h3>
                <div className="img-input-settings">
                  <div className='set-pic'>
                    {
                      this.state.displayImg && (
                        <img src={this.state.imagePath} alt='settings pic'/>
                      )
                    }
                  </div>
                  <div className='settings-pic'>
                    <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                      <button className='btn-upload'>Upload Your Photo</button>
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
                    ref={el => this.settingsName = el}
                    value={this.state.settingValues['settingsName']}
                    placeholder="Name"
                  />
                </div>
                <div>
                  <input
                    className="u-full-width"
                    type="text"
                    name="position"
                    ref={el => this.position = el}
                    value={this.state.settingValues['position']}
                    placeholder="Your Position"
                  />
                </div>
                <div>
                  <input
                    className="u-full-width"
                    type="text"
                    name="displayName"
                    placeholder="Display Name"
                    ref={el => this.displayName = el}
                    value={this.state.settingValues['displayName']}
                  />
                </div>
                <div className='edit-btn-settings'>
                  <input
                    className="button-primary"
                    type="submit"
                    value="SAVE"
                    onClick={this.handleSettingsInfo}
                  />
                </div>
              </div>
            </div>
          )
        }


        <div className='settings-container'>
          <div className='settings-img'>
            <h3 className='settings-label'>Admin Settings</h3>
            <div className="img-input-settings">
              <div className='set-pic'>
                {
                  this.state.displayImg && (
                    <img src={this.state.imagePath} alt='settings pic'/>
                  )
                }
              </div>
              <div className='settings-pic'>
                <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                  <button className='btn-upload'>Upload Your Logo</button>
                </ReactFileReader>
              </div>
            </div>
          </div>
          <div className='settings-info'>
            <div>
              <input
                className="u-full-width"
                type="text"
                name="adminName"
                placeholder="Name"
                ref={el => this.adminName = el}
                value={this.state.settingValues['name']}
              />
            </div>
            <div>
              <input
                className="u-full-width"
                type="text"
                name="address"
                placeholder="Company Address"
                ref={el => this.address = el}
                value={this.state.settingValues['address']}
              />
            </div>
            <div>
              <input
                className="u-full-width"
                type="number"
                name="allowance"
                placeholder="$ Allowance"
                ref={el => this.allowance = el}
                value={this.state.settingValues['allowance']}
              />
            </div>
            <div className='edit-btn-settings'>
              <input
                className="edit-btn-settings button-primary"
                type="submit"
                value="Edit"
                onClick={this.handleSettingsInfo}
              />
            </div>
            <div>
              <input
                className="button-primary"
                type="submit"
                value="Manage Users"
                placeholder="Manage Users"
                onClick={this.handleSettingsInfo}
              />
            </div>
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
