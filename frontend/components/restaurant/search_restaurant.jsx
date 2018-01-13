import React from 'react';
import SearchBarContainer from './search_bar_container';
import { withRouter } from 'react-router-dom';
import SeatsTimeAndDate from './seats_time_and_date';

class SearchRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnyChange = this.handleAnyChange.bind(this);
  }

  componentDidMount() {
    this.props.removeSearchedRestaurants();
  }

  handleAnyChange(state) {
    this.setState(Object.assign({}, this.state, state));
  }

  handleSearchBarChange(value) {
    this.setState({search: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    window.searchParams = this.state;
    this.props.requestAllRestaurants(this.state).then(() => {
      this.props.history.push('/restaurants');
    });
  }

  render() {
    return (
      <form className='search-restaurant-div' autoComplete='off'>
        <SeatsTimeAndDate handleAnyChange={this.handleAnyChange} />

        <SearchBarContainer parentState={this.state}
          handleSearchBarChange={this.handleSearchBarChange}
          handleSubmit={this.handleSubmit} />

        <button className="find-stuff-button"
          onClick={this.handleSubmit}>
          Find seats!
        </button>
      </form>
    );
  }
}

export default withRouter(SearchRestaurant);
