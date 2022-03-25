import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import requestSearchProfiles from './axios/requestSearchProfiles';
import requestSearchData from './axios/requestSearchData';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function Search() {
  const [query, setQuery] = useState('')
  const [searchData, setSearchData] = useState([]);
  const [searchData2, setSearchData2] = useState([]);

  function fetchSearchData() {
    requestSearchData(results => setSearchData(results));
  }

  useEffect(() => {
    fetchSearchData();
  }, [])

  if (searchData.length === 0) {
    return null;
  }

  const fuse = new Fuse(searchData, {
    keys: [
      "first_name",
      "last_name",
      "name"
    ],
    includeScore: true,
    distance: 5,
    threshold: 0.3
  })

  const fuseSearchResults = fuse.search(query);

  function handleOnSearch(event) {
    setQuery(event.target.value);
  }

  function handleClick(event) {
    let mentorId = Number(event.target.getAttribute("data-index"));
    axios.get(`/profile/${mentorId}`)
      .then((results) => {
        window.location = `/profile/${mentorId}`;
      })
      .catch((err) => {
        updateError('Login Failed: Invalid Password or Username');
      });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} id='calContainer'>
      <div id='homeSearchField'>
      <h1>Search</h1>
      <form>
        <label>Looking for a genius?</label>
        <br />
        <br />
        <TextField id='outlined-basic' label='Search Mentor Skill' autoComplete='false' value={query} onChange={handleOnSearch} />
        <Button id='muiPrimary' variant='contained'>Search</Button>
      </form>
      </div>
      <div id='homeSearchResults'>
      <h2>Genius Skills</h2>
      <ul>
        {query ? fuseSearchResults.map((elem, i) => (
          <div key={i} onClick={handleClick} data-index={elem.item.id} style={{display: 'inline-block', padding: '10px'}}>
            <Card sx={{ maxWidth: 200, maxHeight: 300 }}>
              <Card id='muiPrimary' sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="80"
                  image="placeholder.jpeg"
                  alt="placeholder"
                />
                <CardContent>
                  <Typography gutterBottom variant="p" component="div">
                    {JSON.stringify(elem.item.first_name+" "+elem.item.last_name)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {JSON.stringify(elem.item.name)}
                  </Typography>
                  <Typography variant="body2">
                    {JSON.stringify(elem.item.skills)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button id='muiSecondary' size="small">Learn</Button>
                  <Button id='muiSecondary' size="small">Share</Button>
                </CardActions>
              </Card>
            </Card>
          </div>))
          : null}
      </ul>
      </div>
    </Box>
  )
}