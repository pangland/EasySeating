import { connect } from 'react-redux';
import SearchRestaurant from './search_restaurant';
import { receiveAllRestaurants, receiveSingleRestaurant }
  from '../../actions/restaurant_actions';


const mapStateToProps = state => {
  return {
    restaurant: state.restaurant,
    restaurants: state.restaurants,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => ({
  receiveAllRestaurants: () => dispatch(receiveAllRestaurants()),
  receiveSingleRestaurant: (restaurant) =>
    dispatch(receiveSingleRestaurant(restaurant))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchRestaurant);
