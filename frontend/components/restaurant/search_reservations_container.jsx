import { connect } from 'react-redux';
import SearchReservations from './search_reservations';
import { receiveAllReservations, receiveSingleReservation }
  from '../../actions/reservation_actions';

const mapStateToProps = state => {
  return {
    reservation: state.reservation,
    reservations: state.reservations,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => ({
  receiveAllReservations: () => dispatch(receiveAllReservations()),
  receiveSingleReservation: (reservation) =>
    dispatch(receiveSingleReservation(reservation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchReservation);
