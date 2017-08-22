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
    justifyContent : 'space-around',
    position        : 'fixed',
    top             : '100px',
    left            : '150px',
    right           : '150px',
    bottom          : '100px',
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
      modalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => <li key={i}>{error}</li> )}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Sign Up</button>
        <button onClick={this.openModal}>Sign In</button>
        <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} style={style}>
          {this.renderErrors()}
          <SomeForm formType={this.props.formType} processForm={this.props.processForm} />
        </Modal>
      </div>
    );
  }
}

export default withRouter(zzSessionForm);
