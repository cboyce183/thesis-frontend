import React, { Component, } from 'react';
// import { NavLink, } from 'react-router-dom';
import { Cropper, } from 'react-image-cropper';
import './Cropping.css'
import OriginalImage from './../../assets/userImage.svg'


class Cropping extends Component {
  constructor(props){
    super(props)
    this.state = {
      imageLoaded: false,
      profilePic: null,
      profilePicLoad: false,
      passwordNotEqual: false,
      base64Image: null,
    }
  }

  handleImageLoaded(state){
    this.setState({
      [state + 'Loaded']: true,
    });
  }

  handleClick(state){
    let node = this.refs[state];
    this.setState({
      [state]: node.crop(),
    });
  }


  imageChange(bool){
    if (bool) {
      var reader = new FileReader();
      reader.readAsDataURL(this.state.profilePic[0]);
      reader.onloadend = () => {
        this.setState({base64Image: reader.result, profilePicLoad: false,})
      }
    }
    // console.log(this.state.base64Image)
    if (!this.state.base64Image) {
      return (<img src={require('../../assets/userImage.svg')} className="ImageCropper"/> )
    } else {
      return <Cropper src={this.state.base64Image} ref="image" onImgLoad={() => this.handleImageLoaded('image')}/>
    }
  }


  render() {
    return (
      <div>
        <div className="ContainerCrop">
          <div className="MainPannelCrop">
            <div className="UserInputContainerCrop">
              {this.imageChange(this.state.profilePicLoad)}
            </div>
            <div className="AboutContainerCrop">
              <div className="ImageLoad">
                <span>Add your profile picture</span>
                <input className="FileLoad" type="file"
                  onChange={(e) => {
                    this.setState({
                      profilePic: e.target.files,
                      profilePicLoad: true,})
                  }}
                />
              </div>
              <div className="CropButton">
                <input className="CropperButton" type="submit" value="Crop image"
                  onClick={() => this.handleClick('image')}
                />
                <input className="DoneBox" type="submit" value="done"
                  onClick={() => window.location = '/usersignup'}
                />
              </div>
              <div className="CroppedImageBox">
                <div className="CroppedImageContainer">
                  <img className="CroppedImage" src={this.state.image} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (Cropping);
