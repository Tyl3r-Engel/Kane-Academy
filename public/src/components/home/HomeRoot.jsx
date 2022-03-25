import React from 'react';
import NavBar from '../shared/navBar';
import Search from '../profile/Search';
import GCal from './gCal';


export default function HomeRoot() {


  return (
    <div id='homeContainer'>
      <div id='homeNav'><NavBar /></div>
        <div id='homeBody'>
          <div id='homeSearch'><Search /></div>
          <div id='homeCal'><GCal /></div>
        </div>
    </div>
  )}
