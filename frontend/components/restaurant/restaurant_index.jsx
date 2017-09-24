import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

class RestaurantIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleReservation = this.handleReservation.bind(this);
    this.availableReservations = this.availableReservations.bind(this);
  }

  componentWillUnmount() {
    // this.props.removeRestaurants();
  }

  handleReservation(resId) {
    return (event) => {
      if (this.props.currentUser) {
        this.props.createReservation({id: resId, user_id: this.props.currentUserId})
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

  availableReservations(reservations) {
    return reservations.map((res, index) => {
      return (
        <li key={index} className='search-list-item'>
          <button onClick={this.handleReservation(res.id)}>
            {moment(this.props.reservations[res.id].time)
              .tz('America/New_York').format('h:mm A')}
          </button>
        </li>
      );
    });
  }

  render() {
    const restaurants = this.props.restaurants.map((restaurant, index) => {
      return (
        <li key={index}>
          <div className='restaurant-block'>
            <Link to={`/restaurant/${restaurant.id}`}>
              <img src="http://res.cloudinary.com/pangland/image/upload/c_scale,h_150,w_150/v1503603321/seemi-samuel-15564_sst0nn.jpg"/>
            </Link>
            <div className='restaurant-details'>
              <Link to={`/restaurant/${restaurant.id}`}>
                <h3>{restaurant.name}</h3>
              </Link>
              <span>{restaurant.cuisine}</span>
              <ul className='reservations-in-range'>
                {this.availableReservations(restaurant.reservations)}
              </ul>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div>
        <ul className='restaurant-list'>
          {restaurants}
        </ul>
        <div id="snackbar">Please sign in to reserve seats</div>
      </div>
    );
  }
}

export default RestaurantIndex;
