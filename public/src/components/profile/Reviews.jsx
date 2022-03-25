import React, {useContext} from 'react'
import { ProfileContext } from './ProfileRoot'
import Ratings from 'react-ratings-declarative';
import AddReview from './AddReview';
import date from './helpers/date.js'
import averageReviews from './helpers/averageReviews';

export default function Reviews() {
  const {currentReviews, reviewsAverage} = useContext(ProfileContext)
  if (currentReviews === null || currentReviews === undefined || currentReviews === '' || currentReviews.length === 0) {
    return(<div>There are currently no reviews for this user.</div>)
  }
  return(
    <div>
      <h1>Reviews</h1>
      <AddReview />
      <h3>Average Rating:&nbsp;
        {<Ratings
          rating={reviewsAverage || 0}
          widgetRatedColors="purple"
        >
          <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
          <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
          <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
          <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
          <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
        </Ratings>}
      </h3>
      <div className="reviewsWindow">{currentReviews.map((review) => {
        return(
          <div className="review" key={review.id}>
            <div>
              Rating: {<Ratings
              rating={review.rating || 0}
              widgetRatedColors="purple"
            >
              <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
              <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
              <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
              <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
              <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
            </Ratings>}
            </div>
            <span>From {review.first_name} {review.last_name} on {date(review.time)}</span>
            <div>
              {review.body}
            </div>
          </div>
        )
      })}</div>
    </div>
  )
}