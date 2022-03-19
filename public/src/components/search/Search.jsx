import React, {useState} from 'react';
import states from './states';
import Fuse from 'fuse.js';

export default function Search() {
  const [query, setQuery] = useState('')

  const fuse = new Fuse(states, {
    keys: [
      "name",
      "abbreviation"
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
        {query ? fuseSearchResults.map((elem, i) => <li key={i}>{elem.item.name}, {elem.item.abbreviation}</li>) : states.map((elem, i) => <li key={i}>{elem.name}, {elem.abbreviation}</li>)}
      </ul>
    </div>
  )
}
