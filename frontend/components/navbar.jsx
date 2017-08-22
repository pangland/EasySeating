import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class Navbar extends React.Component {
  render() {
    if (this.props.currentUser) {
      return (
        <div>
          <span>EasySeating</span>
          <span>
            <h3>Hello, {this.props.currentUser.username}!</h3>
            <button onClick={this.props.logout}>Log Out</button>
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <span className='logo'>EasySeating </span>
          <span>
            <Link to='/signup'>Signup</Link>   <Link to='/login'>Login</Link>
          </span>
        </div>
      );
    }
  }
}


export default Navbar;
