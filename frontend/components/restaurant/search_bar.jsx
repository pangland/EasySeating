import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.searchbar = document.getElementById("search-restaurant");
    document.addEventListener('mousedown', this.handleOutsideClick);
    this.props.searchRestaurants('$');
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick() {
    if (!this.searchbar.contains(event.target)) {
      this.searchbar.childNodes[1].classList.add("hide-dropdown");
    } else {
      this.searchbar.childNodes[1].classList.remove('hide-dropdown');
    }
  }

  handleChange(e) {
    this.props.handleSearchBarChange(e.currentTarget.value);
    // this.state.input = e.currentTarget.value;
    this.props.searchRestaurants(e.currentTarget.value);
  }

  handleSubmit(e) {
    e.preventDefault();

    const passedParams = Object.assign(
      {}, this.props.parentState, {search: e.target.innerHTML}
    );

    this.props.removeSearchedRestaurants();
    window.searchParams = passedParams;
    this.props.requestAllRestaurants(passedParams).then(() => {
      this.props.history.push('/restaurants');
    });
  }

  handleKeyPress(e) {
    const selected = this.state.selected;
    const cuisines = this.props.cuisinesSearched;
    const restaurantsSearched = this.props.restaurantsSearched;
    const listSize = restaurantsSearched.length + cuisines.length;

    switch(e.keyCode) {
      case 13: // enter key
        if (selected >= 0 && selected < cuisines.length) {
          this.props.handleSearchBarChange(cuisines[selected].cuisine);
          this.handleSubmit();
        } else if (selected >= cuisines.length) {
          const index = selected - cuisines.length;
          const path = `/restaurant/${restaurantsSearched[index].id}`;
          this.props.history.push(path);
        }
        break;
      case 38: // up arrow
        e.preventDefault();
        if (selected === -1) {
          return null;
        }
        this.setState({ selected: selected - 1 });
        break;
      case 40: // down arrow
        e.preventDefault();
        const listLength = this.searchedRestaurants.length;
        if (selected === listLength || listLength === 0) {
          return null;
        }
        this.setState({ selected: selected + 1 });
        break;
      case 9: // tab key
        e.preventDefault();
        const direction = e.shiftKey ? -1 : 1;
        this.setState({ selected: this.mod(listSize, direction) });
    }
  }

  handleMouseOver(i, e) {
    if (this.state.selected !== i) {
      this.setState({
        selected: i
      });
    }
  }

  mod(inputSize, shift) { // to handle negative modulo
    const input = this.state.selected + shift;
    return ((input % inputSize) + inputSize ) % inputSize;
  }

  renderCuisineLabel() {
    ;
    if (this.props.cuisinesSearched && this.props.cuisinesSearched.length) {
      return (
        <li className='search-list-type'>
          <span><i className="fa fa-cutlery"></i> CUISINES</span>
        </li>
      );
    }
  }

  renderCuisines() {
    if (this.props.cuisinesSearched) {
      const listCuisines = this.props.cuisinesSearched.map((cuisine, index) => {
        const hovered = index === this.state.selected ? 'hovered' : '';
        const classes = `${hovered} search-list-item`;

        return (
          <li key={index}
            className={classes}
            onMouseOver={this.handleMouseOver.bind(this, index)}
            onClick={this.handleSubmit} >
            <p>{cuisine.cuisine}</p>
          </li>
        );
      });
      return listCuisines;
    }
    return null;
  }

  renderRestaurantLabel() {
    if (this.props.restaurantsSearched.length) {
      return (
        <li className='search-list-type'>
          <span><i className="fa fa-home"></i> RESTAURANTS</span>
        </li>
      );
    }
  }

  renderRestaurants(cuisineCount) {
    if (typeof this.props.restaurantsSearched !== 'undefined') {
      return this.props.restaurantsSearched.map((restaurant, index) => {
        const hovered = index + cuisineCount === this.state.selected ? 'hovered' : '';
        const classes = `${hovered} search-list-item`;

        return (
          <li key={index}
            className={classes}
            onMouseOver={this.handleMouseOver.bind(this, index + cuisineCount)}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <p>{restaurant.name}</p>
              <span className='cuisine-span'>{restaurant.cuisine}</span>
              <span className='price-span'>{restaurant.price}</span>
            </Link>
          </li>
        );
      });
    }
  }

  render() {
    const cuisineLabel = this.renderCuisineLabel();
    const listCuisines = this.renderCuisines();
    const restaurantLabel = this.renderRestaurantLabel();
    const restaurantList = this.renderRestaurants(listCuisines.length);

    this.searchedRestaurants = restaurantList;

    const inputClass = this.state.selected === -1 ? 'search-restaurant-input' : 'search-restaurant-input caret-mod';

    return (
      <span id='search-restaurant' className='search-restaurant'>
        <label className='search-restaurant-input-wrapper'>
          <input id='search-input' className={inputClass}
            onChange={this.handleChange}
            placeholder='Enter a cuisine or restaurant'
            onKeyDown={this.handleKeyPress}
            onClick={this.searchClick} />
        </label>
        <ul className='search-restaurant-list'>
          {cuisineLabel}
          {listCuisines}
          {restaurantLabel}
          {restaurantList}
        </ul>
      </span>
    );
  }
}

export default withRouter(SearchBar);
