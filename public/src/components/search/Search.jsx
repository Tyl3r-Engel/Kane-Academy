import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../../context';
import Fuse from 'fuse.js';
import axios from 'axios';
import requestSearchData from '../profile/axios/requestSearchData';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import placeholderImg from '../../../dist/placeholder.png';

export default function Search() {
  const { query } = useContext(SearchContext)
  const [searchData, setSearchData] = useState([]);
  const [recentData, setRecentData] = useState([]);

  function fetchSearchData() {
    requestSearchData(results => {
      if (!Array.isArray(results)) {
        window.location = '/login';
      }
      setSearchData(results);
      let recent = [];
      for (let i = 0; i < 6; i++) {
        recent.push(results[i])
      }
      setRecentData(recent)
    })
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
    <>
    <div>
      <ul>
        {query ? 
          (
            // fuseSearchResults.map((elem, i) => (
            //   <div style={{display: 'inline-block', padding: '10px'}}>
            //     <div key={Math.random() * 50000}>
            //       <Card sx={{ maxWidth: 200, maxHeight: 300 }} >
            //         <CardMedia
            //           component="img"
            //           height="80"
            //           image={placeholderImg}
            //           alt="placeholder"
            //         />
            //         <CardContent>
            //           <Typography gutterBottom variant="h6" component="div">
            //             {elem.item.first_name + " " + elem.item.last_name.substring(0, 1)}
            //           </Typography>
            //           <Typography variant="body1" color="text.secondary">
            //             {elem.item.name}
            //           </Typography>
            //           <Typography variant="body2" color="text.secondary">
            //             {elem.item.category}
            //           </Typography>
            //         </CardContent>
            //         <CardActions>
            //           <Button onClick={(e) => handleClick(e)} size="small" value={elem.item.mentor_id}>Learn</Button>
            //         </CardActions>
            //       </Card>
            //     </div>
            //   </div>
            //   )
            // )
            null
          ) : (
            // recentData.map((elem, i) => (
            //   <div style={{display: 'inline-block', padding: '10px'}}>
            //     <div key={Math.random() * 50000}>
            //       <Card sx={{ maxWidth: 200, maxHeight: 300 }}>
            //         <CardMedia component="img" height="80" image={placeholderImg} alt="placeholder" />
            //         <CardContent>
            //           <Typography gutterBottom variant="h6" component="div">
            //             {elem.first_name + " " + elem.last_name.substring(0, 1)}
            //           </Typography>
            //           <Typography variant="body1" color="text.secondary">
            //             {elem.name}
            //           </Typography>
            //           <Typography variant="body2" color="text.secondary">
            //             {elem.category}
            //           </Typography>
            //         </CardContent>
            //         <CardActions>
            //           <Button onClick={(e) => handleClick(e)} size="small" value={elem.mentor_id}>Learn</Button >
            //         </CardActions>
            //       </Card>
            //     </div>
            //   </div>
            //  )
            //)
            null
          )
        }
        </ul>
      </div>
      
      <div id='homeSearchResults'>
        <h2>Genius Skills</h2>
        <ul>
          {query &&
            (
              fuseSearchResults.map((elem, i) => (
                <div key={Math.random() * 50000} onClick={handleClick} data-index={elem.item.id} style={{display: 'inline-block', padding: '10px'}}>
                  <Card sx={{ maxWidth: 200, maxHeight: 300 }}>
                    <Card id='muiPrimary' sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" height="80" image={placeholderImg} alt="placeholder" />
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
                      </CardActions>
                    </Card>
                  </Card>
                </div>
                )
              )
            )
          }
        </ul>
      </div>
    </>
  )
}