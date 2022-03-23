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
import ProfileSetCalendar from './ProfileSetCalendar';

export const ProfileContext = React.createContext();

export default function ProfileRoot() {
  const [loggedInUser, setLoggedInUser] = useState(null) // null
  const [currentProfile, setCurrentProfile] = useState(null) // undefined
  const [currentReviews, setCurrentReviews] = useState(null) // ""
  const [reviewsAverage, setReviewsAverage] = useState(null) // NaN
  const [skillsList, setSkillsList] = useState(null) // []
  const [editable, setEditable] = useState(false) // false

  if (loggedInUser === null) {
    requestCurrentSession((result) => {
      result[0].sess.replace('/', '')
      result[0].sess.replace("\"", '')
      setLoggedInUser(JSON.parse(result[0].sess).passport.user)
    })
  }

  let mentor = window.location.href.replace('http://localhost:3001/profile/', '')

  if (mentor === 'http://localhost:3001/profile' && loggedInUser !== null) {
    mentor = loggedInUser.id
  }

  if (currentProfile === null && loggedInUser !== null) {
    requestProfile(mentor, (result) => {
      setCurrentProfile(result[0])
    })
  }

  if (currentReviews === null && mentor !== 'http://localhost:3001/profile') {
    requestReviews(mentor, (result) => {
      if (result === null) {
        setCurrentReviews({})
      }
      setCurrentReviews(result)
    })
  }

  // if (currentReviews === null) {
  //   requestReviews(mentor, (result) => {
  //     setCurrentReviews(result)
  //   })
  // }

  // if (reviewsAverage === null && currentReviews !== null) {
  //   setReviewsAverage(averageReviews(currentReviews))
  // }


  if (window.location.href === 'http://localhost:3001/profile') {
    if (!editable) {
      setEditable(true)
    }
  } else {
    if (editable) {
      setEditable(false)
    }
  }

  const ProfileProvider = useMemo(() => (
    {
      currentProfile, setCurrentProfile, currentReviews, setCurrentReviews, reviewsAverage, loggedInUser, editable, skillsList
    }
  ), [currentProfile, setCurrentProfile, currentReviews, setCurrentReviews, reviewsAverage, loggedInUser, editable, skillsList]);

  if (currentProfile === null || currentReviews === null) {
    return (null)
  } else {
    return (
      <ProfileContext.Provider value={ProfileProvider}>
        <Logout />
        <Blurb />
        <Reviews />
        <PlansAndPricing />
      </ProfileContext.Provider>
    );
  }
}