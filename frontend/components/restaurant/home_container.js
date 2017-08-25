import { connect } from 'react-redux';
import AddRestaurant from './add_restaurant';
import Home from './home';
import { createRestaurant } from '../../actions/restaurant_actions';

const mapStateToProps = state => {
  // return {
  //   loggedIn: state.session.currentUser != null,
  //   currentUser: state.session.currentUser,
  //   errors: state.errors
  // };
};

const mapDispatchToProps = dispatch => ({
  // createRestaurant: restaurant => dispatch(createRestaurant(restaurant)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddRestaurant);

export default connect(null, null)(Home);
