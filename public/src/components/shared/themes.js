import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F80AD',
    },
    secondary: {
      main: '#C0A0CA',
    },
  },
});

export default theme;