import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import timezone from 'moment-timezone';

class SeatsTimeAndDate extends React.Component {
  constructor(props) {
    super(props);
    if (window.searchParams) {
      this.state = window.searchParams;
    } else {
      this.state = {
        seats: "2",
        date: moment().tz("America/New_York").format("YYYY-MM-DD"),
        time: "7:30 AM",
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.endDate = this.endDate.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.roundTime = this.roundTime.bind(this);
  }

  componentWillMount() {
    let time;

    if (this.state.date === moment().tz("America/New_York").format("YYYY-MM-DD")) {
      const currentTime = moment().tz("America/New_York");
      time = this.roundTime();

      if (moment('10:00 PM', 'h:mm A') < moment(currentTime, 'h:mm A')) {
        this.setState({
          time: moment('7:30 AM', 'h:mm A').format('h:mm A'),
          date: moment(this.state.date, 'YYYY-MM-DD').add(1, "days").format("YYYY-MM-DD")
        });
      } else if (moment(this.state.time, 'h:mm A') < moment(time, 'h:mm A')) {
        this.setState({time: time});
      }

      const properState = Object.assign({}, this.state, {time: time});
      this.props.handleAnyChange(properState);
    }
  }

  renderTime() {
    const endTime = moment("11:00", "H:mm").format("h:mm P");
    let time;
    let defaultTime;
    const options = [];


    if (this.state.date === moment().tz("America/New_York").format("YYYY-MM-DD") && moment('7:30 AM', 'h:mm A').isBefore(moment().tz("America/New_York"))) {
      time = this.roundTime();
    } else {
      time = moment("7:30", "H:mm").format("h:mm A");
    }

    let i = 0;
    while (time !== "11:30 PM") {
      options.push(<option key={i} value={time}>{time}</option>);
      time = moment(time, "h:mm A").add(30, 'm').format("h:mm A");
      i++;
    }

    const catching = this.state.time;

    return (
      <label className='search-restaurant-select-wrapper'>
        <select name="time" value={catching}
          onChange={this.handleChange.bind(this, "time")}>
          {options}
        </select>
      </label>
    );
  }

  roundTime() {
    let time;

    const currentTime = moment().tz("America/New_York");
    const remainder = 30 - currentTime.minute() % 30;
    return currentTime.add('m', remainder).format("h:mm A");
  }

  endDate() {
    return moment().tz("America/New_York").add(8, 'days').format("YYYY-MM-DD");
  }

  handleChange(field, e) {
    this.setState({[field]: e.currentTarget.value});
    this.props.handleAnyChange(Object.assign({}, this.state, {[field]: e.currentTarget.value}));
  }

  render() {
    const timeBlock = this.renderTime();

    return (
      <div>
        <label className='search-restaurant-select-wrapper'>
          <select className='left-select'
            onChange={this.handleChange.bind(this, "seats")} name='seats'
            defaultValue={this.state.seats}>
            <option value='1'>1 person</option>
            <option value='2'>2 people</option>
            <option value='3'>3 people</option>
            <option value='4'>4 people</option>
          </select>
        </label>

        <label className='search-restaurant-select-wrapper'>
          <input type="date" id="date" name="date" className='date'
            onChange={this.handleChange.bind(this, "date")}
            defaultValue={this.state.date}
            required='required'
            min={moment().tz("America/New_York").format("YYYY-MM-DD")}
            max={this.endDate()} />
        </label>

        {timeBlock}
      </div>
    );
  }
}

export default SeatsTimeAndDate;
