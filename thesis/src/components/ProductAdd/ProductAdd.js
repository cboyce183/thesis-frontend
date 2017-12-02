import React, { Component, } from 'react';

import '../../App.css';
import './ProductAdd.css';

import PopUp from '../PopUp/PopUp';

const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',]
const displayWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',]
const slots = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,]

class ProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: [],
      quantity: 1,
      buttonText: this.props.isAdmin ? 'delete' : 'buy',
      buttonClass: '',
      availableSlots: this.props.schedule,
    }
  }

  handleProductBuy = () => {
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
                style={this.props.isAdmin ? {cursor:'default',} : null}
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
          {slots.map((slot, index) => (
            <td
              key={index}
              className="ScheduleTime Unavailable"
            ></td>
          ))}
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
      : null;
    return this.props.service === 'Services' ? (
      <PopUp
        unpop={this.props.unpop}
      >
      </PopUp>
    ) : (
      <PopUp
        unpop={this.props.unpop}
      >
      hello
      </PopUp>
    );
  }
}

export default ProductAdd;
