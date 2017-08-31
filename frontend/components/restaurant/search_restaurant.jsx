import React from 'react';
import SearchBarContainer from './search_bar_container';
import { withRouter } from 'react-router-dom';

class SearchRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: "2",
      date: new Date().toJSON().slice(0,10),
      time: "8:00 a.m.",
      search: ""
    };

    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.endDate = this.endDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  handleSearchBarChange(value) {
    this.setState({search: value});
  }

  endDate() {
    let theDate = new Date();
    theDate.setDate(theDate.getDate() + 50);

    const dd = theDate.getDate();
    const mm = theDate.getMonth() + 1;
    const y = theDate.getFullYear();

    return y + '-' + mm + '-' + dd;
  }

  handleSubmit() {
    this.props.requestAllRestaurants(this.state).then(() => {
      this.props.history.push('/restaurants');
    });
  }

  render() {
    return (
      <div className='search-restaurant-div'>
        <label className='search-restaurant-select-wrapper'>
          <select name='seats' defaultValue='2'
            onChange={this.handleChange("seats")}>
            <option value='1'>1 person</option>
            <option value='2'>2 people</option>
            <option value='3'>3 people</option>
            <option value='4'>4 people</option>
            <option value='5'>5 people</option>
          </select>
        </label>

        <label className='search-restaurant-select-wrapper'>
          <input type="date" id="date" name="date"
            onChange={this.handleChange("date")}
            defaultValue={new Date().toJSON().slice(0,10)}
            min={new Date().toJSON().slice(0,10)} max={this.endDate()} />
        </label>

        <label className='search-restaurant-select-wrapper'>
          <select name="time" defaultValue="8:00"
            onChange={this.handleChange("time")}>
            <option value="7:30">7:30 a.m.</option>
            <option value="8:00">8:00 a.m.</option>
            <option value="8:30">8:30 a.m.</option>
            <option value="9:00">9:00 a.m.</option>
            <option value="9:30">9:30 a.m.</option>
            <option value="10:00">10:00 a.m.</option>
            <option value="10:30">10:30 a.m.</option>
          </select>
        </label>

        <SearchBarContainer handleSearchBarChange={this.handleSearchBarChange}/>
        <button onClick={this.handleSubmit}>(Doesn't do anything yet)</button>
      </div>
    );
  }
}

export default withRouter(SearchRestaurant);
