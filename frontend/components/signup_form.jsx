class SignupForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleChange(field) {
    if (field === "username") {
      return (e) => this.setState({username: e.target.value});
    } else if (field === "password") {
      return (e) => this.setState({password: e.target.value});
    }
  }

  render() {
    return (
      <form>
        <label>
          <input type="text" onChange={this.handleChange("username")} name="user[username]" value={this.state.username} placeholder='username'/>
        </label>
        <label>
          <input type="text" onChange={this.handleChange("password")} name="user[password]" value={this.state.password} placeholder='password'/>
        </label>
        <button type="submit" onClick={this.handleSubmit}>{this.props.formType}</button>
      </form>
    );
  }
}

export default SignupForm;
