import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SessionForm from './session_form';

class Navbar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <section className='nav-left'>
          <img className='logo' src='http://floridaseating.com/wp-content/uploads/2013/10/fl-seating-chair-icon.png'></img>
          <span>EasySeating</span>
        </section>
        <section className='nav-right'>
          <SessionForm loggedIn={this.props.loggedIn} logout={this.props.logout}
            login={this.props.login} signup={this.props.signup}
            removeErrors={this.props.removeErrors} errors={this.props.errors}/>
        </section>
      </div>
    );
  }
}


export default Navbar;
