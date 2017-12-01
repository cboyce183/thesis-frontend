import React, { Component, } from 'react';

import '../../App.css';
import './ProductPopUp.css';

import PopUp from '../PopUp/PopUp';

const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',]
const displayWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',]
const slots = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,]

class ProductPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: [],
      quantity: 1,
      buttonText: 'buy',
      buttonClass: '',
      availableSlots: this.props.schedule,
    }
  }

  handleQuantity = (increment, ref) => {
    if (increment) {
      ref.value++;
    }
    else if (!increment && ref.value > 0) {
      ref.value--;
    } else {
      ref.value = 0;
    }
    this.setState({quantity: ref.value,})
  }

  handleDateSelect(object) {
    const day = Object.keys(object)[0];
    const repeat = this.state.selectedDates.reduce((acc, el) => Object.keys(el)[0] === day && el[day] === object[day] ? true : acc, false);
    if (!this.state.availableSlots[day] || !~this.state.availableSlots[day].indexOf(object[day])) console.log('invalid day')
    else if (repeat) {
      const newSelectedDates = this.state.selectedDates.filter(el => Object.keys(el)[0] !== day || el[day] !== object[day])
      this.setState({selectedDates: newSelectedDates,});
    }
    else this.setState({selectedDates: [...this.state.selectedDates, object,],})
  }

  handleUserType = (event) => {
    if (event.target.value) this.setState({quantity: event.target.value,});
    else this.setState({quantity: 0,})
  }

  handleResetValue = (event) => {
    if (event.target.value < 0) event.target.value = 1;
    this.setState({quantity: 1,})
  }

  handleButtonStates = (state) => {
    switch (state) {
    case 1:
      this.setState({buttonText: 'please select an amount', buttonClass: 'Error',});
      setTimeout(() => this.handleButtonStates(), 3000);
      return;
    case 2:
      this.setState({buttonText: 'please select a date', buttonClass: 'Error',});
      setTimeout(() => this.handleButtonStates(), 3000);
      return;
    case 3:
      this.setState({buttonText: 'success!', buttonClass: 'Success',});
      setTimeout(() => this.handleButtonStates(), 3000);
      return;
    case 4:
      this.setState({buttonText: 'not enough zen', buttonClass: 'Error',});
      setTimeout(() => this.handleButtonStates(), 3000);
      return;
    default:
      this.setState({buttonText: 'buy', buttonClass: '',});
      return;
    }
  }

  handleProductBuy = () => {
    console.log('here!!!!!');
    const finalPrice = this.props.isService
      ? this.props.value * this.state.selectedDates.length
      : this.props.value * this.state.quantity;
    const finalDates = this.props.isService
      ? this.props.selectedDates
      : null;
    const finalQuantity = this.props.isService
      ? null
      : this.props.quantity;
    if (finalPrice === 0 && this.props.isService) this.handleButtonStates(2);
    else if (finalPrice === 0 && !this.props.isService) this.handleButtonStates(1);
    else if (finalPrice > this.props.available) this.handleButtonStates(4);
    else {
      fetch(`https://private-3a61ed-zendama.apiary-mock.com/product/${this.props.id}`, {
        method: 'POST',
        body: JSON.stringify({
          isService: this.props.isService,
          quantity: finalQuantity,
          dates: finalDates,
          price: finalPrice,
        }),
      }).then(res => this.handleButtonStates(3));
    }
  }

  //==============================RENDERING

  renderSchedule = (schedule, selected) => {
    const days = Object.keys(schedule);
    const res = week.map((day, i) => ~days.indexOf(day)
      ? (
        <tr key={i}>
          <td
            className="ScheduleTime DayColumn"
          >{displayWeek[i]}</td>
          {slots.map((slot,index) => ~schedule[day].indexOf(slot)
            ? (
              <td
                key={index}
                onClick={() => this.handleDateSelect({[day] : slot,})}
                className={`ScheduleTime ${selected.reduce((acc, el) => Object.keys(el)[0] === day && slot === el[day] ? true : acc, false) ? 'SelectedDate' : 'Available'}`}
              ></td>
            ) : (
              <td
                key={index}
                className="ScheduleTime Unavailable"
              ></td>
            )
          )}
        </tr>
      ) : (
        <tr key={i}>
          <td
            className="ScheduleTime DayColumn"
          >{displayWeek[i]}</td>
          {slots.map((slot, index) => (<td key={index} className="ScheduleTime Unavailable"></td>))}
        </tr>
      )
    );
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

  render() {
    const schedule = this.props.isService
      ? this.renderSchedule(this.props.schedule, this.state.selectedDates)
      : '';
    return this.props.isService ? (
      <PopUp
        unpop={this.props.unpop}
      >
        <div style={{backgroundImage: `url(${this.props.image})`,}} className="PopUpImgWrapService">
        </div>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <h5>Price: {this.state.selectedDates.length
          ? this.props.value * this.state.selectedDates.length
          : this.props.value}</h5>
        {schedule}
        <input
          type="submit"
          className={`PopUpBuyButton ${this.state.buttonClass}`}
          value={this.state.buttonText}
          onClick={this.handleProductBuy}
        />
      </PopUp>
    ) : (
      <PopUp
        unpop={this.props.unpop}
      >
        <div style={{backgroundImage: `url(${this.props.image})`,}} className="PopUpImgWrap">
        </div>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <h5>Price: {this.props.value * this.state.quantity}</h5>
        <div className="QuantitySelector">
          <input
            onClick={() => this.handleQuantity(false, this.quantity)}
            className="QuantityModifier Minus"
            type="button"
            value="-"
          />
          <input
            className="QuantityInput"
            type="number"
            ref={el => this.quantity = el}
            defaultValue="1"
            onChange={this.handleUserType}
            onBlur={this.handleResetValue}
          />
          <input
            onClick={() => this.handleQuantity(true, this.quantity)}
            className="QuantityModifier"
            type="button"
            value="+"
          />
        </div>
        <input
          type="submit"
          className={`PopUpBuyButton ${this.state.buttonClass}`}
          value={this.state.buttonText}
          onClick={this.handleProductBuy}
        />
      </PopUp>
    );
  }
}

export default ProductPopUp;