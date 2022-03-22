import axios from 'axios';
import Logout from '../shared/Logout';
import React, { useState, useMemo } from 'react';
import requestProfile from './axios/requestProfile.js';
import requestReviews from './axios/requestReviews.js'
import requestCurrentSession from './axios/requestCurrentSession.js';
import requestSkills from './axios/requestSkills.js';
import Blurb from './Blurb.jsx'
import PlansAndPricing from './PlansAndPricing.jsx'
import averageReviews from './helpers/averageReviews';
import Reviews from './Reviews.jsx'

export const ProfileContext = React.createContext();

export default function ProfileRoot() {
  const [loggedInUser, setLoggedInUser] = useState({user: {id: 1}})
  const [currentProfile, setCurrentProfile] = useState(null)
  const [currentReviews, setCurrentReviews] = useState(null)
  const [reviewsAverage, setReviewsAverage] = useState(null)
  const [skillsList, setSkillsList] = useState(null)
  const [editable, setEditable] = useState(false)

  let mentor = window.location.href.replace('http://localhost:3001/profile/', '')

  if (loggedInUser === null) {
    requestCurrentSession((result) => {
      result[0].sess.replace('/', '')
      result[0].sess.replace("\"", '')
      setLoggedInUser(JSON.parse(result[0].sess).passport)
    })
  }

  if (currentProfile === null) {
    requestProfile(mentor, (result) => {
      setCurrentProfile(result[0])
    })
  }

  if (currentReviews === null) {
    requestReviews(mentor, (result) => {
      setCurrentReviews(result)
    })
  }

  if (reviewsAverage === null && currentReviews !== null) {
    setReviewsAverage(averageReviews(currentReviews))
  }

  if (skillsList === null) {
    requestSkills((result) => {
      setSkillsList(result)
    })
  }

  if (loggedInUser !== null && currentProfile !== null && editable === false) {
    if (loggedInUser.user.id === currentProfile.id) {
      setEditable(true)
    }
  }

  if (editable === true && loggedInUser.user.id !== currentProfile.id) {
    setEditable(false)
  }

  const ProfileProvider = useMemo(() => (
    {
      currentProfile, setCurrentProfile, currentReviews, reviewsAverage, loggedInUser, editable, skillsList
    }
  ), [currentProfile, setCurrentProfile, currentReviews, reviewsAverage, loggedInUser, editable, skillsList]);

  if (currentProfile === null || currentReviews === null) {
    return (null)
  } else {
    return (
      // <Test />
      <ProfileContext.Provider value={ProfileProvider}>
        <Logout />
        <Blurb />
        <Reviews />
        <PlansAndPricing />
      </ProfileContext.Provider>
    );
  }
}