import React, {useContext, useState} from 'react'
import { ProfileContext } from './ProfileRoot'
import Ratings from 'react-ratings-declarative';
import averageReviews from './helpers/averageReviews';
import updateMentorSkills from './axios/updateMentorSkills';
import updateMentorProfile from './axios/updateMentorProfile';
import addSkill from './axios/addSkill';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function Blurb() {
  const {currentProfile, setCurrentProfile, loggedInUser, reviewsAverage, skillsList, editable} = useContext(ProfileContext)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
    payload.price = '$' + event.target.value.replace('$', '')
    setCurrentProfile({...currentProfile, skills: {...currentProfile.skills, [event.target.name]: payload}})
  }

  function submitAbout(event) {
    event.preventDefault();
    console.log('submitAbout')
    updateMentorProfile(currentProfile.id, currentProfile.about, (data) => {
    })
    submitSkills(event)
  }

  function submitSkills(event) {
    event.preventDefault()
    console.log('submitSkills')
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

  if (currentProfile === undefined) {
    return (<div>This user currently has an empty profile.</div>)
  }
  if (editable) {
    if (skillsList !== null) {
      return(
        <div className="blurb">
          <h1>{currentProfile.first_name} {currentProfile.last_name}</h1>
          <form onSubmit={submitSkills}>
          <p>Please select up to five skills:</p>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={2}>
              <Grid item xs={1}>
                {/* <Item> */}
                  <TextField
                    id="outlined-basic"
                    label="Your First Skill"
                    variant="outlined"
                    name={Object.keys(currentProfile.skills)[0]}
                    onChange={changeSkills}
                    value={Object.values(currentProfile.skills)[0].skill}>
                  </TextField>
                {/* </Item> */}
              </Grid>
              <Grid item xs={1}>
                {/* <Item> */}
                  <TextField
                    id="outlined-basic"
                    label="30 Minute Rate"
                    variant="outlined"
                    name={Object.keys(currentProfile.skills)[0]}
                    onChange={changePrice}
                    value={Object.values(currentProfile.skills)[0].price}>
                  </TextField>
                {/* </Item> */}
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="outlined-basic"
                  label="Your Second Skill"
                  variant="outlined"
                  name={Object.keys(currentProfile.skills)[1]}
                  onChange={changeSkills}
                  value={Object.values(currentProfile.skills)[1].skill}>
                </TextField>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="outlined-basic"
                  label="30 Minute Rate"
                  variant="outlined"
                  name={Object.keys(currentProfile.skills)[1]}
                  onChange={changePrice}
                  value={Object.values(currentProfile.skills)[1].price}>
                </TextField>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="outlined-basic"
                  label="Your Third Skill"
                  variant="outlined"
                  name={Object.keys(currentProfile.skills)[2]}
                  onChange={changeSkills}
                  value={Object.values(currentProfile.skills)[2].skill}>
                </TextField>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="outlined-basic"
                  label="30 Minute Rate"
                  variant="outlined"
                  name={Object.keys(currentProfile.skills)[2]}
                  onChange={changePrice}
                  value={Object.values(currentProfile.skills)[2].price}>
                </TextField>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="outlined-basic"
                  label="Your Fourth Skill"
                  variant="outlined"
                  name={Object.keys(currentProfile.skills)[3]}
                  onChange={changeSkills}
                  value={Object.values(currentProfile.skills)[3].skill}>
                </TextField>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="outlined-basic"
                  label="30 Minute Rate"
                  variant="outlined"
                  name={Object.keys(currentProfile.skills)[3]}
                  onChange={changePrice}
                  value={Object.values(currentProfile.skills)[3].price}>
                </TextField>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="outlined-basic"
                  label="Your Fifth Skill"
                  variant="outlined"
                  name={Object.keys(currentProfile.skills)[4]}
                  onChange={changeSkills}
                  value={Object.values(currentProfile.skills)[4].skill}>
                </TextField>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  id="outlined-basic"
                  label="30 Minute Rate"
                  variant="outlined"
                  name={Object.keys(currentProfile.skills)[4]}
                  onChange={changePrice}
                  value={Object.values(currentProfile.skills)[4].price}>
                </TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid item xs={9}>
              <form onSubmit={submitAbout}>
                <TextField
                  id="outlined-basic"
                  name="about"
                  label="About Me"
                  variant="outlined"
                  fullWidth={true}
                  value={currentProfile.about}
                  onChange={handleChange}>
                </TextField>
                <br></br>
                <Button id='muiPrimary' variant="contained" onClick={submitAbout} fullWidth={true}>Save Changes</Button>
              </form>
            </Grid>
          </Box>
          </form>
        </div>
      )
    } else {
      return (null)
    }
  } else {
    return(
      <div className="blurb">
        <h1>{currentProfile.first_name} {currentProfile.last_name}</h1>
        <div>
          <h2>Currently Teaching</h2>
              {Object.values(currentProfile.skills).map((entry) => {
                return <span key={entry.skill} style={{fontSize: "x-large"}}>{entry.skill}, </span>
              })}
        </div>
        <div style={{fontSize: "large"}}>
          <h2>About Me</h2>
          {currentProfile.about}
        </div>
      </div>
    )
  }
}