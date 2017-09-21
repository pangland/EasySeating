import { connect } from 'react-redux';
import RestaurantIndex from './restaurant_index';
import { requestSingleRestaurant,
  removeRestaurants } from '../../actions/restaurant_actions';
import { selectAllRestaurants } from '../../reducers/selectors.js';
import { createReservation } from '../../actions/reservation_actions';


const mapStateToProps = state => {
  return {
    restaurants: selectAllRestaurants(state),
    // rstaurants: state.restaurants,
    currentUser: state.session.username,
    currentUserId: state.session.id
    // loggedIn: (typeof state.session.currentUser === 'undefined'),
    // currentUser: state.session.username,
    // errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestSingleRestaurant: id => dispatch(requestSingleRestaurant(id)),
    removeRestaurants: () => dispatch(removeRestaurants()),
    createReservation: (res) => dispatch(createReservation(res))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantIndex);
