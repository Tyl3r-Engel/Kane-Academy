import React, {useContext, useState} from 'react'
import { ProfileContext } from './ProfileRoot'
import Ratings from 'react-ratings-declarative';
import averageReviews from './helpers/averageReviews';
import updateMentorSkills from './axios/updateMentorSkills';
import updateMentorProfile from './axios/updateMentorProfile';
import addSkill from './axios/addSkill';

export default function Blurb() {
  const {currentProfile, setCurrentProfile, loggedInUser, reviewsAverage, skillsList, editable} = useContext(ProfileContext)

  function handleChange(event) {
    setCurrentProfile({...currentProfile, [event.target.name]: event.target.value})
  }

  function changeSkills(event) {
    let payload = currentProfile.skills[event.target.name]
    payload.skill = event.target.value
    setCurrentProfile({...currentProfile, skills: {...currentProfile.skills, [event.target.name]: payload}})
  }

  function changePrice(event) {
    let payload = currentProfile.skills[event.target.name]
    payload.price = event.target.value
    setCurrentProfile({...currentProfile, skills: {...currentProfile.skills, [event.target.name]: payload}})
  }

  function submitAbout(event) {
    event.preventDefault();
    updateMentorProfile(currentProfile.id, currentProfile.about, (data) => {
      console.log(data)
    })
  }

  function submitSkills(event) {
    event.preventDefault()
    var currentSkills = Object.values(currentProfile.skills)
    for (var i = 0; i < currentSkills.length; i++) {
      var existingSkill = false
      var existingSkillID = 0
      for (var j = 0; j < skillsList.length; j++) {
        if (skillsList[j].name === currentSkills[i].skill) {
          existingSkill = true
          existingSkillID = skillsList[j].id
        }
      }
      if (existingSkill) {
        updateMentorSkills(currentSkills[i].id, existingSkillID, currentSkills[i].price, () => {
        })
      } else {
        let currentSkill = currentSkills[i]
         addSkill(currentSkills[i].skill, (data) => {
           updateMentorSkills(currentSkill.id, data[0].id, currentSkill.price, () => {
          })
        })
      }
    }
  }

  if (loggedInUser !== undefined) {
    if (loggedInUser.mentor === false && currentProfile.id === loggedInUser.id) {
      return (
        <div>
          Your Average Learner Rating:&nbsp;
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
        </div>
      )
    }
  }

  if (currentProfile === undefined) {
    return (<div>This user currently has an empty profile.</div>)
  }
  if (editable) {
    if (skillsList !== null) {
      return(
        <div className="blurb">
          <div>
            Name: {currentProfile.first_name} {currentProfile.last_name}
          </div>
          <div>
          Average Rating:&nbsp;
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
          </div>
          <form onSubmit={submitSkills} style={{width: "400px"}}>
            <p>Please select up to five skills:</p>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[0]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[0].skill}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[0]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[0].price}>
            </input></span>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[1]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[1].skill}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[1]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[1].price}>
            </input></span>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[2]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[2].skill}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[2]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[2].price}>
            </input></span>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[3]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[3].skill}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[3]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[3].price}>
            </input></span>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[4]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[4].skill}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[4]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[4].price}>
            </input></span>
            <input
              type="submit" value="Save Changes"></input>
          </form>
            <br></br>
          <form onSubmit={submitAbout}>
            <p>Tell students a little bit about yourself!:</p>
            <textarea name="about" rows="5" cols="50" value={currentProfile.about} onChange={handleChange}></textarea>
            <input type="submit" value="Save Changes"></input>
          </form>
        </div>
      )
    } else {
      return (null)
    }
  } else {
    return(
      <div className="blurb">
        <div>
          {currentProfile.first_name} {currentProfile.last_name}
        </div>
        <div>
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
        </div>
        <div>
          Teaching:&nbsp;
            {Object.values(currentProfile.skills).map((entry) => {
              return <span key={entry.skill}>{entry.skill}, </span>
            })}
        </div>
        <div>About Me: {currentProfile.about}</div>
      </div>
    )
  }
}