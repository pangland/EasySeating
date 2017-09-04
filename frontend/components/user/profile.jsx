import React from 'react';
import { withRouter } from 'react-router-dom';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.currentUser.username) {
      this.props.history.push('/');
    }
  }

  render() {
    debugger
    return (
      <h3>Hi</h3>
    );
  }
}

export default Restaurant;
