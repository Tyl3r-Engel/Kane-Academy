import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import requestSearchData from './axios/requestSearchData';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import placeholderImg from '../../../dist/placeholder.png';

export default function Search() {
  const [query, setQuery] = useState('')
  const [searchData, setSearchData] = useState([]);
  const [recentData, setRecentData] = useState([]);

  function fetchSearchData() {
    requestSearchData(results => {
      setSearchData(results);
      let recent = [];
      for (let i = 0; i < 6; i++) {
        recent.push(results[i])
      }
      setRecentData(recent)
    });
  }

  useEffect(() => {
    fetchSearchData();
  }, [])

  if (searchData.length === 0) {
    return null;
  }
  if (recentData.length === 0) {
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
    let mentorId = Number(event.target.value);
    axios.get(`/profile/${mentorId}`)
      .then((results) => {
        window.location = `/profile/${mentorId}`;
      })
      .catch((err) => {
        updateError('Login Failed: Invalid Password or Username');
      });
  }

  return (
    <div>
      <form style={{padding: '10px'}}>
        <TextField id='outlined-basic' label='Search Mentor Skill' autoComplete='false' value={query} onChange={handleOnSearch} />
        <Button variant='contained' style={{margin: '10px'}}>Search</Button>
      </form>

      <ul>
        {query ? fuseSearchResults.map((elem, i) => (
          <div style={{display: 'inline-block', padding: '10px'}}>
            <div key={i}>
              <Card sx={{ maxWidth: 180, maxHeight: 240 }} >
                <CardMedia
                  component="img"
                  height="80"
                  image={placeholderImg}
                  alt="placeholder"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {elem.item.first_name + " " + elem.item.last_name.substring(0, 1)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {elem.item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {elem.item.category}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {elem.item.description}
                  </Typography> */}
                </CardContent>
                <CardActions>
                  <Button onClick={(e) => handleClick(e)} size="small" value={elem.item.mentor_id}>Learn</Button>
                  <Button size="small">Share</Button>
                </CardActions>
              </Card>
            </div>
          </div>)) 
          : recentData.map((elem, i) => (
            <div style={{display: 'inline-block', padding: '10px'}}>
              <div key={i}>
                <Card sx={{ maxWidth: 180, maxHeight: 240 }}>
                  <CardMedia
                    component="img"
                    height="80"
                    image={placeholderImg}
                    alt="placeholder"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {elem.first_name + " " + elem.last_name.substring(0, 1)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {elem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {elem.category}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                      {elem.description}
                    </Typography> */}
                  </CardContent>
                  <CardActions>
                    <Button onClick={(e) => handleClick(e)} size="small" value={elem.mentor_id}>Learn</Button >
                    <Button size="small">Share</Button>
                  </CardActions>
                </Card>
              </div>
            </div>))}
      </ul>
    </div>
  )
}