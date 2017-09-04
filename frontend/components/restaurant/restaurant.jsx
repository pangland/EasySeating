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

    this.getAllReviews = this.getAllReviews.bind(this);
  }

  componentWillMount() {
    this.props.requestSingleRestaurant(
      this.props.match.params.restaurantId);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.match.params.restaurantId !== nextProps.match.params.restaurantId) {
  //     this.props.requestSingleRestaurant(nextProps.match.params.restaurantId);
  //   }
  // }

  getAllReviews() {
    return this.props.resataurants.restaurant.reviews.map((review) =>  {
      return (
        <div>
          <h3>{review.rating}</h3>
          <p>{review.body}</p>
        </div>
      );
    });
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
            <p>Rating: {this.props.restaurant.rating}</p>
            <span>{this.props.restaurant.cuisine}    |    [price here]</span>
          </div>
        </div>

        <div className='horizontal-restaurant-blocks'>
          <nav className='floating-nav'>
            <ul>
              <li>Reservation</li>
              <li>Description</li>
            </ul>
          </nav>


          <div className='restaurant-mid'>
            <SearchReservationsContainer />

            <div className='description-block'>
              <h3>About {this.props.restaurant.name}</h3>
              <p>{this.props.restaurant.description}</p>
            </div>

            <div className='review-block'>
              <button>Make Review</button>
            </div>
          </div>

          <div className='info-block'>
            <ul>
              <li>Cuisine: {this.props.restaurant.cuisine}</li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default Restaurant;
