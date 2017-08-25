import React from 'react';
import SearchBarContainer from './search_bar_container';

class SearchRestaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: {}
    };
  }

  handleInput() {
    const restaurant = Object.assign({}, this.state);
    this.props.processForm(restaurant).then(() => this.props.closeModal());
  }

  render() {
    return (
      <SearchBarContainer />
    );
  }
}

export default SearchRestaurant;
