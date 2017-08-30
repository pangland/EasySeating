import { connect } from 'react-redux';
import SearchReservations from './search_reservations';
import { receiveAllReservations, searchReservations, createReservation }
  from '../../actions/reservation_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    reservations: state.search.reservations,
    loggedIn: (typeof state.session.currentUser === 'undefined'),
    currentUser: state.session.username,
    currentUserId: state.session.id
  };
};

const mapDispatchToProps = dispatch => ({
  searchReservations: data => dispatch(searchReservations(data)),
  createReservation: data => dispatch(createReservation(data))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchReservations));
