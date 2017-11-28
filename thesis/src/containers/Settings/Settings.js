import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import '../../App.css';
import './Settings.css';
import ReactFileReader from 'react-file-reader';


class Settings extends Component {
  constructor(props){
    super(props);

    this.state = {
      // displayImg:false,
      // imagePath:'',
      // settingsName:'',
      // position:'',
      // displayName:'',
      // value: '',
      settingValues:{},
    }
    console.log('the STATE = ', this.state);
  }


  handleFiles = files => {
    this.setState({
      imagePath:files.base64,
      displayImg: true,
    })
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
    console.log(this.state.settingValues, 'this state setting Vals');
  }

  render() {
    return (
      <div className='MaxWidth'>
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
                // ref={el => this.element = el}
                value={this.state.settingValues['name']}
                onChange={this.handleSettingsInfo.bind(this)}
                placeholder="Name"
              />
            </div>
            <div>
              <input
                className="u-full-width"
                type="text"
                name="position"
                value={this.state.settingValues['position']}
                onChange={this.handleSettingsInfo.bind(this)}
                placeholder="Your Position"
              />
            </div>
            <div>
              <input
                className="u-full-width"
                type="text"
                name="displayName"
                placeholder="Display Name"
                value={this.state.settingValues['displayName']}
                onChange={this.handleSettingsInfo.bind(this)}
              />
            </div>
            <div className='edit-btn-settings'>
              <input
                className="button-primary"
                type="submit"
                value="SAVE"
                onClick={this.handleSettingsInfo}
              />
              <p>{this.state.value}</p>
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
