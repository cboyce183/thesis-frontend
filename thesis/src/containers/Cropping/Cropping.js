import React, { Component, } from 'react';
import { Cropper, } from 'react-image-cropper';
import { connect, } from 'react-redux';
import { doneCroppedImage, } from './../../actions'
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
    if (!this.state.base64Image) {
      return (<img alt="" src={require('../../assets/userImage.svg')} className="LoadedImageCrop"/> )
    } else {
      return <Cropper className="LoadedImageCrop" src={this.state.base64Image} ref='image' onImgLoad={() => this.handleImageLoaded('image')}/>
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
                <div className="TitlePicture">Add your profile picture</div>
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

const mapStateToProps = (state) => ({
  image: state.CroppedUserImage,
})

const mapDispatchToProps = (dispatch) => ({
  addCroppedImage: (Image) => dispatch(doneCroppedImage(Image))
})

export default connect(mapStateToProps, null)(Cropping);
