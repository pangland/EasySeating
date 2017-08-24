import React from 'react';
import Modal from 'react-modal';

class RestaurantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: "",
      description: ""

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.closeModal());
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }


  render() {
    return (
      <div>
        <button className='register-restaurant-button'
          onClick={this.openModal}>Register Restaurant</button>
        <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal}
          className='modal-container' style={style} contentLabel="a">
          <section className='rform-modal-div'>
            <h3 className='rform-modal-header'>
              Grow your business with EasySeating!
            </h3>
            {this.props.renderErrors()}
            <form className='restaurant-form'>
              <input type="text" onChange={this.handleChange("username")}
                name="user[username]" value={this.state.username}
                placeholder='username'/>
              <input type="password" onChange={this.handleChange("password")}
                name="user[password]" value={this.state.password} placeholder='password'/>
              <button type="submit" className='form-submit'
                onClick={this.handleSubmit}>{this.props.formType}</button>
            </form>
          </section>
        </Modal>
      </div>
    );
  }
}
