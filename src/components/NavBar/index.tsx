import React from 'react';
import './style.scss';
import { IconButton, Drawer, Box, Divider, ListItemButton, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { ReactComponent as MenuIcon } from '../../assets/menuIcon.svg';
import { ReactComponent as CloseIcon } from '../../assets/closeIcon.svg';

export const NavBar: React.FC<{ isToken: boolean; showBurger: boolean }> = ({
  isToken,
  showBurger,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenBurgerMenu(open);
  };

  if (!isToken) {
    return (
      <nav className="control">
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
                  <ListItemButton sx={{ p: 0, justifyContent: 'center', mb: '20px' }}>
                    <Button sx={{ color: 'white' }} onClick={() => navigate('/signup')}>
                      {t('BUTTONS.SIGNUP')}
                    </Button>
                  </ListItemButton>
                  <ListItemButton sx={{ p: 0, justifyContent: 'center', mb: '20px' }}>
                    <Button sx={{ color: 'white' }} onClick={() => navigate('/signin')}>
                      {t('BUTTONS.SIGNIN')}
                    </Button>
                  </ListItemButton>
                  <ListItemButton sx={{ p: 0, justifyContent: 'center', mb: '20px' }}>
                    <LanguageSwitch />
                  </ListItemButton>
                </Box>
              </Box>
            </Drawer>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/signin')}>
              {t('BUTTONS.SIGNIN')}
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>
              {t('BUTTONS.SIGNUP')}
            </Button>
            <LanguageSwitch />
          </React.Fragment>
        )}
      </nav>
    );
  }

  return (
    <nav className="control">
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
                height: 380,
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
                <ListItemButton sx={{ p: 0, justifyContent: 'center', mb: '20px' }}>
                  <Button
                    className="main-btn"
                    sx={{ color: 'white' }}
                    onClick={() => navigate('/main')}
                  >
                    {t('BUTTONS.MAIN')}
                  </Button>
                </ListItemButton>
                <ListItemButton sx={{ p: 0, justifyContent: 'center', mb: '20px' }}>
                  <Button
                    className="new-board-btn"
                    sx={{ color: 'white' }}
                    onClick={() => navigate('/modalka open')}
                  >
                    {t('BUTTONS.NEWBOARD')}
                  </Button>
                </ListItemButton>
                <ListItemButton sx={{ p: 0, justifyContent: 'center', mb: '20px' }}>
                  <Button
                    className="edit-profile-btn"
                    sx={{ color: 'white' }}
                    onClick={() => navigate('/editprofile')}
                  >
                    {t('BUTTONS.EDITPROFILE')}
                  </Button>
                </ListItemButton>
                <ListItemButton sx={{ p: 0, justifyContent: 'center', mb: '20px' }}>
                  <Button
                    className="sign-out-btn"
                    sx={{ color: 'white' }}
                    onClick={() => navigate('/')}
                  >
                    {t('BUTTONS.SIGNOUT')}
                  </Button>
                </ListItemButton>
                <ListItemButton sx={{ p: 0, justifyContent: 'center', mb: '20px' }}>
                  <LanguageSwitch />
                </ListItemButton>
              </Box>
            </Box>
          </Drawer>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button
            className="new-board-btn"
            variant="contained"
            onClick={() => navigate('/modalka open')}
          >
            {t('BUTTONS.NEWBOARD')}
          </Button>
          <Button
            className="edit-profile-btn"
            variant="contained"
            onClick={() => navigate('/editprofile')}
          >
            {t('BUTTONS.EDITPROFILE')}
          </Button>
          <Button className="sign-out-btn" variant="contained" onClick={() => navigate('/')}>
            {t('BUTTONS.SIGNOUT')}
          </Button>
          <Button className="main-btn" variant="contained" onClick={() => navigate('/main')}>
            {t('BUTTONS.MAIN')}
          </Button>
          <LanguageSwitch />
        </React.Fragment>
      )}
    </nav>
  );
};
