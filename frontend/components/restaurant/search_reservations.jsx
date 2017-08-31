import React from 'react';

class SearchReservations extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    this.state = {
      restaurantId: this.props.match.params.restaurantId,
      seats: "2",
      date: new Date().toJSON().slice(0,10),
      time: "8:00 a.m."
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
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
    this.state.input = e.currentTarget.value;
    this.props.searchReservations(this.state);
  }

  handleReservation(e) {
    if (this.props.currentUser) {
      this.props.createReservation({id: e.currentTarget.value, user_id: this.props.currentUserId});
    } else {
      const temp = document.getElementById("snackbar");
      temp.className = "show";
      setTimeout(() => temp.className = temp.className.replace("show", ""), 3000);
    }
  }

  render() {
    let listFive;
    if (typeof this.props.reservations !== 'undefined') {
      listFive = this.props.reservations.map((reservation, index) => {
        return (
          <li key={index} className='search-list-item'>
            <button value={reservation.id} onClick={this.handleReservation}>
              {new Date(reservation.slot.time).toString().slice(16,21)}
            </button>
          </li>
        );
      });
    } else {
      listFive = null;
    }

    return (
      <div className = 'fancy-res-search'>
        <h2>Find your seats!</h2>
        <div className='search-restaurant-div'>
          <label className='search-restaurant-select-wrapper'>
            <select onChange={this.handleChange("seats")} name='seats'>
              <option value='1'>1 person</option>
              <option value='2' selected>2 people</option>
              <option value='3'>3 people</option>
              <option value='4'>4 people</option>
              <option value='5'>5 people</option>
            </select>
          </label>

          <label className='search-restaurant-select-wrapper'>
            <input onChange={this.handleChange("date")} type="date" id="date"
              name="date" value={new Date().toJSON().slice(0,10)}
              min={new Date().toJSON().slice(0,10)} max={this.endDate()} />
          </label>

          <label className='search-restaurant-select-wrapper'>
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
          </label>

          <button onClick={this.handleSubmit}>Find Slots</button>
        </div>

        <ul className='reservations-in-range'>
          {listFive}
        </ul>

        <div id="snackbar">Please sign in to reserve seats</div>
      </div>
    );
  }
}

export default SearchReservations;
