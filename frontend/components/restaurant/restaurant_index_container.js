import { connect } from 'react-redux';
import RestaurantIndex from './restaurant_index';
import {
  requestSingleRestaurant } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.restaurants
    // loggedIn: (typeof state.session.currentUser === 'undefined'),
    // currentUser: state.session.username,
    // errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestSingleRestaurant: id => dispatch(requestSingleRestaurant(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantIndex);
