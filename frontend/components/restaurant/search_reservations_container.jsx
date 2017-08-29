import { connect } from 'react-redux';
import SearchReservations from './search_reservations';
import { receiveAllReservations, searchReservations, receiveSingleReservation }
  from '../../actions/reservation_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    reservations: state.search.reservations,
  };
};

const mapDispatchToProps = dispatch => ({
  searchReservations: data => dispatch(searchReservations(data)),
  receiveAllReservations: () => dispatch(receiveAllReservations()),
  receiveSingleReservation: (reservation) =>
    dispatch(receiveSingleReservation(reservation))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchReservations));
