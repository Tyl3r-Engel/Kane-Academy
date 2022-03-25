import React, {useContext, useState} from 'react'
import { ProfileContext } from './ProfileRoot'
import Ratings from 'react-ratings-declarative';
import averageReviews from './helpers/averageReviews';
import updateMentorSkills from './axios/updateMentorSkills';
import updateMentorProfile from './axios/updateMentorProfile';
import updateProfilePhoto from './axios/updateProfilePhoto';
import addSkill from './axios/addSkill';
import { Avatar, Button, Modal, Box, Typography, TextField } from '@mui/material';
// 'https://i.imgur.com/KOwCIw8.png'

export default function Blurb() {
  const profilePic = '';
  const [open, setOpen] = React.useState(false);
  const [profPic, setProfPic] = React.useState('');
  const [profPicTemp, setProfPicTemp] = React.useState('');
  const {currentProfile, setCurrentProfile, loggedInUser, reviewsAverage, skillsList, editable} = useContext(ProfileContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  let photoInput = (e) => {
    setProfPicTemp(e.target.value);
  }

  let photoSubmit = () => {
    updateProfilePhoto(currentProfile.id, profPicTemp, () => {
      photoGet();
      setOpen(false);
    })
  }

  let photoGet = () => {
      setProfPic(currentProfile.photo);
  }

  React.useEffect(() => {
    photoGet()
  }, []);


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

  if (loggedInUser !== undefined && currentProfile !== undefined) {
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
          <Avatar variant='circular' src={profPic} alt='Profile Pic' sx={{ 'width': '100px', 'height': '100px' }}></Avatar>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Paste a Link to a Profile Picture Below
              </Typography>
              <TextField
                id="outlined-basic"
                fullWidth={true}
                label="Photo URL"
                variant="outlined"
                name={currentProfile.photo}
                onChange={(e) => photoInput(e)}
                value={currentProfile.photo}
                >
              </TextField>
              <Button id='muiPrimary' fullWidth={true} variant="contained" onClick={() => photoSubmit()}>Finish</Button>
            </Box>
          </Modal>
          <Button id='muiPrimary' variant="contained" onClick={() => handleOpen()}>Update Photo</Button>
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
              value={Object.values(currentProfile.skills)[0].skill || ''}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[0]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[0].price || ''}>
            </input></span>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[1]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[1].skill || ''}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[1]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[1].price || ''}>
            </input></span>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[2]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[2].skill || ''}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[2]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[2].price || ''}>
            </input></span>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[3]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[3].skill || ''}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[3]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[3].price || ''}>
            </input></span>
            <input
              type="text"
              placeholder="Your skill..."
              name={Object.keys(currentProfile.skills)[4]}
              onChange={changeSkills}
              value={Object.values(currentProfile.skills)[4].skill || ''}>
            </input>
            <span>$<input
              type="number"
              placeholder="Your rate for 30 minutes"
              name={Object.keys(currentProfile.skills)[4]}
              onChange={changePrice}
              value={Object.values(currentProfile.skills)[4].price || ''}>
            </input></span>
            <input
              type="submit" value="Save Changes"></input>
          </form>
            <br></br>
          <form onSubmit={submitAbout}>
            <p>Tell students a little bit about yourself!:</p>
            <textarea name="about" rows="5" cols="50" value={currentProfile.about} onChange={handleChange}></textarea>
            <br></br>
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
      <Avatar variant='circular' src={profPic} alt='Profile Pic' sx={{ 'width': '100px', 'height': '100px' }}></Avatar>
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