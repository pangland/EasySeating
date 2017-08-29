import React from 'react';
import { withRouter } from 'react-router-dom';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: ""
    };
  }

  componentDidMount() {
    this.props.requestSingleRestaurant(this.props.match.params.restaurantId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.restaurantId !== nextProps.match.params.restaurantId) {
      this.props.requestSinglePokemon(nextProps.match.params.restaurantId);
    }
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

  }

  render() {
    if (!this.props.restaurant) return null;

    return (
      <div>
        <div className='restaurant-header-block'>
          <div className='header-image-div'>
            <img src='http://res.cloudinary.com/pangland/image/upload/c_scale,h_105,w_105/v1503603321/seemi-samuel-15564_sst0nn.jpg' />
          </div>
          <div className='header-info-div'>
            <h2>{this.props.restaurant.name}</h2>
            <span>Rating: {this.props.restaurant.rating}</span>
            <span>{this.props.restaurant.cuisine}    |    {this.props.restaurant.price}</span>
          </div>
        </div>

        <div className='horizontal-restaurant-blocks'>
          <nav className='floating-nav'>
            <ul>
              <li>All I want to do</li>
              <li>is see you turn into</li>
              <li>a giant woman</li>
            </ul>
          </nav>


          <div className='restaurant-mid'>
            <div className = 'fancy-res-search'>
              <h2>Find your seats!</h2>
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
                <button onClick={this.handleSubmit}>Find Slots</button>
              </div>
            </div>



            <div className='description-block'>
              <h3>About {this.props.restaurant.name}</h3>
              <p>{this.props.restaurant.description}</p>
            </div>
          </div>

          <div className='info-block'>
            <ul>
              <li>Drowning in all this regret</li>
              <li>Wouldn't you rather forget</li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default Restaurant;
