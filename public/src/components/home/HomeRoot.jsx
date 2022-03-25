import React from 'react';
import NavBar from '../shared/navBar';
import Search from '../profile/Search';
import GCal from './gCal';
import requestCurrentSession from '../profile/axios/requestCurrentSession';

export const HomeContext = React.createContext();

export default function HomeRoot() {
  const [loggedInUserH, setLoggedInUserH] = React.useState(null);

  if (loggedInUserH === null) {
    requestCurrentSession((result) => {
      result[0].sess.replace('/', '')
      result[0].sess.replace("\"", '')
      setLoggedInUserH(JSON.parse(result[0].sess).passport.user)
    })
  }

  const HomeProvider = React.useMemo(() => (
    {
      loggedInUserH
    }
  ), [loggedInUserH]);

  return (
    <div id='homeContainer'>
      <HomeContext.Provider value={HomeProvider}>
        <NavBar />
        <Search />
        <GCal />
      </HomeContext.Provider>
    </div>
  )}
