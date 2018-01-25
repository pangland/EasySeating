import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SessionForm from './session/session_form';

class Navbar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <section className='nav-left'>
          <Link to={'/'}>
            <img className='logo' src={window.images.chair_logo}></img>
            <span>EasySeating</span>
          </Link>
        </section>
        <section className='nav-right'>
          <SessionForm loggedIn={this.props.loggedIn}
            logout={this.props.logout}
            login={this.props.login} signup={this.props.signup}
            removeErrors={this.props.removeErrors}
            currentUser={this.props.currentUser}
            errors={this.props.errors}
            requestAllReservations={this.props.requestAllReservations}
            requestAllFavorites={this.props.requestAllFavorites}/>
        </section>
      </div>
    );
  }
}


export default Navbar;
