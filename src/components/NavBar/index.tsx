import React, { useState } from 'react';
import './style.scss';
import { IconButton, Drawer, Box, Divider, ListItemButton, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { ReactComponent as MenuIcon } from '../../assets/menuIcon.svg';
import { ReactComponent as CloseIcon } from '../../assets/closeIcon.svg';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/features/userSlice';
import { Paths } from '../../models';
import { showToast } from '../../redux/features/toastSlice';
import { deleteCookieToken } from '../../share/cookieToken';

interface NavBarProps {
  isToken: boolean;
  showBurger: boolean;
  createNewBoard: () => void;
}

const menuButtonStyle = {
  p: 0,
  justifyContent: 'center',
  mb: '20px',
};

export const NavBar: React.FC<NavBarProps> = ({ isToken, showBurger, createNewBoard }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenBurgerMenu(open);
    };

  const handleMenuButton = (path: Paths): void => {
    setOpenBurgerMenu(false);
    navigate(path);
  };

  const signOut = (): void => {
    setOpenBurgerMenu(false);
    dispatch(setUser(null));
    deleteCookieToken();
    navigate(Paths.WELCOME);
    dispatch(showToast({ isOpen: true, severity: 'success', message: t('INFO.LOG_OUT') }));
  };

  const createBoard = (): void => {
    setOpenBurgerMenu(false);
    createNewBoard();
  };

  return (
    <React.Fragment>
      <nav className="control">
        {!isToken ? (
          <React.Fragment>
            {showBurger ? (
              <React.Fragment>
                <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  variant="temporary"
                  open={openBurgerMenu}
                  onClose={toggleDrawer(false)}
                  PaperProps={{
                    sx: {
                      width: 240,
                      height: 260,
                      borderRadius: '0 0 0 4px',
                      background: 'transparent',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 1,
                      background:
                        'linear-gradient(140.77deg, #be92e8 -20.7%, #6c3ed4 46.22%, #261436 100.74%);',
                    }}
                  >
                    <IconButton sx={{ ml: 22, mt: 1 }} onClick={toggleDrawer(false)}>
                      <CloseIcon />
                    </IconButton>
                    <Divider sx={{ m: 2 }} />
                    <Box>
                      <ListItemButton sx={menuButtonStyle}>
                        <Button
                          sx={{ color: 'white' }}
                          onClick={() => handleMenuButton(Paths.SIGNUP)}
                        >
                          {t('BUTTONS.SIGNUP')}
                        </Button>
                      </ListItemButton>
                      <ListItemButton sx={menuButtonStyle}>
                        <Button
                          sx={{ color: 'white' }}
                          onClick={() => handleMenuButton(Paths.SIGNIN)}
                        >
                          {t('BUTTONS.SIGNIN')}
                        </Button>
                      </ListItemButton>
                      <ListItemButton sx={menuButtonStyle}>
                        <LanguageSwitch />
                      </ListItemButton>
                    </Box>
                  </Box>
                </Drawer>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button variant="outlined" color="secondary" onClick={() => navigate(Paths.SIGNIN)}>
                  {t('BUTTONS.SIGNIN')}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(Paths.SIGNUP)}
                >
                  {t('BUTTONS.SIGNUP')}
                </Button>
                <LanguageSwitch />
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {showBurger ? (
              <React.Fragment>
                <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  variant="temporary"
                  open={openBurgerMenu}
                  onClose={toggleDrawer(false)}
                  PaperProps={{
                    sx: {
                      width: 240,
                      height: location.pathname === Paths.WELCOME ? 260 : 380,
                      borderRadius: '0 0 0 4px',
                      background: 'transparent',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 1,
                      background:
                        'linear-gradient(140.77deg, #be92e8 -20.7%, #6c3ed4 46.22%, #261436 100.74%);',
                    }}
                  >
                    <IconButton sx={{ ml: 22, mt: 1 }} onClick={toggleDrawer(false)}>
                      <CloseIcon />
                    </IconButton>
                    <Divider sx={{ m: 2 }} />
                    <Box>
                      {location.pathname === Paths.WELCOME ? (
                        <React.Fragment>
                          <ListItemButton sx={menuButtonStyle}>
                            <Button
                              sx={{ color: 'white' }}
                              onClick={() => handleMenuButton(Paths.MAIN)}
                            >
                              {t('BUTTONS.MAIN')}
                            </Button>
                          </ListItemButton>
                          <ListItemButton sx={menuButtonStyle}>
                            <Button sx={{ color: 'white' }} onClick={signOut}>
                              {t('BUTTONS.SIGNOUT')}
                            </Button>
                          </ListItemButton>
                          <ListItemButton sx={menuButtonStyle}>
                            <LanguageSwitch />
                          </ListItemButton>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <ListItemButton sx={menuButtonStyle}>
                            <Button
                              sx={{ color: 'white' }}
                              onClick={() => handleMenuButton(Paths.MAIN)}
                            >
                              {t('BUTTONS.MAIN')}
                            </Button>
                          </ListItemButton>
                          <ListItemButton sx={menuButtonStyle}>
                            <Button sx={{ color: 'white' }} onClick={createBoard}>
                              {t('BUTTONS.NEWBOARD')}
                            </Button>
                          </ListItemButton>
                          <ListItemButton sx={menuButtonStyle}>
                            <Button
                              sx={{ color: 'white' }}
                              onClick={() => handleMenuButton(Paths.EDITPROFILE)}
                            >
                              {t('BUTTONS.EDITPROFILE')}
                            </Button>
                          </ListItemButton>
                          <ListItemButton sx={menuButtonStyle}>
                            <Button sx={{ color: 'white' }} onClick={signOut}>
                              {t('BUTTONS.SIGNOUT')}
                            </Button>
                          </ListItemButton>
                          <ListItemButton sx={menuButtonStyle}>
                            <LanguageSwitch />
                          </ListItemButton>
                        </React.Fragment>
                      )}
                    </Box>
                  </Box>
                </Drawer>
              </React.Fragment>
            ) : location.pathname === Paths.WELCOME ? (
              <React.Fragment>
                <Button variant="contained" onClick={() => navigate(Paths.MAIN)}>
                  {t('BUTTONS.MAIN')}
                </Button>
                <LanguageSwitch />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button variant="contained" onClick={createBoard}>
                  {t('BUTTONS.NEWBOARD')}
                </Button>
                <Button variant="contained" onClick={() => navigate(Paths.EDITPROFILE)}>
                  {t('BUTTONS.EDITPROFILE')}
                </Button>
                <Button variant="contained" onClick={signOut}>
                  {t('BUTTONS.SIGNOUT')}
                </Button>
                <Button variant="contained" onClick={() => navigate(Paths.MAIN)}>
                  {t('BUTTONS.MAIN')}
                </Button>
                <LanguageSwitch />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </nav>
    </React.Fragment>
  );
};
