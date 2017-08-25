import React from 'react';
import Modal from 'react-modal';
import RestaurantForm from './restaurant_form';

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
    this.setState({
      modalOpen: true,
    });
  }

  closeModal() {
    this.setState({ modalOpen: false });
    this.props.removeErrors();
  }

  renderErrors() {
    return (
      <ul className='signin-errors'>
        {this.props.errors.map((error, i) => <li key={i}>{error}</li> )}
      </ul>
    );
  }

  render() {
    if (this.props.current_user) {

    }


    return (
      <div>
        <div className='pic1'></div>
        <div className='all-home-stuff'>
          <div className = 'fancy-search'>
            <h2>Find easy seating! It's easy peasy!</h2>
            <h2>PRETEND THIS IS A SEARCH BAR FOR THE MOMENT</h2>
            <input type="datetime-local" name="bdaytime"/>
          </div>

        </div>



        <div className='add-restaurant-div'>
          <button className='register-restaurant-button'
            onClick={this.openModal}>Register Restaurant</button>
          <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal}
            className='modal-container' style={style} contentLabel="a">
            <RestaurantForm processForm={this.props.createRestaurant}
              errors={this.props.errors} closeModal={this.closeModal}/>
          </Modal>
        </div>
      </div>
    );
  }
}

export default AddRestaurant;
