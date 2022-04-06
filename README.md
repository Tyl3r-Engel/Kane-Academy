# Kane Academy
## Table of Contents
- [Description](#description)
- [How To Use](#how-to-use)
- [Team Info](#team-info)

---
<br>

## Description

>This full stack application aims to connect mentors with learners by allowing a user the sign up as either a genius or a learner. If the user signs up as a genius they will be given the option to customize their account with the skills that they want to teach. Geniuses can connect a calender with Calendly for learners to book appointments. If the user signs up as a learner they have the ability to search for a genius or skills that they want to learn. Learners can also link their own google calender to see up coming events. This application also supports direct messaging and video calls between all users.

#### Technologies
- Frontend
  - React
  - JavaScript
  - Material UI
  - Socket.IO client
  - Axios
  - Simple-Peer
  - fuse.js
- Backend
  - Express
  - Morgan
  - Passport
  - PG
  - Socket.IO

[Back To The Top](#kane-academy)

---
<br>

## How To Use

#### Installation
```bash
  $ npm install
  $ npm run react-dev
  $ npm run postgres-init
  $ npm run start
```
>*If you want the database to be populated with fake data got to the /fakedata endpoint*

<br>

### Usage
>A user can login through Google or create an account after witch the user will be prompted to pick either genius or learner. A genius can customize their profile by navigating to their profile via the nav bar. A learner can use the search bar to look for a skill to learn or a genius also on the learners home page is the option to link their Google calender. The nav bar also has a messages tab that allow users to communicate through messaging and video chat.

<br>

#### Needed Files
> For any of the google features to work you will need a ```.env``` as well as a ```apiGoogleconfig.json``` file.

>For PostgreSQL to work a ```pool.js``` file will need to be created in the ```db``` folder.

<br>

> The ```.env``` file will look something like this.
```javascript
GOOGLE_CLIENT_ID = /* This is where your Google client ID will go */
GOOGLE_CLIENT_SECRET = /* This is where your Google client secret will go */
```

<br>

> The ```apiGoogleconfig.json``` file will look something like this.
```json
{
  "clientId": /* This is where your Google client ID will go */,
  "apiKey": /* This is where your Google api key will go */,
  "scope": "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}
```

<br>

> The ```pool.js``` file will look something like this.
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: /* User Name for your postgres */,
  host: 'localhost',
  database: 'ka',
  password: /* Postgres password */,
  port: '5432',
});

module.exports = { pool };
```

[Back To The Top](#kane-academy)

---

## Team Info
- Link to team repo. (https://github.com/Team-Endurance/Blue-Ocean)

[Back To The Top](#kane-academy)
