import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import requestSkills from './axios/requestSkills';

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
        <input type="text" value={query} onChange={handleOnSearch} />
        <button>Search</button>
      </form>

      <h2>Genius Skills</h2>
      <ul>
        {query ? fuseSearchResults.map((elem, i) => (<ul key={i}><li >{elem.item.name}</li><li>{elem.item.category}</li><li>{elem.item.description}</li></ul>)) : null}
      </ul>
    </div>
  )
}

// skillsData.results.map((elem, i) => (<ul key={i}><li>Name:{elem.name}</li><li>Category:{elem.category}</li><li>Description:{elem.description}</li></ul>))