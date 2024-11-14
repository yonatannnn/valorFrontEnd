import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
import logo from '../assets/logo.jpg';
import SignInModal from './signInModal';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { loggedIn } = useSelector((state) => state.user);

  const handleMode = () => {
    dispatch(openModal());
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = ['Home', 'Match Analysis', 'Fixtures', 'Prediction'];

  const drawer = (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="end"
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt='Valor Insight logo' style={{ height: 40, width: 40, marginRight: 8 }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                VALOR INSIGHT
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 1, width: '100%', maxWidth: 400 }}>
                <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', height: '100%', pl: 2, pointerEvents: 'none' }}>
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{
                    color: 'inherit',
                    width: '100%',
                    '& .MuiInputBase-input': {
                      padding: theme.spacing(1, 1, 1, 0),
                      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                      transition: theme.transitions.create('width'),
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                edge="start"
                color="inherit"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button key={item} color="inherit" sx={{ my: 2, display: 'block' }}>
                  {item}
                </Button>
              ))}
              {loggedIn ? (
                <Avatar alt="User Avatar" src={logo} sx={{ ml: 2 }} />
              ) : (
                <Button variant="contained" color="primary" onClick={handleMode} sx={{ ml: 2 }}>
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <SignInModal />
    </>
  );
};

export default Header;