import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import timezone from 'moment-timezone';

class TimeAndDate extends React.Component {
  constructor(props) {
    super(props);
    if (window.searchParams) {
      this.state = window.searchParams;
    } else {
      this.state = {
        date: moment().tz("America/New_York").format("YYYY-MM-DD"),
        time: "7:30 AM",
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.endDate = this.endDate.bind(this);
    this.renderTime = this.renderTime.bind(this);
  }

  componentWillMount() {
    let time;

    if (this.state.date === moment().tz("America/New_York").format("YYYY-MM-DD")) {
      const currentTime = moment().tz("America/New_York");
      const remainder = 30 - currentTime.minute() % 30;
      time = moment(currentTime).add('m', remainder).format("h:mm A");
      time = currentTime.add('m', remainder).format("h:mm A");

      if (moment('10:00 PM', 'h:mm A').isBefore(moment(currentTime, 'h:mm A'))) {
        this.setState({
          time: moment('7:30 AM', 'h:mm A').format('h:mm A'),
          date: moment(this.state.date, 'YYYY-MM-DD').add(1, "days").format("YYYY-MM-DD")
        });
      } else if (moment(this.state.time, 'h:mm A') < moment(time, 'h:mm A')) {
        this.setState({time: time});
      }
    }
  }

  componentDidUpdate() {
    let time;

    if (this.state.date === moment().tz("America/New_York").format("YYYY-MM-DD")) {
      const currentTime = moment().tz("America/New_York");
      const remainder = 30 - currentTime.minute() % 30;
      time = moment(currentTime).add('m', remainder).format("h:mm A");

      if (moment(time, 'h:mm A') > moment('10:00 PM')) {
        this.setState({
          time: moment('7:30 AM', 'h:mm A'),
          date: moment(this.state.date, 'YYYY-MM-DD').add(1, "days")
        });
      } else if (moment(this.state.time, 'h:mm A') < moment(time, 'h:mm A')) {
        this.setState({time: time});
      }
    }
  }

  renderTime() {
    // let time = moment("7:30", "H:mm").format("h:mm A");
    const endTime = moment("11:00", "H:mm").format("h:mm P");
    let time;
    let defaultTime;
    const options = [];


    if (this.state.date === moment().tz("America/New_York").format("YYYY-MM-DD")) {
      const currentTime = moment().tz("America/New_York");
      const remainder = 30 - currentTime.minute() % 30;
      time = moment(currentTime).add('m', remainder).format("h:mm A");
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
          onChange={this.handleChange("time")}>
          {options}
        </select>
      </label>
    );
  }

  endDate() {
    let theDate = new Date();
    theDate.setDate(theDate.getDate() + 7);

    const dd = theDate.getDate();
    const mm = theDate.getMonth() + 1;
    const y = theDate.getFullYear();

    return y + '-' + mm + '-' + dd;
  }

  render() {
    const timeBlock = this.renderTime();

    return (
      <div>
        <label className='search-restaurant-select-wrapper'>
          <input type="date" id="date" name="date"
            onChange={this.handleChange("date")}
            defaultValue={this.state.date}
            min={moment().tz("America/New_York").format("YYYY-MM-DD")} max={this.endDate()} />
        </label>

        {timeBlock}
      </div>
    );
  }
}

export default TimeAndDate;
