import React from 'react';

class SomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  render() {
    const header = (this.props.formType === 'login') ? 'Please sign in' : 'Welcome to EasySeating!';

    if (this.props.formType === 'login') {
      return (
        <div className='model-div'>
          <h3>{header}</h3>
          <form className='SomeForm'>
            <input type="text" onChange={this.handleChange("username")} name="user[username]" value={this.state.username} placeholder='username'/>
            <input type="text" onChange={this.handleChange("password")} name="user[password]" value={this.state.password} placeholder='password'/>
            <button type="submit" onClick={this.handleSubmit}>{this.props.formType}</button>
          </form>
        </div>
      );
    } else {
      return (
        <form>
          <input type="text" onChange={this.handleChange("username")} name="user[username]" value={this.state.username} placeholder='username'/>
          <input type="text" onChange={this.handleChange("password")} name="user[password]" value={this.state.password} placeholder='password'/>
          <button type="submit" onClick={this.handleSubmit}>{this.props.formType}</button>
        </form>
      );
    }
  }
}

export default SomeForm;
