import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { searchRestaurants } from '../../actions/restaurant_actions';
import { selectAllRestaurants } from '../../reducers/selectors';

const mapStateToProps = state => {
  return {
    restaurants: selectAllRestaurants(state.restaurants)
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
