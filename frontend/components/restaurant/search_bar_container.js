import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { searchRestaurants, setSelected, requestAllRestaurants,
  removeSearchedRestaurants,
  removeRestaurants } from '../../actions/restaurant_actions';
import { selectAllRestaurants } from '../../reducers/selectors';

const mapStateToProps = state => {
  // debugger
  return {
    restaurantsSearched: state.search.restaurants,
    cuisinesSearched: state.search.cuisines,
    selected: state.search.selected
    // loggedIn: (typeof state.session.currentUser === 'undefined'),
    // currentUser: state.session.username,
    // errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchRestaurants: data => dispatch(searchRestaurants(data)),
    requestAllRestaurants: data => dispatch(requestAllRestaurants(data)),
    removeRestaurants: () => dispatch(removeRestaurants()),
    removeSearchedRestaurants: () => dispatch(removeSearchedRestaurants()),
    setSelected: (id) => dispatch(setSelected(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
