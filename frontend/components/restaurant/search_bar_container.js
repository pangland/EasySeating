import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { searchRestaurants } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  console.log('hi');
  debugger
  return {
    restaurants: state.restaurants
    // loggedIn: (typeof state.session.currentUser === 'undefined'),
    // currentUser: state.session.username,
    // errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchRestaurants: data => dispatch(searchRestaurants(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
