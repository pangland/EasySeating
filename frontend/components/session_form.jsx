import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Modal from 'react-modal';
import SomeForm from './some_form';

const style = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
    zIndex          : 10
  },
  content : {
    display         : 'flex',
    flexDirection  : 'column',
    position        : 'fixed',
    top             : '50%',
    left            : '50%',
    marginRight     : '-50%',
    transform       : 'translate(-50%, -50%)',
    border          : '1px solid #ccc',
    padding         : '0px',
    zIndex          : 11,
    width           : '460px',
    boxSizing       : 'border-box',
    height          : '300px'
  }
};


class zzSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      processForm: this.props.login,
      formType: 'login'
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal(login) {
    let signLogFunc;
    let signLogWord;
    if (login) {
      signLogFunc = this.props.login;
      signLogWord = 'Sign In';
    } else {
      signLogFunc = this.props.signup;
      signLogWord = 'Sign Up';
    }

    this.setState({
      modalOpen: true,
      processForm: signLogFunc,
      formType: signLogWord
    });
  }

  closeModal() {
    this.setState({ modalOpen: false });
    this.props.removeErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const guest = {username: 'Guest', password: 'unguessable_password'};
    this.props.login(guest);
  }

  renderErrors() {
    return (
      <ul className='signin-errors'>
        {this.props.errors.map((error, i) => <li key={i}>{error}</li> )}
      </ul>
    );
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div className='navbar'>
          <section className='left'>
            <span>EasySeating</span>
            <nav>LocationPH</nav>
          </section>

          <section className='right'>
            <button onClick={this.props.logout}>Logout</button>
          </section>
        </div>
      );
    } else {
      return (
        <div className='navbar'>
          <section className='left'>
            <span>EasySeating</span>
            <nav>LocationPH</nav>
          </section>

          <section className='right'>
            <button onClick={this.openModal.bind(this, false)}>Sign Up</button>
            <button onClick={this.openModal.bind(this, true)}>Sign In</button>
            <button onClick={this.handleSubmit}>Demo</button>
            <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} className='modal-container' style={style} contentLabel="a">
              {this.renderErrors()}
              <SomeForm processForm={this.state.processForm} formType={this.state.formType} closeModal={this.closeModal}/>
            </Modal>
          </section>
        </div>
      );
    }
  }
}

export default withRouter(zzSessionForm);
