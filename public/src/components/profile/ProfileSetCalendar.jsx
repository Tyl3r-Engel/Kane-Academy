import React from 'react';
import ApiCalendar from 'react-google-calendar-api';

export default function ProfileSetCalendar() {
  const [sign, setSign] = React.useState(false);
  const [myEvents, setMyEvents] = React.useState([]);
  const [uMail, setUMail] = React.useState('');
  const [timeZ, setTimeZ] = React.useState('');
  const [avail, setAvail] = React.useState(false);
  // const [eStart, seteStart] = React.useState({});
  // const [eEnd, seteEnd] = React.useState({});
  // const [eSummary, seteSummary] = React.useState('');
  // const [eDescription, seteDescription] = React.useState('');

  // var gapi = window.gapi;
  // var clientId = "783131327239-ul0cmtbsl2a80uoi1lnfcsfm0r9uc4rt.apps.googleusercontent.com";
  // var apiKey = "AIzaSyBYRsXxxb-cQQ3F7dVkB158_D1X8IEm1dM";
  // var scope = "https://www.googleapis.com/auth/calendar.events";
  // var discoveryDocs = [
  //   "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  // ];

  // const handleEverything = () => {
  //   console.log(window.gapi)
  //   gapi.load('client:auth2', () => {
  //     console.log('loaded')
  //     gapi.client.init({
  //       'apiKey': apiKey,
  //       'clientId': clientId,
  //       'discoveryDocs': discoveryDocs,
  //       'scope': scope
  //     })
  //     gapi.client.load('calendar', 'v3', () => console.log('boom'))
  //     gapi.auth2.getAuthInstance().signin()
  //     .then
  //   })
  // }





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

  // let showAvail = () => {
  //   setAvail(true);
  // }

  // let createEv = () => {
  //   console.log(ApiCalendar);
  //   console.log(calendarList.get());
  //   let eventDeets = {
  //     'summary': eSummary,
  //     'location': '800 Howard St., San Francisco, CA 94103',
  //     'description': eDescription,
  //     'start': eStart,
  //     'end': eEnd,
  //     'recurrence': [
  //       'RRULE:FREQ=DAILY;COUNT=2'
  //     ],
  //     'attendees': [
  //       {'email': 'lpage@example.com'},
  //       {'email': 'sbrin@example.com'}
  //     ],
  //     'reminders': {
  //       'useDefault': false,
  //       'overrides': [
  //         {'method': 'email', 'minutes': 24 * 60},
  //         {'method': 'popup', 'minutes': 10}
  //       ]
  //     },
  //   }
  //   ApiCalendar.createEvent(eventDeets, 'primary', 'all')
  //   .then((result) => console.log(result));

  //   // var request = gapi.client.calendar.events.insert({
  //   //   'calendarId': 'primary',
  //   //   'resource': eventDeets
  //   // });

  //   // request.execute(function(event) {
  //   //   console.log(event.htmlLink);
  //   // });
  // }



  // let inputChange = (e) => {
  //   e.preventDefault();
  //   if (e.target.id === 'sum') {
  //     seteSummary(e.target.value);
  //   }
  //   if (e.target.id === 'desc') {
  //     seteDescription(e.target.value);
  //   }
  //   if (e.target.id === 'st') {
  //     seteStart({
  //       dateTime: e.target.value,
  //       timeZone: `America/${timeZ}`
  //     });
  //   }
  //   if (e.target.id === 'en') {
  //     seteEnd({
  //       dateTime: e.target.value,
  //       timeZone: `America/${timeZ}`
  //     });
  //   }
  // }

  // let createEvent = (eventId, calendarId, sendUpdates) => {

  // }
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


  // var CLIENT_ID = '783131327239-ul0cmtbsl2a80uoi1lnfcsfm0r9uc4rt.apps.googleusercontent.com';
  // var API_KEY = 'AIzaSyBYRsXxxb-cQQ3F7dVkB158_D1X8IEm1dM';
  // var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  // var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  return (
    <div>
      {!sign
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
      }
      <button onClick={() => showAvail()}>Set Availability</button>
      {avail
      &&
      <form>
        <input id='sum' onChange={(e) => inputChange(e)} type='text' placeholder='Summary'></input>
        <input id='desc' onChange={(e) => inputChange(e)} type='text' placeholder='Description'></input>
        <input id='st' onChange={(e) => inputChange(e)} type='datetime-local'></input>
        <input id='en' onChange={(e) => inputChange(e)} type='datetime-local'></input>
        <a href='https://calendar.google.com/calendar'><button type='button'>Create Open Events</button></a>
      </form>
      }


    </div>
  );
}
