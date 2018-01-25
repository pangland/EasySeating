import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchReservationsContainer from './search_reservations_container';
import ReactStars from 'react-stars';
import { StickyContainer, Sticky } from 'react-sticky';
import Scrollchor from 'react-scrollchor';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: ""
    };

    this.turnOffURL = this.turnOffURL.bind(this);
  }

  componentWillMount() {
    if (typeof this.props.restaurant === 'undefined') {
      this.props.requestSingleRestaurant(this.props.match.params.restaurantId);
    }
  }

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
    if (this.props.restaurant.reviews) {
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
    } else {
      return null;
    }
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

  turnOffURL(e) {
    function goToByScroll() {
      $('html,body').animate({scrollTop: $(`${e.currentTarget.hash}`)
        .offset().top},'slow');
    }

    goToByScroll();
    e.preventDefault();
    return false;
  }

  render() {
    if (!this.props.restaurant) return null;
    const reviews = this.getAllReviews();
    const reviewSummary = this.getReviewSummary();
    const restaurant = this.props.restaurant;

    return (
        <div>
          <div className='restaurant-header-block'>
            <div className='header-image-div'>
              <img src={this.props.restaurant.image_url} height='150px'
                width='150px' />
            </div>
            <div className='header-info-div'>
              <h2>{this.props.restaurant.name}</h2>
              <ReactStars count={5} size={30} half={true}
                value={Math.round(this.props.restaurant.rating)} edit={false}
                color2={'orange'}/>
              {this.renderCuisinePriceDiv()}
            </div>
          </div>

          <div className='horizontal-restaurant-blocks'>
            <div className="floating-nav">
              <StickyContainer className='restaurant-sticky'
                style={{height: 1000, width: 155.73, padding: '0 30px'}}
                >
              <Sticky>
                {
                  ({
                    style
                  }) => {
                    return (
                      <ul className="make-red" style={style}>
                        <li><a onClick={this.turnOffURL} id='rid1'
                          href='#res-one'>Reservations</a></li>
                        <li><a onClick={this.turnOffURL} id='rid2'
                          href="#description">Description</a></li>
                        <li><a href="#reviews" id='rid3'
                          onClick={this.turnOffURL}>Reviews</a></li>
                      </ul>
                    );
                  }
                }
              </Sticky>
            </StickyContainer>
            </div>


            <div className='restaurant-mid'>
              <SearchReservationsContainer />

              <div id="description" name="description"
                className='description-block'>
                <h3>About {this.props.restaurant.name}</h3>
                <p>{this.props.restaurant.description}</p>
              </div>

              <div className='description-block'>
                <div id='reviews' className='review-summary-block'>
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
                  <h4><i className="fa fa-clock-o"></i>Hours of Operation:</h4>
                  <span>
                    {
                      this.props.restaurant.hours === "1"
                        ? "7:30 AM to 10:00 PM" : "11:00 AM to 11:00 PM"
                    }
                  </span>
                </li>
                <li>
                  <h4><i className="fa fa-cutlery"></i> Cuisine:</h4>
                  <span>{restaurant.cuisine}</span>
                </li>
                <li>
                  <h4><i className="fa fa-money"></i> Price Range:</h4>
                  <span>
                    {
                      restaurant.price === "0" ? "Under $15"
                        : restaurant.price === "1" ? "$15 to $30"
                          :  restaurant.price === "2" ? "$31 to $50"
                            : "$50 and over"
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default Restaurant;
