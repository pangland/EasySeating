import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import timezone from 'moment-timezone';

class SeatsTimeAndDate extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.endDate = this.endDate.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.roundTime = this.roundTime.bind(this);
  }

  componentWillMount() {
    let time;
    const dateStyle = 'YYYY-MM-DD';

    if (this.props.parentState.date === moment().tz("America/New_York")
        .format(dateStyle)) {
      const currentTime = moment().tz("America/New_York");
      time = this.roundTime();

      if (moment('10:00 PM', 'h:mm A') < moment(currentTime, 'h:mm A')) {
        const date = this.props.parentState.date;

        this.props.handleAnyChange({
          time: moment('7:30 AM', 'h:mm A').format('h:mm A'),
          date: moment(date, dateStyle).add(1, "days").format(dateStyle)
        });
      } else if (moment(this.props.parentState.time, 'h:mm A') < moment(time, 'h:mm A')) {
        this.props.handleAnyChange({time: time});
      }
    }
  }

  roundTime() {
    const currentTime = moment().tz("America/New_York");
    const remainder = 30 - currentTime.minute() % 30;
    return currentTime.add('m', remainder).format("h:mm A");
  }

  endDate() {
    return moment().tz("America/New_York").add(8, 'days').format("YYYY-MM-DD");
  }

  handleChange(field, e) {
    if (e.currentTarget.value === moment().tz("America/New_York")
        .format('YYYY-MM-DD')) {
      const time = this.roundTime();
      this.props.handleAnyChange({
        [field]: e.currentTarget.value,
        time: time
      });
    } else {
      this.props.handleAnyChange(
        Object.assign({[field]: e.currentTarget.value})
      );
    }
  }

  renderTime() {
    let time;
    let defaultTime;
    const endTime = moment("11:00", "H:mm").format("h:mm P");
    const options = [];

    if (
      this.props.parentState.date === moment().tz("America/New_York").format("YYYY-MM-DD")
      && moment('7:30 AM', 'h:mm A').isBefore(moment().tz("America/New_York"))
    ) {
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

    return (
      <label className='search-restaurant-select-wrapper'>
        <select name="time" value={this.props.parentState.time}
          onChange={this.handleChange.bind(this, "time")}>
          {options}
        </select>
      </label>
    );
  }

  render() {
    const timeBlock = this.renderTime();

    return (
      <div>
        <label className='search-restaurant-select-wrapper'>
          <select className='left-select'
            onChange={this.handleChange.bind(this, "seats")} name='seats'
            defaultValue={this.props.parentState.seats}>
            <option value='1'>1 person</option>
            <option value='2'>2 people</option>
            <option value='3'>3 people</option>
            <option value='4'>4 people</option>
          </select>
        </label>

        <label className='search-restaurant-select-wrapper'>
          <input type="date" id="date" name="date" className='date'
            onChange={this.handleChange.bind(this, "date")}
            value={this.props.parentState.date}
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
