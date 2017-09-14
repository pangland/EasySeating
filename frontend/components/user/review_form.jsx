import React from 'react';
import ReactStars from 'react-stars';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.reservation.reviewed) {
      this.review = {
        rating: this.props.reservation.review.rating,
        food: this.props.reservation.review.food,
        service: this.props.reservation.review.service,
        ambience: this.props.reservation.review.ambience,
        value: this.props.reservation.review.value,
        body: this.props.reservation.review.body,
        reservation_id: this.props.reservation.id
      };
    } else {
      this.review = {
        rating: undefined,
        food: undefined,
        service: undefined,
        ambience: undefined,
        value: undefined,
        body: "",
        reservation_id: this.props.reservation.id
      };
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOverall = this.handleOverall.bind(this);
    this.handleFood = this.handleFood.bind(this);
    this.handleService = this.handleService.bind(this);
    this.handleAmbience = this.handleAmbience.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  componentWillMount() {
    if (this.props.reservation.reviewed) {
      this.props.requestSingleReview(this.props.reservation.id);
    }
  }

  // componentDidMount() {
  //   if (this.props.reservation.reviewed) {
  //     this.review.rating = this.props.reservation.review.rating;
  //     this.review.food = this.props.reservation.review.food;
  //     this.review.service = this.props.reservation.review.service;
  //     this.review.ambience = this.props.reservation.review.ambience;
  //     this.review.value = this.props.reservation.review.value;
  //     this.review.body = this.props.reservation.review.body;
  //   }
  // }

  handleChange(e) {
    this.review['body'] = e.currentTarget.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    const review = Object.assign({}, this.review);
    if (this.props.reservation.reviewed) {
      this.props.updateReview(review).then(() => this.props.closeModal());
    } else {
      this.props.createReview(review).then(() => this.props.closeModal());
    }
  }

  handleOverall(newRating) {
    this.review['rating'] = newRating;
  }

  handleFood(newRating) {
    this.review['food'] = newRating;
  }

  handleService(newRating) {
    this.review['service'] = newRating;
  }

  handleAmbience(newRating) {
    this.review['ambience'] = newRating;
  }

  handleValue(newRating) {
    this.review['value'] = newRating;
  }

  render() {
    const reviewed = this.props.reservation.reviewed;

    const verbText = this.props.reservation.reviewed ? "Update" : "Submit";

    const ratingStar = reviewed ? this.review.rating : 0;
    const foodStar = reviewed ? this.review.food : 0;
    const serviceStar = reviewed ? this.review.service : 0;
    const ambienceStar = reviewed ? this.review.ambience : 0;
    const valueStar = reviewed ? this.review.value : 0;

    debugger

    return (
      <section className='modal-div-review'>
        <span>
          {this.props.currentUser.username}, how was your visit to {this.props.reservation.name}?
        </span>

        {this.props.renderErrors.bind(this)()}
        <form className='new-review-form'>
          <span>Overall</span>
          <ReactStars count={5} size={20} half={false}
            value={Math.round(ratingStar)}
            onChange={this.handleOverall} color2={'#DC143C'}/>

          <span>Food</span>
          <ReactStars count={5} size={20} half={false}
            value={Math.round(foodStar)}
            onChange={this.handleFood} color2={'#DC143C'}/>

          <span>Service</span>
          <ReactStars count={5} size={20} half={false}
            value={Math.round(serviceStar)}
            onChange={this.handleService} color2={'#DC143C'}/>

          <span>Ambience</span>
          <ReactStars count={5} size={20} half={false}
            value={Math.round(ambienceStar)}
            onChange={this.handleAmbience} color2={'#DC143C'}/>

          <span>Value</span>
          <ReactStars count={5} size={20} half={false}
            value={Math.round(valueStar)}
            onChange={this.handleValue} color2={'#DC143C'}/>

          <textarea className="description-input"
              ref="body"
              cols='59' rows='10'
              placeholder="Write your review here! (optional)"
              defaultValue={ this.review.body }
              onChange={this.handleChange}>
            </textarea>

          <button type="submit" className='form-submit'
            onClick={this.handleSubmit}>{this.props.formType}
            {verbText} Review
          </button>
        </form>
      </section>
    );
  }
}

export default ReviewForm;
