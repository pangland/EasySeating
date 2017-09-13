import React from 'react';
import ReactStars from 'react-stars';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.review = {
      rating: undefined,
      food: 0,
      service: 0,
      ambiance: 0,
      value: 0,
      body: "",
      reservation_id: this.props.reservation.id
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOverall = this.handleOverall.bind(this);
    this.handleFood = this.handleFood.bind(this);
    this.handleService = this.handleService.bind(this);
    this.handleAmbience = this.handleAmbience.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  handleChange(field) {
    this.review['body'] = field;
  }

  handleSubmit(e) {
    e.preventDefault();
    const review = Object.assign({}, this.review);
    this.props.createReview(review).then(() => this.props.closeModal());
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
    this.review['ambiance'] = newRating;
  }

  handleValue(newRating) {
    this.review['value'] = newRating;
  }

  render() {
    return (
      <section className='modal-div-review'>
        <span>
          {this.props.currentUser.username}, how was your visit to {this.props.reservation.name}?
        </span>

        {this.props.renderErrors.bind(this)()}
        <form className='new-review-form'>
          <span>Overall</span>
          <ReactStars count={5} size={20} half={false}
            onChange={this.handleOverall} color2={'#DC143C'}/>

          <span>Food</span>
          <ReactStars count={5} size={20} half={false}
            onChange={this.handleFood} color2={'#DC143C'}/>

          <span>Service</span>
          <ReactStars count={5} size={20} half={false}
            onChange={this.handleService} color2={'#DC143C'}/>

          <span>Ambience</span>
          <ReactStars count={5} size={20} half={false}
            onChange={this.handleAmbience} color2={'#DC143C'}/>

          <span>Value</span>
          <ReactStars count={5} size={20} half={false}
            onChange={this.handleValue} color2={'#DC143C'}/>

          <textarea className="description-input"
              ref="body"
              cols='59' rows='10'
              placeholder="Write your review here! (optional)"
              defaultValue={ this.review.body }
              onChange={this.handleChange('body')}>
            </textarea>

          <button type="submit" className='form-submit'
            onClick={this.handleSubmit}>{this.props.formType}
            Submit Review
          </button>
        </form>
      </section>
    );
  }
}

export default ReviewForm;
