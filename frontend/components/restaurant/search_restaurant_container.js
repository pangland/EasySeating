import { connect } from 'react-redux';
import SearchRestaurant from './search_restaurant';
import { requestAllRestaurants, requestSingleRestaurant,
  removeRestaurants,
  removeSearchedRestaurants } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  return {
    restaurant: state.restaurant,
    restaurants: state.restaurants,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => ({
  requestAllRestaurants: data => dispatch(requestAllRestaurants(data)),
  requestSingleRestaurant: (restaurant) =>
    dispatch(requestSingleRestaurant(restaurant)),
  removeRestaurants: () => dispatch(removeRestaurants()),
  removeSearchedRestaurants: () => dispatch(removeSearchedRestaurants())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRestaurant);
