import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function HomeRoot() {
  const [sign, setSign] = React.useState(false);
  const [myEvents, setMyEvents] = React.useState([]);
  const [uMail, setUMail] = React.useState('');
  const [timeZ, setTimeZ] = React.useState('');

  let handleItemClick = (event, name) => {
        if (name === 'sign-in') {
          ApiCalendar.handleAuthClick()
          .then(() => {
            console.log('Sign in successful!');
            setSign(true);
          })
          .catch((e) => {
            console.error(`Sign in failed ${e}`);
          })
        } else if (name === 'sign-out') {
          ApiCalendar.handleSignoutClick();
          setSign(false);
          setMyEvents([]);
          setUMail('');
          setTimeZ('');
        }
      }

  React.useEffect(() => {
    if (sign) {
      ApiCalendar.listUpcomingEvents(10, ApiCalendar.calendar)
      .then(({ result }) => {
        console.log(result.items);
        setMyEvents(result.items);
        let mail = result.items[0].attendees[0].email;
        let zone = result.items[0].start.timeZone;
        setUMail(mail.slice(0, mail.indexOf('@')));
        setTimeZ(zone.slice(zone.indexOf('/') + 1, zone.length));
      });
    }
  }, [sign])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} id='calContainer'>
      <div id='calButtons'>
      {!sign
      &&
        <Button
          id='muiSecondary'
          variant='contained'
          onClick={(e) => handleItemClick(e, 'sign-in')}
        >
          View Upcoming Appointments with Google Calendar
        </Button>
      }

      {sign
      &&
        <Button
          id='muiSecondary'
          variant='contained'
          onClick={(e) => handleItemClick(e, 'sign-out')}
        >
          Sign Out of Google Calendar
        </Button>
      }
      </div>
      <div id='calCal'>
      {myEvents.length !== 0
      &&
        <iframe src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23c0a0ca&ctz=America%2FDenver&showTz=1&showCalendars=1&showTabs=1&showPrint=0&showNav=1&mode=AGENDA&
        src=ZGVubmlzLm0uYmVyZXppbkBnbWFpbC5jb20&color=%23039BE5&src=${uMail}%40gmail.com&ctz=America%2F${timeZ}`}
        style={{"border": "0"}} width="500" height="500" frameBorder="0" scrolling="no"></iframe>


      }
      </div>
    </Box>
  )}
