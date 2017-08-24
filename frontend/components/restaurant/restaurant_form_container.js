import { connect } from 'react-redux';
import RestauratForm from './restaurant_form';
import { createForm } from '../../actions/restaurant_actions';

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: session.currentUser != null,
    currentUser: session.currentUser,
    errors: session.errors,
  };
};

const mapDispatchToProps = dispatch => ({
  createRestaurant: restaurant => dispatch(createRestaurant(restaurant))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantForm);
