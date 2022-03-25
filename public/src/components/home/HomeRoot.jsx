import React from 'react';
import NavBar from '../shared/navBar';
import Search from '../search/Search';
import SearchBar from '../search/SearchBar';
import GCal from './gCal';
import About from './homeAbout';
import { Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SearchProvider } from '../../context';

const Item = styled(Container)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  // color: theme.palette.text.secondary,
}));

export default function HomeRoot() {


  return (
    <div>
      <NavBar />
      <Container maxWidth='xl'>
      <Grid container spacing={3}>
        <Grid item xs={4}>
        <SearchProvider>
            <div id='homeSearchBar'><SearchBar /></div>
            <div id='homeSearch'><Search /></div>
        </SearchProvider>
        </Grid>
        <Grid item xs={4}>
        <Item><GCal /></Item>
        </Grid>
        <Grid item xs={4}>
        <Item><About /></Item>
        </Grid>
      </Grid>
      </Container>
    </div>
  )}
