import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {

    e.preventDefault();
    const user = Object.assign({}, this.state);
    // this.props.processForm(user).then(() => this.props.closeModal());
    this.props.processForm(user).then(() => this.props.closeModal());
      // .then(() => this.props.requestAllReservations())
      // .then(() => this.props.requestAllFavorites());
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  render() {
    return (
      <section className='modal-div'>
        <h3 className='mock-header'>Please sign in</h3>
        {this.props.renderErrors.bind(this)()}
        <form className='SomeForm'>
          <input type="text" onChange={this.handleChange("username")} name="user[username]" value={this.state.username} placeholder='username'/>
          <input type="password" onChange={this.handleChange("password")} name="user[password]" value={this.state.password} placeholder='password'/>
          <button type="submit" className='form-submit' onClick={this.handleSubmit}>{this.props.formType}</button>
          <span onClick={this.props.openModal.bind(this, 'Sign Up')}>New to EasySeating? <span className='modal-redirect'>Create an account</span></span>
        </form>
      </section>
    );
  }
}

export default LoginForm;
