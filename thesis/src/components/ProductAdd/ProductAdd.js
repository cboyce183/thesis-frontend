import React, { Component, } from 'react';

import '../../App.css';
import './ProductAdd.css';

import PopUp from '../PopUp/PopUp';
import ReactFileReader from 'react-file-reader';

const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',]
const displayWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',]
const slots = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,]

class ProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: [],
    }
  }

  handleDateSelect = (object) => {
    const day = Object.keys(object)[0];
    const repeat = this.state.selectedDates.reduce((acc, el) => Object.keys(el)[0] === day && el[day] === object[day] ? true : acc, false);
    if (repeat) {
      const newSelectedDates = this.state.selectedDates.filter(el => Object.keys(el)[0] !== day || el[day] !== object[day])
      this.setState({selectedDates: newSelectedDates,});
    } else this.setState({selectedDates: [...this.state.selectedDates, object,],})
  }

  handleFiles = files => {
    this.setState({
      imagePath: files.base64,
      uploaded: true,
    })
  }

  handleImage = (image) => {
    this.setState({UserImage: image, croppingLoad: false,})
  }

  handleSelectedDateFormat() {
    if (this.state.selectedDates.length) {
      return this.state.selectedDates.reduce((acc,el) => {
        if (acc[Object.keys(el)[0]]) acc[Object.keys(el)[0]].push(el[Object.keys(el)[0]]);
        else acc[Object.keys(el)[0]] = [el[Object.keys(el)[0]],];
        return acc;
      },{})
    } else return null
  }

  handleCreate = ({title, price, info,}) => {
    console.log("image path", this.state.imagePath)
    fetch('http://192.168.0.37:4200/catalog', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),},
      method: 'POST',
      body: JSON.stringify({
        picture: this.state.imagePath,
        description: info,
        name: title,
        price: price,
        isService: this.props.service === 'Services',
        schedule: this.handleSelectedDateFormat(),
      }),
    }).then(res => {
      window.location = '/catalog'; /// need to be more gentel!!!!
      console.log(res)});
  }

  //===========================================RENDERING

  renderSchedule = (selected) => {
    const res = week.map((day, i) => (
      <tr key={i}>
        <td
          className="ScheduleTime DayColumn"
        >{displayWeek[i]}</td>
        {slots.map((slot, index) => (
          <td
            key={index}
            onClick={() => this.handleDateSelect({[day] : slot,})}
            className={`ScheduleTime ${selected.reduce((acc, el) => Object.keys(el)[0] === day && slot === el[day] ? true : acc, false) ? 'SelectedDate' : 'Unavailable Clickable'}`}
          ></td>
        ))}
      </tr>
    ));
    return (
      <table className="Schedule">
        <thead>
          <tr>
            <th>DAY</th>
            {slots.map((slot, index) => (<th key={index}>{slot}</th>))}
          </tr>
        </thead>
        <tbody>
          {res}
        </tbody>
      </table>
    )
  }

  renderImagePicker = () => {
    if (this.state.uploaded) return (
      <img className="img-company-reg-logo" name="logo" onChange={this.onFieldChange} src={this.state.imagePath} alt='company Logo'/>
    )
    return (
      <ReactFileReader base64={true} handleFiles={this.handleFiles}>
        <div className="logo-upload-container">
          <p className="logo-upload-text">upload image</p>
        </div>
      </ReactFileReader>
    )
  }

  render() {
    const image = this.renderImagePicker();
    return this.props.service === 'Services' ? (
      <PopUp
        unpop={this.props.unpop}
      >
        <div>
          {image}
        </div>
        <input ref={el => this.title = el} type="text" placeholder="Title"/>
        <input ref={el => this.description = el} type="textarea" placeholder="Description"/>
        <input ref={el => this.price = el} type="number" placeholder="Price"/>
        {this.renderSchedule(this.state.selectedDates)}
        <input
          onClick={() => this.handleCreate({title: this.title.value, price: this.price.value, info: this.description.value,})}
          type="submit"
          value="create"
        />
      </PopUp>
    ) : (
      <PopUp
        unpop={this.props.unpop}
      >
        <div>
          {image}
        </div>
        <input ref={el => this.title = el} type="text" placeholder="Title"/>
        <input ref={el => this.description = el} type="textarea" placeholder="Description"/>
        <input ref={el => this.price = el} type="number" placeholder="Price"/>
        <input
          onClick={() => this.handleCreate({title: this.title.value, price: this.price.value, info: this.description.value,})}
          type="submit"
          value="create"
        />
      </PopUp>
    );
  }
}

export default ProductAdd;
