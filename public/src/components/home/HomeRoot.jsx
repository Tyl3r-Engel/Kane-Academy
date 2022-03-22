import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../search/Search';

export default function HomeRoot() {

  const [skillsData, setSkillsData] = useState({});

  function fetchSkills() {
    axios
      .get('/skills')
      .then(results => setSkillsData(results))
  }

  useEffect(() => {
    fetchSkills();
  }, [])

  return (
    <div>
      <div>Rendered Home</div>
      <Search />
    </div>
  );
}
