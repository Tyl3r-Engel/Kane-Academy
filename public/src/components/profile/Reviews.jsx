import React, {useContext} from 'react'
import { ProfileContext } from './ProfileRoot'
import Ratings from 'react-ratings-declarative';

export default function Reviews() {
  const {currentReviews} = useContext(ProfileContext)
  if (currentReviews === null || currentReviews === undefined || currentReviews === '') {
    return(<div>There are currently no reviews for this user.</div>)
  }
  return(
    <div className="reviewsWindow">{currentReviews.map((review) => {
      return(
        <div className="review" key={review.id}>
          <div>
            Rating: {<Ratings
            rating={review.rating}
            widgetRatedColors="purple"
          >
            <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
            <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
            <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
            <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
            <Ratings.Widget className="reviewStar" widgetDimension="15px"/>
          </Ratings>}
          </div>
          <div>
            {review.body}
          </div>
        </div>
      )
    })}</div>
  )
}