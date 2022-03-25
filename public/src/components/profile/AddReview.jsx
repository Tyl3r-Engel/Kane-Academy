import React, {useState, useContext} from 'react'
import { ProfileContext } from './ProfileRoot'
import Ratings from 'react-ratings-declarative';
import postReview from './axios/postReview.js'
import requestReviews from './axios/requestReviews.js'

export default function AddReview() {
  const { currentProfile, currentReviews, setCurrentReviews, loggedInUser } = useContext(ProfileContext)
  const [ reviewText, setReviewText ] = useState('')
  const [ rating, setRating ] = useState(3)

  function handleChange(event) {
    setReviewText(event.target.value)
  }

  function submitReview(event) {
    event.preventDefault();

    let payload = {
      mentor_id: currentProfile.id,
      learner_id: loggedInUser.id,
      skill_id: event.target.skills.value,
      rating,
      body: reviewText,
      time: new Date()
    }

    postReview(payload, (data) => {
      requestReviews(currentProfile.id, (result) => {
        setCurrentReviews(result)
      })
    })
  }

  if (currentProfile.id !== loggedInUser.id) {
    return(
      <div>
        <div>Add your own review!</div>
        <br></br>
          <Ratings
            rating={rating}
            widgetRatedColors="purple"
            changeRating={(newRating) => setRating(newRating)}
          >
            <Ratings.Widget widgetHoverColor="#b19cd9" widgetDimension="25px"/>
            <Ratings.Widget widgetHoverColor="#b19cd9" widgetDimension="25px"/>
            <Ratings.Widget widgetHoverColor="#b19cd9" widgetDimension="25px"/>
            <Ratings.Widget widgetHoverColor="#b19cd9" widgetDimension="25px"/>
            <Ratings.Widget widgetHoverColor="#b19cd9" widgetDimension="25px"/>
          </Ratings>
        <form onSubmit={submitReview}>
          <span>What skill are you reviewing?&nbsp;</span>
          <select name="skills" id="skills">
            {Object.values(currentProfile.skills).map((skill) => {
              return(
                <option key={skill.skill_id} value={skill.skill_id}>{skill.skill}</option>
              )
            })}
          </select>
          <br></br>
          <textarea
            rows="5"
            cols="50"
            value={reviewText}
            name={reviewText}
            onChange={handleChange}
            placeholder="Your Review..."
            required>
          </textarea>
          <br></br>
          <input type="submit" value="Submit Review"></input>
        </form>
      </div>
    )
  } else {
    return(null)
  }
}