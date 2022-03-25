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
      <Container maxWidth='xl' sx={{'marginTop': '20px'}}>
      <Grid container spacing={2}>
        <SearchProvider>
        <Grid item xs={4}>
          <Item><SearchBar /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><GCal /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><About /></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><Search /></Item>
        </Grid>
        </SearchProvider>
      </Grid>
      </Container>
    </div>
  )}
