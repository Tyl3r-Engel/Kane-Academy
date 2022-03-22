import React, {useContext, useState} from 'react'
import { ProfileContext } from './ProfileRoot'
import Ratings from 'react-ratings-declarative';

export default function Blurb() {
  const {currentProfile, setCurrentProfile, reviewsAverage, skillsList, editable} = useContext(ProfileContext)

  function handleChange(event) {
    setCurrentProfile({...currentProfile, [event.target.name]: event.target.value})
  }

  function changeSkills(event) {
    let payload = currentProfile.skills[event.target.name]
    payload.skill = event.target.value
    setCurrentProfile({...currentProfile, skills: {...currentProfile.skills, [event.target.name]: payload}})
  }

  function submitChange(event) {
    event.preventDefault();
    console.log(currentProfile)
  }

  if (currentProfile === undefined) {
    return (<div>This user currently has an empty profile.</div>)
  }
  if (editable) {
    if (skillsList !== null) {
      return(
        <div className="blurb">
          <div>
            {currentProfile.first_name} {currentProfile.last_name}
          </div>
          <div>
            {<Ratings
                rating={reviewsAverage}
                widgetRatedColors="purple"
              >
              <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
              <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
              <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
              <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
              <Ratings.Widget className="reviewStar" widgetDimension="25px"/>
            </Ratings>}
          </div>
          <form onSubmit={submitChange} style={{width: "400px"}}>
            <p>Please select up to five skills:</p>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[0]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[0].skill}>
            </input>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[1]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[1].skill}>
            </input>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[2]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[2].skill}>
            </input>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[3]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[3].skill}>
            </input>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[4]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[4].skill}>
            </input>
            <input
              type="submit" value="Save Changes"></input>
          </form>
            <br></br>
          <form onSubmit={submitChange}>
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
              rating={reviewsAverage}
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