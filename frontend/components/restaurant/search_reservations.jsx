import React from 'react';

class SearchReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: "2",
      date: "",
      time: "8:00 a.m."
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  endDate() {
    let theDate = new Date();
    theDate.setDate(theDate.getDate() + 50);

    const dd = theDate.getDate();
    const mm = theDate.getMonth() + 1;
    const y = theDate.getFullYear();

    return y + '-' + mm + '-' + dd;
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  handleSubmit(e) {
    debugger
    this.state.input = e.currentTarget.value;
    this.props.searchReservations(this.state);
  }

  render() {
    return (
      <div className = 'fancy-res-search'>
        <h2>Find your seats!</h2>
        <div className='search-restaurant-div'>
          <select onChange={this.handleChange("seats")} name='seats'>
            <option value='1'>1 person</option>
            <option value='2' selected>2 people</option>
            <option value='3'>3 people</option>
            <option value='4'>4 people</option>
            <option value='5'>5 people</option>
          </select>

          <input onChange={this.handleChange("date")} type="date" id="date" name="date"
            min={new Date().toJSON().slice(0,10)} max={this.endDate()} />

          <select onChange={this.handleChange("time")} name="time">
            <option value="" selected disabled hidden>Select Time</option>
            <option value="7:30 a.m.">7:30 a.m.</option>
            <option value="8:00 a.m." selected>8:00 a.m.</option>
            <option value="8:30">8:30 a.m.</option>
            <option value="9:00">9:00 a.m.</option>
            <option value="7:30">9:30 a.m.</option>
            <option value="7:30">10:00 a.m.</option>
            <option value="7:30">10:30 a.m.</option>
          </select>

          <button onClick={this.handleSubmit}>Find Slots</button>
        </div>
      </div>
    );
  }
}

export default SearchReservations;
