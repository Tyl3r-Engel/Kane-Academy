import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../dist/kaLogoBlack.png';
import proPic from '../../../dist/blankProf.png';
import requestFirstName from '../profile/axios/requestFirstName';
// import { ProfileContext } from '../profile/ProfileRoot';
// import { HomeContext } from '../home/HomeRoot';
import requestCurrentSession from '../profile/axios/requestCurrentSession';
import requestProfile from '../profile/axios/requestProfile.js';

export const NavContext = React.createContext();

const pages = ['Home', 'Messages'];
const settings = ['Profile', 'Logout'];

const logout = (e) => {
  e.preventDefault();
  axios.put('/logout')
    .then((results) => {
      window.location = '/login';
    })
    .catch((err) => {
      console.log(err);
      console.log('Cannot Log Out');
    })
}

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [session, setSession] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);

  if (session === null) {
    requestCurrentSession((result) => {
      result[0].sess.replace('/', '')
      result[0].sess.replace("\"", '')
      setSession(JSON.parse(result[0].sess).passport.user)
    })
  } else {
    if (currentUser === null) {
      requestProfile(session.id, (result) => {
        setCurrentUser(result)
      })
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const changePage = (e) => {
    let path = '';
    if (e.target.id === 'Home') {
      path = '/';
    } else if (e.target.id === 'Messages') {
      path = '/messages';
    } else if (e.target.innerText === 'Profile') {
      path = '/profile';
    } else if (e.target.innerText === 'Logout') {
      logout(e);
    }
    handleCloseNavMenu();
    window.location = path;
  }

  return (
    <AppBar position="sticky" id='muiGradient'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} style={{'marginTop': '-40px', 'marginBottom': '-40px', 'width': '150px', 'height': 'auto'}}></img>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                id={page}
                onClick={(e) => changePage(e)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {currentUser
            &&
            <div>
            <Typography variant='h7'>{currentUser[0].first_name}</Typography>{' '}

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="KA Profile" src={currentUser[0].photo} sx={{width: '60px', height: '60px'}} />
              </IconButton>
            </Tooltip>
            </div>
            }
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} id={setting}>
                  <Typography textAlign="center" onClick={(e) => changePage(e)}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
