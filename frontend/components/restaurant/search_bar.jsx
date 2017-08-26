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
    let listFirstTen;
    if (typeof this.props.restaurants[0] !== 'undefined') {
      listFirstTen = this.props.restaurants[0].map((restaurant) => {
        return (
          <li className='search-list-item'>{restaurant.name}</li>
        );
      });
    } else {
      listFirstTen = <li></li>;
    }

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
