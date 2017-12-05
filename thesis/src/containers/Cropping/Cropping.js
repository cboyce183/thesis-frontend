import React, { Component, } from 'react';
import { Cropper, } from 'react-image-cropper';

import PopUp from '../../components/PopUp/PopUp';
import './Cropping.css'

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

  handleImageLoaded = () => {
    this.setState({'imageLoaded': true,});
  }

  handleClick = () => {
    if (this.image) this.setState({image: this.image.crop(),});
    else alert('please select an image');
  }

  handleUnPop = () => {
    this.props.unpop(null);
  }

  handleDone = () => {
    this.props.unpop(this.state.image)
  }

  handleFileUpload = (event) => {
    this.setState({
      profilePic: event.target.files,
      profilePicLoad: true,})
  }

  renderImageChange = () => {
    if (this.state.profilePicLoad) {
      var reader = new FileReader();
      reader.readAsDataURL(this.state.profilePic[0]);
      reader.onloadend = () => {
        this.setState({base64Image: reader.result, profilePicLoad: false,})
      }
    }
    if (!this.state.base64Image) {
      return (
        <div className='cropping-placeholder'>
          <p>Choose a file</p>
        </div>
      );
    } else {
      return <Cropper className="LoadedImageCrop" src={this.state.base64Image} ref={el => this.image = el} onImgLoad={this.handleImageLoaded}/>
    }
  }

  render() {
    return (
      <PopUp
        width="1000px"
        unpop={this.handleUnPop}
      >
        <div className="ContainerCrop">
          <div className="MainPannelCrop">
            <div className="UserInputContainerCrop">
              {this.renderImageChange()}
            </div>
            <div className="AboutContainerCrop">
              <div className="ImageLoad">
                <div className="TitlePicture">Add your profile picture</div>
                <input className="FileLoad" type="file"
                  onChange={this.handleFileUpload}
                />
              </div>
              <div className="CropButton">
                <input className="CropperButton" type="submit" value="Crop image"
                  onClick={this.handleClick}
                />
                <input className="DoneBox" type="submit" value="done"
                  onClick={this.handleDone}
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
      </PopUp>
    )
  }
}

export default (Cropping);
