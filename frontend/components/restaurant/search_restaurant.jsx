import React from 'react';

class SearchRestaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: {}
    };
  }

  render() {
    return (
      <span className='search-restaurant'>
        <input className='search-restaurant-input'
          onChange={this.handleInput}
          value={this.state.inputVal}
          placeholder='search does not work yet'/>
      </span>
    );
  }
}

export default SearchRestaurant;
