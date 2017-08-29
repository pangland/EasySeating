import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { searchRestaurants, setSelected,
  removeSearchedRestaurants } from '../../actions/restaurant_actions';
import { selectAllRestaurants } from '../../reducers/selectors';

const mapStateToProps = state => {
  return {
    restaurants: state.search.restaurants,
    selected: state.search.selected
    // loggedIn: (typeof state.session.currentUser === 'undefined'),
    // currentUser: state.session.username,
    // errors: state.errors.restaurant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchRestaurants: data => dispatch(searchRestaurants(data)),
    removeSearchedRestaurants: () => dispatch(removeSearchedRestaurants()),
    setSelected: (id) => dispatch(setSelected(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
