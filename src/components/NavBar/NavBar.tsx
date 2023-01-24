import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  useMediaQuery,
  Avatar,
  Drawer,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import useStyles from './NavBar.styles';
import { fetchToken, movieApi, createSessionId } from '../../utils';
import { setUser, userSelector } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';

const NavBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const { toggleColorMode, mode }: any = useContext(ColorModeContext);

  const tokenFromLocalStorage = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(userSelector);

  useEffect(() => {
    const loginUser = async () => {
      if (tokenFromLocalStorage) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();

          if (sessionId) {
            const { data: userData } = await movieApi.get(
              `/account?session_id=${sessionId}`
            );
            dispatch(setUser(userData));
          }
        }
      }
    };
    loginUser();
  }, [tokenFromLocalStorage]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() =>
                setMobileOpen((prevMobileOpen: boolean) => !prevMobileOpen)
              }
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={toggleColorMode}
            className={classes.menuButton}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </div>

          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() =>
                setMobileOpen((prevMobileOpen: boolean) => !prevMobileOpen)
              }
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
