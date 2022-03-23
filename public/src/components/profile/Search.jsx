import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import requestSkills from './axios/requestSkills';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Search() {
  const [query, setQuery] = useState('')
  const [skillsData, setSkillsData] = useState([]);

  function fetchSkills() {
    requestSkills(results => setSkillsData({results}));
  }

  useEffect(() => {
    fetchSkills();
  }, [])

  if (skillsData.length === 0) {
    return null;
  }

  const fuse = new Fuse(skillsData.results, {
    keys: [
      "name",
      "category",
      "description"
    ],
    includeScore: true,
    distance: 5,
    threshold: 0.3
  })

  const fuseSearchResults = fuse.search(query);

  function handleOnSearch(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <h1>Search</h1>
      <form>
        <label>Looking for a genius?</label>
        <br />
        <br />
        <TextField id='outlined-basic' label='Search Mentor Skill' autoComplete='false' value={query} onChange={handleOnSearch} />
        <Button variant='contained'>Search</Button>
      </form>

      <h2>Genius Skills</h2>
      <ul>
        {query ? fuseSearchResults.map((elem, i) => (<ul key={i}><li >{elem.item.name}</li><li>{elem.item.category}</li><li>{elem.item.description}</li></ul>)) : null}
      </ul>
    </div>
  )
}

// skillsData.results.map((elem, i) => (<ul key={i}><li>Name:{elem.name}</li><li>Category:{elem.category}</li><li>Description:{elem.description}</li></ul>))