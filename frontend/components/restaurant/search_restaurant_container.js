import { connect } from 'react-redux';
import SearchRestaurant from './search_restaurant';
import { requestAllRestaurants, requestSingleRestaurant }
  from '../../actions/restaurant_actions';


const mapStateToProps = state => {
  return {
    restaurant: state.restaurant,
    restaurants: state.restaurants,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => ({
  requestAllRestaurants: id => dispatch(requestAllRestaurants(id)),
  requestSingleRestaurant: (restaurant) =>
    dispatch(requestSingleRestaurant(restaurant))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRestaurant);
