import './style.scss';
import appLogo from '../../assets/img/app_logo.png';
import { useState } from 'react';

export const Header = () => {
  const [header, setHeader] = useState(false);

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
            <button>Sign in</button>
            <button>Sign up</button>
          </div>
        </div>
      </div>
    </header>
  );
};
