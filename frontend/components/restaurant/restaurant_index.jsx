import React from 'react';
import { withRouter } from 'react-router-dom';

class RestaurantIndex extends React.Component {
  constructor(props) {
    super(props);
    this.get_eligible_restaurants = this.get_eligible_restaurants.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
    this.available_reservations = this.available_reservations.bind(this);
  }

  get_eligible_restaurants() {
    this.eligible_restaurants = [];
    this.props.restaurants.forEach((restaurant, index) => {
      if (restaurant.reservations.length > 0) {
        this.eligible_restaurants.push(restaurant);
      }
    });
  }

  handleReservation(res_id) {
    return (event) => {
      if (this.props.currentUser) {
        this.props.createReservation({id: res_id, user_id: this.props.currentUserId});
      } else {
        const temp = document.getElementById("snackbar");
        temp.className = "show";
        setTimeout(() => temp.className = temp.className.replace("show", ""), 3000);
      }
    };
  }

  available_reservations(reservations) {
    return reservations.map((reservation, index) => {
      return (
        <li key={index} className='search-list-item'>
          <button onClick={this.handleReservation(reservation.id)}>
            {new Date(reservation.time).toString().slice(16,21)}
          </button>
        </li>
      );
    });
  }

  render() {
    this.get_eligible_restaurants();
    const restaurants = this.eligible_restaurants.map((restaurant, index) => {
      return (
        <li key={index}>
          <div className='restaurant-block'>
            <img src="http://res.cloudinary.com/pangland/image/upload/c_scale,h_150,w_150/v1503603321/seemi-samuel-15564_sst0nn.jpg"/>
            <div className='restaurant-details'>
              <h3>{restaurant.name}</h3>
              <span>{restaurant.cuisine}</span>
              <ul className='reservations-in-range'>
                {this.available_reservations(restaurant.reservations)}
              </ul>
            </div>
          </div>
        </li>
      );
    });

    return (
      <ul className='restaurant-list'>
        {restaurants}
      </ul>
    );
  }
}

// if (typeof this.props.reservations !== 'undefined') {
//   listFive = this.props.reservations.map((reservation, index) => {
//     return (
//       <li key={index} className='search-list-item'>
//         <button value={reservation.id} onClick={this.handleReservation}>
//           {new Date(reservation.slot.time).toString().slice(16,21)}
//         </button>
//       </li>
//     );
//   });
// } else {
//   listFive = null;
// }


/* psuedocode:
  reservations for a restaurant block:


  restaurant block:
  <div className='restaurant-block'>
    <img src='~~~' />
    <div className='restaurant-details'>
      <h3>{restaurant.name}</h3>
      <span>{restaurant.cuisine}</span>
      <ul>
        {available reservations}
      </ul>
    </div>
  </div>

*/

export default RestaurantIndex;