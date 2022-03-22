import React from 'react';
import axios from 'axios';
import Search from '../search/Search';

export default function HomeRoot() {
  return (
    <div>
      <div>Rendered Home</div>
      <Search />
    </div>
  );
}
