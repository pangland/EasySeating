import { connect } from 'react-redux';
import Navbar from './navbar';
import { logout } from '../actions/session_actions';

const mapStateToProps = (state) => {
  const currentUser = state.session.currentUser;
  return {
    currentUser
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    // login: (user) => dispatch(login(user)),
    // signup: (user) => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
