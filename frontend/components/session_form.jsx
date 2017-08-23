import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alternateLink = this.alternateLink.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
    this.props.closeModal();
  }

  handleChange(field) {
    if (field === "username") {
      return (e) => this.setState({username: e.target.value});
    } else if (field === "password") {
      return (e) => this.setState({password: e.target.value});
    }
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => <li key={i}>{error}</li> )}
      </ul>
    );
  }

  alternateLink() {
    if (this.props.formType === 'login') {
      return <Link to='/signup'>Sign Up</Link>;
    } else {
      return <Link to='/login'>Login</Link>;
    }
  }

  render() {
    debugger;
    let header;
    if (this.props.formType === 'login') {
      header = 'Login';
    } else {
      header = 'Sign Up';
    }

    return (
      <div>
        <h3>{header} or {this.alternateLink()}</h3>
        {this.renderErrors()}
        <form>
          <label>Username
            <input type="text" onChange={this.handleChange("username")} name="user[username]" value={this.state.username} />
          </label>
          <label>Password
            <input type="text" onChange={this.handleChange("password")} name="user[password]" value={this.state.password} />
          </label>
          <button type="submit" onClick={this.handleSubmit}>{this.props.formType}</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
