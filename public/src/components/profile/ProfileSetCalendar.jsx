import React from 'react';
// import ApiCalendar from 'react-google-calendar-api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import requestCurrentSession from './axios/requestCurrentSession';

export default function ProfileSetCalendar() {
  // const [sign, setSign] = React.useState(false);
  // const [myEvents, setMyEvents] = React.useState([]);
  // const [uMail, setUMail] = React.useState('');
  // const [timeZ, setTimeZ] = React.useState('');
  const [avail, setAvail] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hasSub, setHasSub] = React.useState(false);
  const [calUrl, setCalUrl] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const url = React.useRef('');

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
    setCalUrl(e.target.value);
    url.current = e.target.value;
  }

  // let calInit = () => {
  //   Calendly.initInlineWidget({
  //     'url': url,
  //     'parentElement': document.getElementById('allThingsCal'),
  //     'prefill': {},
  //     'utm': {}
  //   });
  // }


  let urlSubmit = () => {
    requestCurrentSession((mId) => {
      mId[0].sess.replace('/', '')
      mId[0].sess.replace("\"", '')
      axios.put('/api/calendly', {
        calendly: calUrl,
        mentId: JSON.parse(mId[0].sess).passport.user.id
      }, (result) => console.log(result))
    })
    .then(() => handleClose());
  }

  let urlGet = () => {
    requestCurrentSession((mId) => {
      mId[0].sess.replace('/', '')
      mId[0].sess.replace("\"", '')
      axios.post('/api/calendly', {
        mentId: JSON.parse(mId[0].sess).passport.user.id
      }, (result) => setCalUrl(result))
    })
  }

  React.useEffect(() => {
    urlGet();
  }, [hasSub]);

  // let handleItemClick = (event, name) => {
  //       if (name === 'sign-in') {
  //         ApiCalendar.handleAuthClick()
  //         .then(() => {
  //           console.log('Sign in successful!');
  //           setSign(true);
  //         })
  //         .catch((e) => {
  //           console.error(`Sign in failed ${e}`);
  //         })
  //       } else if (name === 'sign-out') {
  //         ApiCalendar.handleSignoutClick();
  //         setSign(false);
  //         setMyEvents([]);
  //         setUMail('');
  //         setTimeZ('');
  //       }
  //     }

  let showAvail = () => {
    setAvail(!avail);
  }


  // React.useEffect(() => {
  //   if (sign) {
  //     ApiCalendar.listUpcomingEvents(10, ApiCalendar.calendar)
  //     .then(({ result }) => {
  //       console.log(result.items);
  //       setMyEvents(result.items);
  //       let mail = result.items[0].attendees[0].email;
  //       let zone = result.items[0].start.timeZone;
  //       setUMail(mail.slice(0, mail.indexOf('@')));
  //       setTimeZ(zone.slice(zone.indexOf('/') + 1, zone.length));
  //     });
  //   }
  // }, [sign])

  return (
    <div id='allThingsCal'>
      {/* {!sign
      &&
      <button
        onClick={(e) => handleItemClick(e, 'sign-in')}
      >
        Sign-in
      </button>
      }
      {sign
      &&
      <button
          onClick={(e) => handleItemClick(e, 'sign-out')}
      >
        Sign-out
      </button>
      }
      {myEvents.length !== 0
      &&
      <iframe src={`https://calendar.google.com/calendar/embed?src=${uMail}%40gmail.com&ctz=America%2F${timeZ}`}
      style={{"border": "0"}} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
      } */}
      <Button variant="contained" onClick={() => handleOpen()}>Edit Schedule</Button>

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
          <Button id='subURL' fullWidth={true} variant="contained" onClick={() => urlSubmit()}>Finish</Button>
        </Box>
      </Modal>


      <div className="calendly-inline-widget" data-url={calUrl} style={{"minWidth": "320px", "height": "750px"}}></div>


      It seems you haven't linked your Calendly yet. Click the "Edit Schedule" button and follow the instructions provided to display your appointment screen here.
      <Button id='backBtn' variant="contained" onClick={() => window.location.reload()}>Refresh Calendly</Button>


    </div>
  );
}
