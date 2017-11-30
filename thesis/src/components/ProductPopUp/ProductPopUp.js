import React, { Component, } from 'react';

import '../../App.css';
import './PopUp.css';

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    }
  }

  handleQuantity = (increment, ref) => {
    if (increment) {
      ref.value++;
    }
    else {
      ref.value--;
    }
    this.setState({quantity: ref.value,})
  }

  handleUserType = (event) => {
    console.log(event);
    if (event.target.value) this.setState({quantity: event.target.value,});
    else this.setState({quantity: 0,})
  }

  //==============================RENDERING

  renderSchedule = (schedule) => {
    const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',]
    const displayWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',]
    const days = Object.keys(schedule);
    const slots = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,]
    const res = week.map((el, i) => {
      if (~days.indexOf(el)) {
        return (
          <tr key={i}>
            <td className="ScheduleTime">{displayWeek[i]}</td>
            {slots.map((slot,index) => ~schedule[el].indexOf(slot)
              ? (<td key={index} className="ScheduleTime Available"></td>)
              : (<td key={index} className="ScheduleTime Unavailable"></td>)
            )}
          </tr>
        )
      } else {
        return (
          <tr key={i}>
            <td>{displayWeek[i]}</td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
            <td className="ScheduleTime Unavailable"></td>
          </tr>
        );
      }
    });
    return (
      <table className="Schedule">
        <thead>
          <tr>
            <th>DAY</th>
            <th>09</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
            <th>19</th>
            <th>20</th>
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
      ? this.renderSchedule(this.props.schedule)
      : '';
    console.log(this.props);
    return this.props.isService ? (
      <div className="PopUpDisplay">
        <div
          onClick={() => this.props.unpop({})}
          className="PopUpOverlay"
        >
        </div>
        <div className="PopUp">
          {/* <div style={{backgroundImage: `url(${this.props.image})`,}}className="PopUpImgWrap"> */}
          {/* </div> */}
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <h5>Price: {this.props.value}</h5>
          {schedule}
          {/* <table className="Schedule">
            <thead>
              <tr>
                <th>DAY</th>
                <th>09</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th>13</th>
                <th>14</th>
                <th>15</th>
                <th>16</th>
                <th>17</th>
                <th>18</th>
                <th>19</th>
                <th>20</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MON</td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
              </tr>
              <tr>
                <td>TUE</td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
              </tr>
              <tr>
                <td>WED</td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
              </tr>
              <tr>
                <td>THU</td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
              </tr>
              <tr>
                <td>FRI</td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
              </tr>
              <tr>
                <td>SAT</td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
              </tr>
              <tr>
                <td>SUN</td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
                <td className="ScheduleTime"></td>
              </tr>
            </tbody>
          </table> */}
          <input type="submit" />
        </div>
      </div>
    ) : (
      <div className="PopUpDisplay">
        <div
          onClick={() => this.props.unpop({})}
          className="PopUpOverlay"
        >
        </div>
        <div className="PopUp">
          <div style={{backgroundImage: `url(${this.props.image})`,}}className="PopUpImgWrap">
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
            />
            <input
              onClick={() => this.handleQuantity(true, this.quantity)}
              className="QuantityModifier"
              type="button"
              value="+"
            />
          </div>
          <input type="submit" value="buy"/>
        </div>
      </div>
    );
  }
}

export default PopUp;
