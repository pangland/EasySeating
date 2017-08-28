import React from 'react';
import { withRouter } from 'react-router-dom';

class Restaurant extends React.Component {
  render() {
    debugger
    return (
      <div>
        this.props.restaurant.name;
        this.props.restaurant.description;
        this.props.restaurant.cuisine;
      </div>
    );
  }
}

export default Restaurant;
