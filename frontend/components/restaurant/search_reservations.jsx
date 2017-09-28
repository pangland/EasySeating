import React from 'react';
import moment from 'moment';
import timezone from 'moment-timezone';
import { withRouter } from 'react-router-dom';

class SearchReservations extends React.Component {
  constructor(props) {
    super(props);

    if (window.searchParams) {
      this.state = window.searchParams;
    } else {
      this.state = {
        seats: "2",
        date: moment().tz("America/New_York").format("YYYY-MM-DD"),
        time: "7:30 AM",
        search: "",
        restaurantId: this.props.match.params.restaurantId
      };
    }

    // this.state = {
    //   restaurantId: this.props.match.params.restaurantId,
    //   seats: "2",
    //   date: new Date().toJSON().slice(0,10),
    //   time: "8:00 a.m."
    // };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
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

  endDate() {
    let theDate = new Date();
    theDate.setDate(theDate.getDate() + 50);

    const dd = theDate.getDate();
    const mm = theDate.getMonth() + 1;
    const y = theDate.getFullYear();

    return y + '-' + mm + '-' + dd;
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  handleSubmit(e) {

    this.state.input = e.currentTarget.value;
    this.props.removeReservations();
    this.props.searchReservations(this.state);
  }

  handleReservation(res_id) {
    return (event) => {
      if (this.props.currentUser) {
        this.props.createReservation({id: res_id, user_id: this.props.currentUserId})
          .then(() => {
            this.props.history.push('/my');
          });
      } else {
        const temp = document.getElementById("snackbar");
        temp.className = "show";
        setTimeout(() => temp.className = temp.className.replace("show", ""), 3000);
      }
    };
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

  componentWillUnmount() {
    this.props.removeReservations();
  }

  render() {

    let listFive;
    if (typeof this.props.reservations !== 'undefined') {
      listFive = this.props.reservations.map((reservation, index) => {
        return (
          <li key={index} className='search-list-item-button'>
            <button onClick={this.handleReservation(reservation.id)}>
              {moment(reservation.slot.time, 'YYYY-MM-DDTHH:mm:ss.SSSSZ')
                .tz("America/New_York").format("h:mm A")}
            </button>
          </li>
        );
      });
    } else {
      listFive = null;
    }

    const timeBlock = this.renderTime();
    
    return (
      <div id="res-one" name="res-one" className = 'fancy-res-search'>
        <h2>Find your seats!</h2>
        <div className='search-restaurant-div'>
          <label className='search-restaurant-select-wrapper'>
            <select onChange={this.handleChange("seats")} name='seats'
              defaultValue='2'>
              <option value='1'>1 person</option>
              <option value='2'>2 people</option>
              <option value='3'>3 people</option>
              <option value='4'>4 people</option>
              <option value='5'>5 people</option>
            </select>
          </label>

          <label className='search-restaurant-select-wrapper'>
            <input onChange={this.handleChange("date")} type="date"
              id="date" name="date"
              defaultValue={moment().tz("America/New_York").format("YYYY-MM-DD")}
              min={moment().tz("America/New_York").format("YYYY-MM-DD")} max={this.endDate()} />
          </label>

          {timeBlock}
          <button onClick={this.handleSubmit}>Find Slots</button>
        </div>

        <ul className='reservations-in-range'>
          {listFive}
        </ul>

        <div id="snackbar">Please sign in to reserve seats</div>
      </div>
    );
  }
}

export default withRouter(SearchReservations);
