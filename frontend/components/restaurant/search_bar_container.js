import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { searchRestaurants, filterRestaurants, removeSearchedRestaurants } from '../../actions/restaurant_actions';
import { selectAllRestaurants } from '../../reducers/selectors';

const mapStateToProps = state => {
  return {
    restaurants: state.search.restaurants
    // loggedIn: (typeof state.session.currentUser === 'undefined'),
    // currentUser: state.session.username,
    // errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchRestaurants: data => dispatch(searchRestaurants(data)),
    filterRestaurants: data => dispatch(filterRestaurants(data)),
    removeSearchedRestaurants: () => dispatch(removeSearchedRestaurants())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
