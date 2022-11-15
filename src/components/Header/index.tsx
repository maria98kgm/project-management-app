import './style.scss';
import appLogo from '../../assets/img/app_logo.png';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [header, setHeader] = useState(false);
  const navigate = useNavigate();

  const changeHeader = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  window.addEventListener('scroll', changeHeader);

  return (
    <header>
      <div className={header ? 'header sticky' : 'header'}>
        <img src={appLogo} />
        <div className="control">
          <div className="language">
            <select>
              <option>En</option>
              <option>Ru</option>
            </select>
          </div>
          <div className="authorization">
            <Button variant="outlined" onClick={() => navigate('/signin')}>
              Sign in
            </Button>
            <Button variant="outlined" onClick={() => navigate('/signup')}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
