import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReviewForm from './review_form';
import ReactStars from 'react-stars';
import ProfileContainer from './profile_container';
import moment from 'moment';
import timezone from 'moment-timezone';
import {StickyContainer, Sticky} from 'react-sticky';

const style = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(0, 0, 0, .25)',
    zIndex          : 10
  },
  content : {
    display         : 'flex',
    flexDirection  : 'column',
    position        : 'fixed',
    top             : '50%',
    left            : '50%',
    marginRight     : '-50%',
    transform       : 'translate(-50%, -50%)',
    border          : '1px solid white',
    padding         : '0px',
    zIndex          : 11,
    width           : '640px',
    boxSizing       : 'border-box',
    height          : '500px'
  }
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      reservation: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.turnOffURL = this.turnOffURL.bind(this);
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
  }

  componentWillMount() {
    if (!this.props.currentUser.username) {
      this.props.history.push('/');
    }

    return <ProfileContainer />;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScrollEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScrollEvent);
  }

  handleScrollEvent() {
    const height = window.pageYOffset;
    const resOnePos = $('#upcoming-res').offset().top;
    const descriptionPos = $('#past-res').offset().top;
    const reviewsPos = $('#favorites').offset().top;

    if (height >= reviewsPos) {
      document.getElementById('pid1').classList.remove('in-range');
      document.getElementById('pid2').classList.remove('in-range');
      document.getElementById('pid3').classList.add('in-range');
    } else if (height >= descriptionPos) {
      document.getElementById('pid1').classList.remove('in-range');
      document.getElementById('pid2').classList.add('in-range');
      document.getElementById('pid3').classList.remove('in-range');
    } else if (height >= resOnePos) {
      document.getElementById('pid1').classList.add('in-range');
      document.getElementById('pid2').classList.remove('in-range');
      document.getElementById('pid3').classList.remove('in-range');
    }
  }

  openModal(reservation) {
    // this.props.removeErrors();
    this.setState({
      modalOpen: true,
      reservation: reservation
    });
  }

  closeModal() {
    this.setState({ modalOpen: false });
    this.props.removeErrors();
    this.forceUpdate();
  }

  handleFavorite(restaurantId) {
    this.props.createFavorite({
      user_id: this.props.currentUser.id,
      restaurant_id: restaurantId
    }).then(() => {
      this.forceUpdate();
    });
  }

  removeFavorite(restaurantId) {
    const favorites = this.props.favorites;
    let favorite;
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].restaurant_id === restaurantId) {
        favorite = favorites[i];
        break;
      }
    }

    this.props.removeFavorite({
      id: favorite.id,
      restaurantId: favorite.restaurant_id,
      userId: favorite.user_id
    }).then(() => {
      this.forceUpdate();
    });
  }

  delegateReservations() {
    this.upcomingReservations = [];
    this.pastReservations = [];
    const time = new Date();
    this.props.reservations.forEach((reservation) => {

      if (this.isUpcomingReservation(reservation) &&
        reservation.user_id === this.props.currentUser.id) {
        this.upcomingReservations.push(reservation);
      } else if (reservation.user_id === this.props.currentUser.id) {
        this.pastReservations.push(reservation);
      }
    });
  }

  isUpcomingReservation(reservation) {
    let resTime = moment.utc(reservation.date + reservation.time, 'YYYY-MM-DDTHH:mm:ss.SSSSZ')
      .tz("America/New_York");

    const currentTime = moment().tz("America/New_York");

    if (reservation.time.slice(10) < "T06:00:00.000Z") {
      resTime = resTime.add('d', 1);
    }

    return (currentTime < resTime);
  }

  handleTime(time) {
    return moment(time, 'YYYY-MM-DDTHH:mm:ss.SSSSZ')
      .tz("America/New_York").format("h:mm A");
  }

  // handleSlotTime(time){
  //   return
  // }

  renderUpcomingReservations() {
    if (this.upcomingReservations.length === 0) {
      return (
        <div className='no-reservation-footer'>
          <span>No Upcoming Reservations</span>
        </div>
      );
    }

    return this.upcomingReservations.map((reservation, i) => {
      return (
        <div key={i} className='reservation-details'>
          <Link to={`/restaurant/${reservation.restaurant_id}`}>
            <img src={reservation.image_url} height='80px' width='80px'/>
          </Link>
          <div>
            <Link to={`/restaurant/${reservation.restaurant_id}`}>
              <h3>{reservation.name}</h3>
            </Link>
            <span className='seat-count'>{reservation.date} at {this.handleTime(reservation.time)}</span>
            <span className='seat-count'>Table for {reservation.seats}</span>
          </div>
        </div>
      );
    });
  }

  getReviewSpan(reservation) {
    return reservation.reviewed ? "Edit Review" : "Write Review";
  }

  getFavoriteSpan(reservation) {
    if (reservation.favorited) {
      return (
        <span className='favorite-span'
          onClick={this.removeFavorite.bind(this, reservation.restaurant_id)}>
          <i className="fa fa-heart"></i> Favorite
        </span>
      );
    } else {
      return (
        <span className='favorite-span'
          onClick={this.handleFavorite.bind(this, reservation.restaurant_id)}>
          <i className="fa fa-heart-o"></i> Add Favorite
        </span>
      );
    }
  }

  renderPastReservations() {
    if (this.pastReservations.length === 0) {
      return (
        <div className='no-reservation-footer'>
          <span>No Past Reservations</span>
        </div>
      );
    }

    // <Link to={`/restaurant/${restaurant.id}`}>
    //   <h3>{restaurant.name}</h3>
    // </Link>

    return this.pastReservations.map((reservation, i) => {
      return (
        <div key={i} className='reservation-details'>
          <Link to={`/restaurant/${reservation.restaurant_id}`}>
            <img src={reservation.image_url} height='80px' width='80px'/>
          </Link>
          <div>
            <Link to={`/restaurant/${reservation.restaurant_id}`}>
              <h3>{reservation.name}</h3>
            </Link>
            <span>{reservation.date}</span>
            <span className='seat-count'>Table for {reservation.seats}</span>
            <div className='review-and-favorite-container'>
              <span className='review-span'
                onClick={this.openModal.bind(this, reservation)}>
                <i className="fa fa-comment-o"></i> {this.getReviewSpan(reservation)}
              </span>
              {this.getFavoriteSpan(reservation)}
            </div>
          </div>
        </div>
      );
    });
  }

  renderFavorites() {
    if (this.props.favorites.length === 0) {
      return (
        <div className='no-reservation-footer'>
          <span>No Favorites Yet</span>
        </div>
      );
    }

    return this.props.favorites.map((favorite, i) => {
      return (
        <div key={i} className='reservation-details'>
          <Link to={`/restaurant/${favorite.restaurant_id}`}>
            <img src={favorite.image} height='80px' width='80px'/>
          </Link>

          <div>
            <Link to={`/restaurant/${favorite.restaurant_id}`}>
              <h3>{favorite.name}</h3>
            </Link>
            <ReactStars count={5} size={20} half={true}
              value={Math.round(favorite.rating * 2) / 2} edit={false}
              onChange={this.handleOverall} color2={'orange'}/>
            <span>{favorite.cuisine}</span>
          </div>

          <Link to={`/restaurant/${favorite.restaurant_id}`}>
            <button className='reserve-now'>Reserve Now</button>
          </Link>
        </div>
      );
    });
  }

  reservationNotification() {
    if (this.props.location.state && this.props.location.state.madeReservation) {
      return ", your reservation has been placed!";
    } else {
      return null;
    }
  }

  renderErrors() {
    return (
      <ul className='review-errors'>
        {this.props.errors.map((error, i) => <li key={i}>{error}</li> )}
      </ul>
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
    this.delegateReservations();
    return (
      <div>
        <div className='profile-header-div'>
          <h1>{this.props.currentUser.username}{this.reservationNotification()}</h1>
          <span></span>
        </div>

        <div className='horizontal-restaurant-blocks'>
          <div className="floating-nav">
            <StickyContainer className='restaurant-sticky'
              style={{height: '100%', width: 200, padding: '0 0px'}}>
              <Sticky>
                {
                  ({
                    style
                  }) => {
                    return (
                      <ul className="make-red" style={style}>
                        <li><a onClick={this.turnOffURL} id='pid1'
                          href='#upcoming-res'>Upcoming Reservations</a></li>
                        <li><a onClick={this.turnOffURL} id='pid2'
                          href="#past-res">Past Reservations</a></li>
                        <li><a href="#favorites" id='pid3'
                          onClick={this.turnOffURL}>Favorites</a></li>
                      </ul>
                    );
                  }
                }
              </Sticky>
            </StickyContainer>
          </div>

          <div className='everything-else'>
            <div className='reservations-container'>
              <div id="upcoming-res" className='reservation-list-header'>
                <h3>Upcoming Reservations</h3>
              </div>
              {this.renderUpcomingReservations()}
            </div>

            <div className='reservations-container'>
              <div id="past-res" className='reservation-list-header'>
                <h3>Past Reservations</h3>
              </div>
              {this.renderPastReservations()}
            </div>

            <div id="favorites" className='favorites-container'>
              <div className='reservation-list-header'>
                <h3>Favorites</h3>
              </div>
              {this.renderFavorites()}
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal} className='modal-container'
          style={style} contentLabel="a">

          <ReviewForm createReview={this.props.createReview}
            updateReview={this.props.updateReview}
            reservation={this.state.reservation}
            renderErrors={this.renderErrors}
            closeModal={this.closeModal}
            requestSingleReview={this.props.requestSingleReview}
            currentUser={this.props.currentUser}/>
        </Modal>
      </div>
    );
  }
}

export default Profile;
