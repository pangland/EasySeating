import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { requestAllRestaurants } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  return {
    // loggedIn: (typeof state.session.currentUser === 'undefined'),
    // currentUser: state.session.username,
    // errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestAllRestaurants: restaurant => dispatch(requestAllRestaurants(restaurant)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
