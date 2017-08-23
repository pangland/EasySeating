import React from 'react';

class SomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      modal2Open: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.callAuthForm = this.callAuthForm.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.closeModal());
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  callAuthForm() {
    this.props.closeModal();
    this.state.modal2Open = true;
  }

  closeModal() {
    this.setState({ modal2Open: false });
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
    const header = (this.props.formType === 'Sign In') ? 'Please sign in' : 'Welcome to EasySeating!';
    return (
      <section className='model-div'>
        <h3 className='mock-header'>{header}</h3>
        <form className='SomeForm'>
          <input type="text" onChange={this.handleChange("username")} name="user[username]" value={this.state.username} placeholder='username'/>
          <input type="text" onChange={this.handleChange("password")} name="user[password]" value={this.state.password} placeholder='password'/>
          <button type="submit" className='form-submit' onClick={this.handleSubmit}>{this.props.formType}</button>
          <span onClick={this.props.openModal.bind(this, 'Sign Up')}>New to EasySeating? <span className='modal-redirect'>Create an account</span></span>
        </form>
      </section>
    );
  }
}

export default SomeForm;
