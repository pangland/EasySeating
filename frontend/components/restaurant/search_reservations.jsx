import React from 'react';
import { withRouter } from 'react-router-dom';
import SeatsTimeAndDate from './seats_time_and_date';
import moment from 'moment';
import { defaultInputs } from '../../util/default_state';

class SearchReservations extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultInputs();
    this.state['restaurantId'] = this.props.match.params.restaurantId;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
    this.handleAnyChange = this.handleAnyChange.bind(this);
  }

  componentWillUnmount() {
    this.props.removeReservations();
  }

  handleAnyChange(state) {
    this.setState(Object.assign({}, this.state, state));
  }

  handleSubmit(e) {
    window.searchParams = this.state;
    this.state.input = e.currentTarget.value;
    this.props.removeReservations();
    this.props.searchReservations(this.state);
  }

  handleReservation(resId) {
    return (event) => {
      if (this.props.currentUser) {
        this.props.createReservation({id: resId, user_id: this.props.currentUserId})
          .then(() => {
            this.props.history.replace('/my');
          });
      } else {
        const temp = document.getElementById("snackbar");
        temp.className = "show";
        setTimeout(() => temp.className = temp.className.replace("show", ""), 3000);
      }
    };
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

    return (
      <div id="res-one" name="res-one" className = 'fancy-res-search'>
        <h2>Find your seats!</h2>
        <div className='search-restaurant-div'>
          <SeatsTimeAndDate handleAnyChange={this.handleAnyChange}
            parentState={this.state} />
          <button className="find-stuff-button"
            onClick={this.handleSubmit}>Find Slots</button>
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
