import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Modal from 'react-modal';
import LoginForm from './login_form';
import AuthForm from './auth_form';

const style = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(0, 0, 0, .25)',
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
    border          : '1px solid white',
    padding         : '0px',
    zIndex          : 11,
    width           : '460px',
    boxSizing       : 'border-box',
    height          : '300px'
  }
};


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      processForm: this.props.login,
      formType: 'login',
      formRender: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  openModal(formChoice) {
    let formFunc;
    let formRenderF;
    if (formChoice === 'Sign In') {
      formFunc = this.props.login;
      formRenderF = <LoginForm openModal={this.openModal} renderErrors={this.renderErrors}
        processForm={formFunc} formType={formChoice}
        closeModal={this.closeModal}/>;
    } else {
      formFunc = this.props.signup;
      formRenderF = <AuthForm processForm={formFunc} renderErrors={this.renderErrors}
        formType={formChoice} closeModal={this.closeModal}/>;
    }

    this.props.removeErrors();

    this.setState({
      modalOpen: true,
      processForm: formFunc,
      formType: formChoice,
      formRender: formRenderF
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
        <div className='logged-in'>
          <span>Hi, {this.props.currentUser.username}</span>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <button className='sign-up-button' onClick={this.openModal.bind(this, 'Sign Up')}>Sign Up</button>
          <button onClick={this.openModal.bind(this, 'Sign In')}>Sign In</button>
          <button className='demo-button' onClick={this.handleSubmit}>Demo</button>
          <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} className='modal-container' style={style} contentLabel="a">

            {this.state.formRender}
          </Modal>
        </div>
      );
    }
  }
}

export default withRouter(SessionForm);
