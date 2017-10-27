import React from 'react';
import SearchBarContainer from './search_bar_container';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import timezone from 'moment-timezone';

class SearchRestaurant extends React.Component {
  constructor(props) {
    super(props);
    if (window.searchParams) {
      this.state = window.searchParams;
    } else {
      this.state = {
        seats: "2",
        date: moment().tz("America/New_York").format("YYYY-MM-DD"),
        time: "7:30 AM",
        search: ""
      };
    }

    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.endDate = this.endDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTime = this.renderTime.bind(this);
  }

  componentWillMount() {
    let time;
    //
    if (this.state.date === moment().tz("America/New_York").format("YYYY-MM-DD")) {
      const currentTime = moment().tz("America/New_York");
      const remainder = 30 - currentTime.minute() % 30;
      time = moment(currentTime).add('m', remainder).format("h:mm A");

      if (moment(this.state.time, 'h:mm A') < moment(time, 'h:mm A')) {
        this.setState({time: time});
      }
    }
  }

  componentDidUpdate() {
    let time;
    //

    if (this.state.date === moment().tz("America/New_York").format("YYYY-MM-DD")) {
      const currentTime = moment().tz("America/New_York");
      const remainder = 30 - currentTime.minute() % 30;
      time = moment(currentTime).add('m', remainder).format("h:mm A");

      if (moment(this.state.time, 'h:mm A') < moment(time, 'h:mm A')) {
        this.setState({time: time});
      }
    }
  }

  componentDidMount() {
    // if (this.props.history.location !== "/restaurants") {
    //   this.props.removeRestaurants();
    // }

    this.props.removeSearchedRestaurants();
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  handleSearchBarChange(value) {
    this.setState({search: value});
  }

  endDate() {
    let theDate = new Date();
    theDate.setDate(theDate.getDate() + 7);

    const dd = theDate.getDate();
    const mm = theDate.getMonth() + 1;
    const y = theDate.getFullYear();

    return y + '-' + mm + '-' + dd;
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.removeRestaurants();
    window.searchParams = this.state;
    this.props.requestAllRestaurants(this.state).then(() => {
      this.props.history.push('/restaurants');
    });
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

  render() {
    const timeBlock = this.renderTime();

    return (
      <form className='search-restaurant-div'>
        <label className='search-restaurant-select-wrapper'>
          <select name='seats' defaultValue={this.state.seats}
            onChange={this.handleChange("seats")}>
            <option value='1'>1 person</option>
            <option value='2'>2 people</option>
            <option value='3'>3 people</option>
            <option value='4'>4 people</option>
          </select>
        </label>

        <label className='search-restaurant-select-wrapper'>
          <input type="date" id="date" name="date"
            onChange={this.handleChange("date")}
            defaultValue={this.state.date}
            min={moment().tz("America/New_York").format("YYYY-MM-DD")} max={this.endDate()} />
        </label>

        {timeBlock}

        <SearchBarContainer parentState={this.state}
          handleSearchBarChange={this.handleSearchBarChange} />
        <button onClick={this.handleSubmit}>Find seats!</button>
      </form>
    );
  }
}

export default withRouter(SearchRestaurant);
