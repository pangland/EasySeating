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
    this.props.requestAllRestaurants(e.currentTarget.value);
  }

  render() {
    console.log('hi2');
    debugger
    return (
      <span className='search-restaurant'>
        <input className='search-restaurant-input'
          onChange={this.handleChange}
          value={this.state.lalala}
          placeholder='search does not work yet'/>
      </span>
    );
  }
}

export default SearchBar;
