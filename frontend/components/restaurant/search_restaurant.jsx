import React from 'react';
import SearchBarContainer from './search_bar_container';

class SearchRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {}
    };

    this.endDate = this.endDate.bind(this);
  }

  handleInput() {
    const restaurant = Object.assign({}, this.state);
    this.props.processForm(restaurant).then(() => this.props.closeModal());
  }

  endDate() {
    let theDate = new Date();
    theDate.setDate(theDate.getDate() + 50);

    const dd = theDate.getDate();
    const mm = theDate.getMonth() + 1;
    const y = theDate.getFullYear();

    return y + '-' + mm + '-' + dd;
  }

  render() {
    return (
      <div className='search-restaurant-div'>
        <select name='seats'>
          <option value='1'>1 person</option>
          <option value='2' selected>2 people</option>
          <option value='3'>3 people</option>
          <option value='4'>4 people</option>
          <option value='5'>5 people</option>
        </select>
        <input type="date" id="date" name="date"
          min={new Date().toJSON().slice(0,10)} max={this.endDate()} />
        <select name="time">
          <option value="" selected disabled hidden>Select Time</option>
          <option value="7:30">7:30 a.m.</option>
          <option value="7:30" selected>8:00 a.m.</option>
          <option value="7:30">8:30 a.m.</option>
          <option value="7:30">9:00 a.m.</option>
          <option value="7:30">9:30 a.m.</option>
          <option value="7:30">10:00 a.m.</option>
          <option value="7:30">10:30 a.m.</option>
        </select>
        <SearchBarContainer />
        <button>(Doesn't do anything yet)</button>
      </div>
    );
  }
}

export default SearchRestaurant;
