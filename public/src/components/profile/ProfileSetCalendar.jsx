import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import requestCurrentSession from './axios/requestCurrentSession';
import requestMentorCalendar from './axios/requestMentorCalendar';
import updateMentorCalendar from './axios/updateMentorCalendar';
import { ProfileContext } from './ProfileRoot';
import { PopupModal } from "react-calendly";

export default function ProfileSetCalendar() {
  const [open, setOpen] = React.useState(false);
  const [openC, setOpenC] = React.useState(false);
  const [hasSub, setHasSub] = React.useState(false);
  const [calUrl, setCalUrl] = React.useState(null);
  const [calUrlTemp, setCalUrlTemp] = React.useState(null);

  const {currentProfile, setCurrentProfile, loggedInUser, reviewsAverage, skillsList, editable} = React.useContext(ProfileContext);

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

  let urlInput = (e) => {
    setCalUrlTemp(e.target.value);
  }

  let urlSubmit = () => {
    updateMentorCalendar(currentProfile.id, calUrlTemp, () => {
      urlGet();
      setOpen(false);
    })
  }

  let urlGet = () => {
    console.log(currentProfile)
    if (currentProfile !== undefined) {
      requestMentorCalendar(currentProfile.id, (result) => {
        setCalUrl(result)
      })
    }
  }


  React.useEffect(() => {
    urlGet()
  }, []);

  if (currentProfile === undefined) {
    return(null)
  }
  return (
    <div id='allThingsCal'>
      {editable
      &&
      <Button id='muiPrimary' variant="contained" onClick={() => handleOpen()}>Edit Schedule</Button>}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Setting Up Your Schedule
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            First Time:
            <ul>
            <li><a href='https://calendly.com/' target='_blank'>Set up a Calendly account</a></li>
            <li>Set up a calendar with your availability and mentorship options</li>
            <li>Copy the link to your new calendar, paste below and submit</li>
            </ul>
            Editing:
            <ul>
            <li>Edit your calendar on Calendly and changes will be automatically reflected</li>
            <li>If creating a new calendar, copy the link, paste below and submit</li>
            </ul>
          </Typography>
          <TextField id="outlined-basic" fullWidth={true} label="Calendar URL" variant="outlined" onChange={(e) => urlInput(e)}></TextField>
          <Button id='muiPrimary' fullWidth={true} variant="contained" onClick={() => urlSubmit()}>Finish</Button>
        </Box>
      </Modal>



      {calUrl ? (
        <div id='popArea'>
        <Button id='muiSecondary' variant="contained" onClick={() => {setOpenC(true)}}>Schedule Time w/ Me</Button>
        <PopupModal
        url={calUrl}
        rootElement={document.getElementById("popArea")}
        textColor="#ffffff"
        color="#00a2ff"
        onModalClose={() => setOpenC(false)}
        open={openC}
        />
        </div>) : (<div>
      It seems this mentor hasn't linked their Calendly yet. If this is you, click the "Edit Schedule" button and follow the instructions provided to display your scheduling button here.
      </div>
      )

      }




    </div>
  );
}
