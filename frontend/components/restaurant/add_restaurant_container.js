import { connect } from 'react-redux';
import AddRestaurant from './add_restaurant';
import { createRestaurant } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  return {
    loggedIn: state.session.currentUser != null,
    currentUser: state.session.currentUser,
    errors: state.errors,
  };
};

const mapDispatchToProps = dispatch => ({
  createRestaurant: restaurant => dispatch(createRestaurant(restaurant)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRestaurant);
