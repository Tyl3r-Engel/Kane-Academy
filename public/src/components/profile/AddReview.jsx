import React, {useState, useContext} from 'react'
import { ProfileContext } from './ProfileRoot'
import Ratings from 'react-ratings-declarative';
import postReview from './axios/postReview.js'
import requestReviews from './axios/requestReviews.js'
import { Button, TextField, MenuItem, Box, Grid } from '@mui/material/'

export default function AddReview() {
  const { currentProfile, currentReviews, setCurrentReviews, loggedInUser } = useContext(ProfileContext)
  const [ reviewText, setReviewText ] = useState('')
  const [ rating, setRating ] = useState(3)
  const [ selectedSkill, setSelectedSkill ] = useState('')

  function handleChange(event) {
    setReviewText(event.target.value)
  }

  function changeSkill(event) {
    setSelectedSkill(event.target.value)
  }

  function submitReview(event) {
    event.preventDefault();
    let profile = Object.values(currentProfile.skills)

    let payload = {
      mentor_id: currentProfile.id,
      learner_id: loggedInUser.id,
      skill_id: '',
      rating,
      body: reviewText,
      time: new Date()
    }

    for (var i = 0; i < profile.length; i++) {
      if (profile[i].skill === selectedSkill) {
        payload.skill_id = profile[i].skill_id
      }
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
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={submitReview}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <h3>Add your own review!</h3>
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
                <div>What skill are you reviewing?&nbsp;</div>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={selectedSkill}
                  onChange={changeSkill}
                  fullWidth={true}
                  required
                >
                  {Object.values(currentProfile.skills).map((option) => (
                    <MenuItem key={option.skill_id} value={option.skill}>
                      {option.skill}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Get started now!"
                  variant="outlined"
                  name={reviewText}
                  onChange={handleChange}
                  value={reviewText}
                  fullWidth={true}
                  multiline
                  rows={6}
                  required>
                </TextField>
              </Grid>
            </Grid>
            <Button id='muiPrimary' variant="contained" onClick={submitReview} fullWidth={true}>Submit Review</Button>
          </form>
        </Box>
      </div>
    )
  } else {
    return(null)
  }
}