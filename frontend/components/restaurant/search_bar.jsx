import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      selected: -1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log('hi steve');
    this.props.handleSearchBarChange(e.currentTarget.value);
    this.state.input = e.currentTarget.value;
    this.props.searchRestaurants(e.currentTarget.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    const passedParams = Object.assign({}, this.props.parentState, {search: e.target.innerHTML});
    // this.props.removeRestaurants();
    this.props.removeSearchedRestaurants().then(() => {});
    window.searchParams = passedParams;
    this.props.requestAllRestaurants(passedParams).then(() => {
      this.props.history.push('/restaurants');
    });
  }

  handleKeyPress(e) {
    // 38: up arrow
    // 40: down arrow
    console.log('boogeywookeywookey');
    debugger;
    if (this.state.input === "") return null;
    if (e.keyCode === 38) {
      if (this.state.selected === -1) return null;
      // this.searchedRestaurants[this.state.selected].className = this.searchedRestaurants[this.state.selected].className.replace("select", "");
      // this.props.setSelected(this.state.selected - 1);
      this.setState({
        selected: this.state.selected - 1
      });
    } else if (e.keyCode === 40) {
      if (this.state.selected === this.searchedRestaurants.length) return null;
      // this.searchedRestaurants.className = this.searchedRestaurants.className.replace("select", "");
      // this.props.setSelected(this.state.selected + 1);

      this.setState({
        selected: this.state.selected + 1
      });
    }

    // if (this.props.selected >= 0 && this.props.selected < this.searchedRestaurants.length) {
    //   this.searchedRestaurants[this.props.selected].classList.add("select");
    // }
  }

  render() {
    let listFirstTen;
    let listCuisines;
    let restaurantLabel;
    let cuisineLabel;

    if (typeof this.props.cuisinesSearched !== 'undefined') {
      listCuisines = this.props.cuisinesSearched.map((cuisine, index) => {
        const hovered = index === this.state.selected ? 'hovered' : '';
        const classes = `${hovered} search-list-item`;

        return (
          <li key={index}
            className={classes}
            onClick={this.handleSubmit} >
            <p>{cuisine.cuisine}</p>
          </li>
        );
      });
    }

    if (typeof this.props.restaurantsSearched !== 'undefined') {
      listFirstTen = this.props.restaurantsSearched.map((restaurant, index) => {
        const hovered = index + listCuisines.length === this.state.selected ? 'hovered' : '';
        const classes = `${hovered} search-list-item`;

        return (
          <li key={index} className={classes}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <p>{restaurant.name}</p>
              <span className='cuisine-span'>{restaurant.cuisine}</span>
              <span className='price-span'>{restaurant.price}</span>
            </Link>
          </li>
        );
      });
    } else {
      listFirstTen = null;
    }

    if (listFirstTen && listFirstTen.length) {
      restaurantLabel = (
        <li className='search-list-type'>
          <span><i className="fa fa-home"></i> RESTAURANTS</span>
        </li>
      );
    }

    if (this.props.cuisinesSearched && this.props.cuisinesSearched.length) {
      cuisineLabel = (
        <li className='search-list-type'>
          <span><i className="fa fa-cutlery"></i> CUISINES</span>
        </li>
      );
    }


    this.searchedRestaurants = listFirstTen;

    return (
      <span className='search-restaurant'>
        <label className='search-restaurant-input-wrapper'>
          <input className='search-restaurant-input'
            onChange={this.handleChange} value={this.state.lalala}
            placeholder='Enter a cuisine or restaurant'
            onKeyDown={this.handleKeyPress} />
        </label>
        <ul className='search-restaurant-list'>
          {cuisineLabel}
          {listCuisines}
          {restaurantLabel}
          {this.searchedRestaurants}
        </ul>
      </span>
    );
  }
}

export default withRouter(SearchBar);
