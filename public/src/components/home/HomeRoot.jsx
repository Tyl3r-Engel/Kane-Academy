import React from 'react';
import NavBar from '../shared/navBar';
import Search from '../search/Search';
import SearchBar from '../search/SearchBar';
import GCal from './gCal';
import { SearchProvider } from '../../context';

export default function HomeRoot() {


  return (
    <div id='homeContainer'>
      <div id='homeNav'><NavBar /></div>
        <div id='homeBody'>
          <SearchProvider>
            <div id='homeSearchBar'><SearchBar /></div>
            <div id='homeSearch'><Search /></div>
          </SearchProvider>
          <div id='homeCal'><GCal /></div>
        </div>
    </div>
  )}
