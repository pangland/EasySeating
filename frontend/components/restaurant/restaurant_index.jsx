import React from 'react';
import { withRouter } from 'react-router-dom';

class RestaurantIndex extends React.Component {
  componentDidMount() {
    this.props.restaurants.map((restaurant, idx) => {
      this.props.searchReservations(restaurant);
    });
  }

  render() {
    return (
      <div>
        <h3> I know I'm not that tall [beat] [beat] I know I'm not that smart </h3>
        <h3> But let me drive me van into your heart ~~</h3>
      </div>
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
