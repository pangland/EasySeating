import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchReservationsContainer from './search_reservations_container';
import ReactStars from 'react-stars';
import { StickyContainer, Sticky } from 'react-sticky';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: ""
    };

    this.getAllReviews = this.getAllReviews.bind(this);
    this.getReviewSummary = this.getReviewSummary.bind(this);
    this.renderCuisinePriceDiv = this.renderCuisinePriceDiv.bind(this);
  }

  componentWillMount() {
    if (typeof this.props.restaurant === 'undefined') {
      this.props.requestSingleRestaurant(
        this.props.match.params.restaurantId);
    }

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
      reviewAverages.rating += review.rating * (1 / reviewCount);
      reviewAverages.food += review.food * (1 / reviewCount);
      reviewAverages.service += review.service * (1 / reviewCount);
      reviewAverages.ambience += review.ambience * (1 / reviewCount);
      reviewAverages.value += review.value * (1 / reviewCount);
    });

    return (
      <div className='reviews-stats-overview'>
        <div className='overall-status'>
          <h1>{reviewAverages.rating}</h1>
          <div>
            <h3>Overall Rating</h3>
            <ReactStars count={5} size={20} half={true}
              value={Math.round(reviewAverages.rating)} edit={false}
              color2={'orange'}/>
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
    return this.props.restaurant.reviews.map((review) =>  {
      return (
        <div>
          <div className='topline'>
            <ReactStars count={5} size={25} color2={'orange'}
              value={review.rating} edit={false} />
            <span>{review.username} -- Dined on {review.date}</span>
          </div>
          <p>{review.body}</p>
        </div>
      );
    });
  }

  renderCuisinePriceDiv() {
    let priceText;
    switch (this.props.restaurant.price) {
      case '0':
        priceText = "Under $15";
        break;
      case '1':
        priceText = "$15 to $30";
        break;
      case '2':
        priceText = "$31 to $50";
        break;
      case '3':
        priceText = "$50 and over";
    }

    return (
      <div className='cuisine-price-r-div'>
        <span>{this.props.restaurant.cuisine}</span>
        <span>|</span>
        <span>{priceText}</span>
      </div>
    );
  }

  render() {
    if (!this.props.restaurant) return null;
    const reviews = this.getAllReviews();
    const reviewSummary = this.getReviewSummary();

    return (
      <StickyContainer className='restaurant-sticky'>
        <div>
          <div className='restaurant-header-block'>
            <div className='header-image-div'>
              <img src='http://res.cloudinary.com/pangland/image/upload/c_scale,h_150,r_5,w_150/v1503603321/seemi-samuel-15564_sst0nn.jpg' />
            </div>
            <div className='header-info-div'>
              <h2>{this.props.restaurant.name}</h2>
              <ReactStars count={5} size={30} half={true}
                value={this.props.restaurant.rating} edit={false}
                color2={'orange'}/>
              {this.renderCuisinePriceDiv()}
            </div>
          </div>

          <div className='horizontal-restaurant-blocks'>
            <div>
              <Sticky>
                {
                  ({
                    style,

                    // the following are also available but unused in this example
                    // isSticky,
                    // wasSticky,
                    // distanceFromTop,
                    // distanceFromBottom,
                    // calculatedHeight
                  }) => {
                    return (
                      <span style={style}>
                        ababababa
                      </span>
                    );
                  }
                }
              </Sticky>
            </div>


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
                <li>
                  <i className="fa fa-heart"></i> Favorite
                    Cuisine: {this.props.restaurant.cuisine}</li>
                </ul>
              </div>
            </div>
          </div>
      </StickyContainer>
    );
  }
}

export default Restaurant;
