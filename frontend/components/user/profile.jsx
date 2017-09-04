import React from 'react';
import { withRouter } from 'react-router-dom';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);

    this.delegateReservations = this.delegateReservations.bind(this);
    this.renderUpcomingReservations = this.renderUpcomingReservations.bind(this);
    this.renderPastReservations = this.renderPastReservations.bind(this);
  }

  componentWillMount() {
    if (!this.props.currentUser.username) {
      this.props.history.push('/');
    }
  }

  delegateReservations() {
    debugger
    this.upcomingReservations = [];
    this.pastReservations = [];
    const time = new Date();

    this.props.reservations.forEach((reservation) => {
      if (this.isUpcomingReservation(reservation)) {
        this.upcomingReservations.push(reservation);
      } else {
        this.pastReservations.push(reservation);
      }
    });
    debugger
  }

  isUpcomingReservation(reservation) {
    const theDate = new Date();

    const utcDate = new Date(theDate.getUTCFullYear(),
      theDate.getUTCMonth(), theDate.getUTCDate(),
      theDate.getUTCHours(), theDate.getUTCMinutes(),
      theDate.getUTCSeconds());

    return utcDate > reservation.time;
  }

  renderUpcomingReservations() {
    return this.upcomingReservations.map((reservation) => {
      return (
        <div>
          <h3>{reservation.id}</h3>
          <p>{reservation.time}</p>
        </div>
      );
    });
  }

  renderPastReservations() {
    return this.pastReservations.map((reservation) => {
      return (
        <div>
          <h3>{reservation.date}</h3>
          <p>{reservation.time}</p>
        </div>
      );
    });
  }


  render() {
    this.delegateReservations();

    return (
      <div>
        <h3>Hi</h3>
        <div>
          {this.renderUpcomingReservations()}
        </div>
        <div>
          {this.renderPastReservations()}
        </div>
      </div>
    );
  }
}

export default Restaurant;
