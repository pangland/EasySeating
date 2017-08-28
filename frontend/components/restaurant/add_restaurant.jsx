import React from 'react';
import Modal from 'react-modal';
import RestaurantForm from './restaurant_form';
import SearchRestaurant from './search_restaurant';

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
    height          : '450px'
  }
};

class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.renderErrors = this.renderErrors.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(formChoice) {
    // this.props.removeErrors();
    if (this.props.currentUser) {
      this.setState({
        modalOpen: true,
      });
    } else {
      const temp = document.getElementById("snackbar");
      temp.className = "show";
      setTimeout(() => temp.className = temp.className.replace("show", ""), 3000);

    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
    this.props.removeErrors();
  }

  renderErrors() {
    debugger
    return (
      <ul className='restaurant-errors'>
        {this.props.errors.map((error, i) => <li key={i}>{error}</li> )}
      </ul>
    );
  }

  render() {
    return (
      <div className='add-restaurant-div'>
        <section>
          <button className='register-restaurant-button'
            onClick={this.openModal}>Register Restaurant</button>
        </section>
        <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal}
          className='modal-container' style={style} contentLabel="a">
          <RestaurantForm processForm={this.props.createRestaurant}
            renderErrors={this.renderErrors} closeModal={this.closeModal}/>
        </Modal>
        <div id="snackbar">Please sign in to use this feature</div>
      </div>
    );
  }
}

export default AddRestaurant;
