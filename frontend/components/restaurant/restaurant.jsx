import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchReservationsContainer from './search_reservations_container';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: ""
    };
  }

  componentDidMount() {
    this.props.requestSingleRestaurant(this.props.match.params.restaurantId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.restaurantId !== nextProps.match.params.restaurantId) {
      this.props.requestSingleRestaurant(nextProps.match.params.restaurantId);
    }
  }

  render() {
    if (!this.props.restaurant) return null;

    return (
      <div>
        <div className='restaurant-header-block'>
          <div className='header-image-div'>
            <img src='http://res.cloudinary.com/pangland/image/upload/c_scale,h_105,w_105/v1503603321/seemi-samuel-15564_sst0nn.jpg' />
          </div>
          <div className='header-info-div'>
            <h2>{this.props.restaurant.name}</h2>
            <span>Rating: {this.props.restaurant.rating}</span>
            <span>{this.props.restaurant.cuisine}    |    {this.props.restaurant.price}</span>
          </div>
        </div>

        <div className='horizontal-restaurant-blocks'>
          <nav className='floating-nav'>
            <ul>
              <li>All I want to do</li>
              <li>is see you turn into</li>
              <li>a giant woman</li>
            </ul>
          </nav>


          <div className='restaurant-mid'>
            <SearchReservationsContainer />

            <div className='description-block'>
              <h3>About {this.props.restaurant.name}</h3>
              <p>{this.props.restaurant.description}</p>
            </div>
          </div>

          <div className='info-block'>
            <ul>
              <li>Drowning in all this regret</li>
              <li>Wouldn't you rather forget</li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default Restaurant;
