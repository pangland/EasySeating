import { connect } from 'react-redux';
import Restaurant from './restaurant';
import {
  requestSingleRestaurant } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  return {
    restaurant: state.restaurants.restaurant
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
)(Restaurant);
