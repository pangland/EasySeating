import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchReservationsContainer from './search_reservations_container';
import ReactStars from 'react-stars';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: ""
    };

    this.getAllReviews = this.getAllReviews.bind(this);
    this.getReviewSummary = this.getReviewSummary.bind(this);
  }

  componentWillMount() {
    this.props.requestSingleRestaurant(
      this.props.match.params.restaurantId);

    // this.props.requestSingleRestaurant(
    //   this.props.match.params.restaurantId)
    //   .then(e => this.props.receiveAllReviews(e.restaurant));

    // this.props.receiveAllReviews();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.match.params.restaurantId !== nextProps.match.params.restaurantId) {
  //     this.props.requestSingleRestaurant(nextProps.match.params.restaurantId);
  //   }
  // }

  getReviewSummary() {
    const reviewAverages = {
      rating: 0,
      food: 0,
      service: 0,
      ambience: 0,
      value: 0
    };

    const reviewCount = this.props.restaurant.reviews.length;
    this.props.restaurant.reviews.forEach((review) => {
      reviewAverages.rating += review.rating * reviewCount;
      reviewAverages.food += review.food + reviewCount;
      reviewAverages.service += review.service + reviewCount;
      reviewAverages.ambience += review.ambience + reviewCount;
      reviewAverages.value += review.value + reviewCount;
    });

    return (
      <div className='reviews-stats-overview'>
        <div className='overall-status'>
          <h1>{reviewAverages.rating}</h1>
          <div>
            <h3>Overall Rating</h3>
            <ReactStars count={5} size={20} half="true"
              value={Math.round(reviewAverages.rating)} edit="false"/>
          </div>
        </div>

        <div className='subreview-averages'>
          <div>
            <h5>Food</h5>
            <span>{reviewAverages.food}</span>
          </div>

          <div>
            <h5>Service</h5>
            <span>{reviewAverages.service}</span>
          </div>

          <div>
            <h5>Ambience</h5>
            <span>{reviewAverages.ambience}</span>
          </div>

          <div>
            <h5>Value</h5>
            <span>{reviewAverages.value}</span>
          </div>
        </div>
      </div>
    );
  }

  getAllReviews() {
    debugger
    return this.props.restaurant.reviews.map((review) =>  {
      return (
        <div>
          <ReactStars count={5} size={20}
            value={review.rating} edit="false"/>
          <p>{review.body}</p>
        </div>
      );
    });
  }

  render() {

    if (!this.props.restaurant) return null;
    const reviews = this.getAllReviews();
    const reviewSummary = this.getReviewSummary();

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

            <div className='description-block'>
              <div className='review-summary-block'>
                <div className='review-summary-header-div'>
                  <h3>
                    {this.props.restaurant.name} Ratings and Reviews
                  </h3>
                </div>
                {reviewSummary}
              </div>

              <div className='reviews-block'>
                {reviews}
              </div>
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
