import { connect } from 'react-redux';
import AddRestaurant from './add_restaurant';
import { createRestaurant, removeRestaurantErrors } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  return {
    loggedIn: (typeof state.session.currentUser === 'undefined'),
    currentUser: state.session.username,
    errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createRestaurant: restaurant => dispatch(createRestaurant(restaurant)),
    removeErrors: () => dispatch(removeRestaurantErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRestaurant);
