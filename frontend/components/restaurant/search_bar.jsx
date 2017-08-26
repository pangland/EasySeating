import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.state.input = e.currentTarget.value;
    this.props.searchRestaurants(e.currentTarget.value);
  }

  render() {
    debugger
    const listFirstTen = this.props.restaurants.map((restaurant) => {
      return (
        <li>restaurant.name</li>
      );
    });

    return (
      <span className='search-restaurant'>
        <input className='search-restaurant-input'
          onChange={this.handleChange}
          value={this.state.lalala}
          placeholder='search does not work yet'/>
        {listFirstTen}
      </span>
    );
  }
}

export default SearchBar;
