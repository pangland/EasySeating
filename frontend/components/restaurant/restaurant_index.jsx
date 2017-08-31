import React from 'react';
import { withRouter } from 'react-router-dom';

class RestaurantIndex extends React.Component {
  componentDidMount() {
    this.props.restaurants.map((restaurant, idx) => {
      this.props.searchReservations(restaurant);
    });
  }

  render() {
    debugger
    return (
      <div>
        <h3> I know I'm not that tall [beat] [beat] I know I'm not that smart </h3>
        <h3> But let me drive me van into your heart ~~</h3>
      </div>
    );
  }
}

export default RestaurantIndex;
