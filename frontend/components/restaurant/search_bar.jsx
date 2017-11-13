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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    console.log('hi');
    this.searchbar = document.getElementById("search-restaurant");
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick() {
    debugger;
    console.log('BOOGA');
    if (!this.searchbar.contains(event.target)) {
      this.setState({
        input: ""
      });

      this.props.removeSearchedRestaurants();
    }
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
    this.props.removeSearchedRestaurants();
    window.searchParams = passedParams;
    this.props.requestAllRestaurants(passedParams).then(() => {
      this.props.history.push('/restaurants');
    });
  }

  handleKeyPress(e) {
    console.log('boogeywookeywookey');
    const selected = this.state.selected;
    const cuisines = this.props.cuisinesSearched;
    const restaurantsSearched = this.props.restaurantsSearched;

    if (e.keyCode === 13) {
      if (selected >= 0 && selected < cuisines.length) {
        this.props.handleSearchBarChange(cuisines[selected].cuisine);
      } else if (selected >= cuisines.length) {
        debugger
        this.props.history.push(`/restaurant/${restaurantsSearched[selected - cuisines.length].id}`);
      }
    }

    if (this.state.input === "") return null;
    if (e.keyCode === 38) {
      if (this.state.selected === -1) return null;
      this.setState({
        selected: this.state.selected - 1
      });
    } else if (e.keyCode === 40) {
      if (this.state.selected === this.searchedRestaurants.length) return null;

      this.setState({
        selected: this.state.selected + 1
      });
    }
  }

  handleMouseOver(i, e) {
    if (this.state.selected !== i) {
      this.setState({
        selected: i
      });
    }
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
            onMouseOver={this.handleMouseOver.bind(this, index)}
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
          <li key={index}
            className={classes}
            onMouseOver={this.handleMouseOver.bind(this, index + listCuisines.length)}>
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
      <span id='search-restaurant' className='search-restaurant'>
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
