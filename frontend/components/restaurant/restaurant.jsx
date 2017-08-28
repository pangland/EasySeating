import React from 'react';
import { withRouter } from 'react-router-dom';

class Restaurant extends React.Component {
  componentDidMount() {
    this.props.requestSingleRestaurant(this.props.match.params.restaurantId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.restaurantId !== nextProps.match.params.restaurantId) {
      this.props.requestSinglePokemon(nextProps.match.params.restaurantId);
    }
  }

  render() {
    if (!this.props.restaurant) return null;

    return (
      <div>
        <div className='restaurant-header-block'>
          <h2>{this.props.restaurant.name}</h2>
          <span>Rating: {this.props.restaurant.rating}</span>
          <span>{this.props.restaurant.cuisine}    |    {this.props.restaurant.price}</span>
        </div>

        <div className='horizontal-restaurant-blocks'>
          <nav className='floating-nav'>
            <ul>
              <li>All I want to do</li>
              <li>is see you turn into</li>
              <li>a giant woman</li>
            </ul>
          </nav>


          <div className='all-home-stuff'>
            <div className='fancy-search'>
              <h2>Reserve your seats!</h2>
            </div>

            <div className='description-block'>
              <h3>About {this.props.restaurant.name}</h3>
              <p>{this.props.restaurant.description}</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Restaurant;
