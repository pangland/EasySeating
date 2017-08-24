import { connect } from 'react-redux';
import AddRestaurant from './add_restaurant';
import { createRestaurant, removeRestaurantErrors } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  return {
    loggedIn: state.session.currentUser != null,
    currentUser: state.session.currentUser,
    errors: state.session.errors,
  };
};

const mapDispatchToProps = dispatch => ({
  createRestaurant: restaurant => dispatch(createRestaurant(restaurant)),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRestaurant);
