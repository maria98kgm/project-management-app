import './style.scss';
import appLogo from '../../assets/img/app_logo.png';

export const Header = () => {
  return (
    <header>
      <div className="header">
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
