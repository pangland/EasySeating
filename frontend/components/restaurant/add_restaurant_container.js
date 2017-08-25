import { connect } from 'react-redux';
import AddRestaurant from './add_restaurant';
import { createRestaurant, removeRestaurantErrors } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  debugger
  return {
    loggedIn: state.session.currentUser != null,
    currentUser: state.session.currentUser,
    errors: state.restaurantErrors,
  };
};

const mapDispatchToProps = dispatch => ({
  createRestaurant: restaurant => dispatch(createRestaurant(restaurant)),
  removeErrors: () => dispatch(removeRestaurantErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRestaurant);
