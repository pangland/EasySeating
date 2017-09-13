import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Modal from 'react-modal';
import ReviewForm from './review_form';

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
    this.delegateReservations = this.delegateReservations.bind(this);
    this.renderUpcomingReservations = this.renderUpcomingReservations.bind(this);
    this.renderPastReservations = this.renderPastReservations.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillMount() {
    if (!this.props.currentUser.username) {
      this.props.history.push('/');
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
  }

  delegateReservations() {
    this.upcomingReservations = [];
    this.pastReservations = [];
    const time = new Date();

    this.props.reservations.forEach((reservation) => {
      if (this.isUpcomingReservation(reservation)) {
        this.upcomingReservations.push(reservation);
      } else {
        this.pastReservations.push(reservation);
      }
    });
  }

  isUpcomingReservation(reservation) {
    const theDate = new Date();

    const utcDate = new Date(theDate.getUTCFullYear(),
      theDate.getUTCMonth(), theDate.getUTCDate(),
      theDate.getUTCHours(), theDate.getUTCMinutes(),
      theDate.getUTCSeconds());

    return utcDate > reservation.time;
  }

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
        <div key={i}>
          <h3>{reservation.id}</h3>
          <p>{reservation.time}</p>
        </div>
      );
    });
  }

  renderPastReservations() {
    if (this.pastReservations.length === 0) {
      return (
        <div className='no-reservation-footer'>
          <span>No Past Reservations</span>
        </div>
      );
    }



    return this.pastReservations.map((reservation, i) => {
      return (
        <div key={i} className='reservation-details'>
          <Link to={`/restaurant/${reservation.restaurant_id}`}>
            <img src="http://res.cloudinary.com/pangland/image/upload/c_scale,h_80,r_5,w_80/v1503603321/seemi-samuel-15564_sst0nn.jpg"/>
          </Link>
          <div>
            <h3>{reservation.name}</h3>
            <span>{reservation.date}</span>
            <span className='seat-count'>Table for {reservation.seats}</span>
            <div className='review-and-favorite-container'>
              <span className='review-span'
                onClick={this.openModal.bind(this, reservation)}>
                <i className="fa fa-comment-o"></i> Write Review
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  renderErrors() {
    return (
      <ul className='review-errors'>
        {this.props.errors.map((error, i) => <li key={i}>{error}</li> )}
      </ul>
    );
  }


  render() {
    this.delegateReservations();
    return (
      <div>
        <h3>Hi</h3>
        <div>
          <div className='reservation-list-header'>
            <h3>Upcoming Reservations</h3>
          </div>
          {this.renderUpcomingReservations()}
        </div>
        <div className='reservations-container'>
          <div className='reservation-list-header'>
            <h3>Past Reservations</h3>
          </div>
          {this.renderPastReservations()}
        </div>
        <Modal isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal} className='modal-container'
          style={style} contentLabel="a">

          <ReviewForm createReview={this.props.createReview}
            reservation={this.state.reservation}
            renderErrors={this.renderErrors}
            closeModal={this.closeModal}
            currentUser={this.props.currentUser}/>
        </Modal>
      </div>
    );
  }
}

export default Profile;
