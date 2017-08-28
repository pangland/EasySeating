import { connect } from 'react-redux';
import Restaurant from './restaurant';
import {
  fetchSingleRestaurant } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  debugger
  return {
    restaurant: state.restaurants.restaurant
    // loggedIn: (typeof state.session.currentUser === 'undefined'),
    // currentUser: state.session.username,
    // errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  debugger
  return {
    fetchSingleRestaurant: id => dispatch(fetchSingleRestaurant(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
