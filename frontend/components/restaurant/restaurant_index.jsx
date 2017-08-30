import React from 'react';
import { withRouter } from 'react-router-dom';

class RestaurantIndex extends React.Component {
  render() {
    console.log('hi');
    return (
      <div>
        <h3> I know I'm not that tall [beat] [beat] I know I'm not that smart </h3>
        <h3> But let me drive me van into your heart ~~</h3>
        <p>{this.props.restaurants}</p>
      </div>
    );
  }
}

export default RestaurantIndex;
