import './style.scss';
import rssLogo from '../../assets/img/rss_logo.png';
import gitLogo from '../../assets/img/git_logo.png';

export const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <p className="year">© 2022</p>
        <div className="git_links">
          <a
            className="git_link"
            href="https://github.com/maria98kgm"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gitLogo} alt="Git logo" />
            hat_goblin
          </a>
          <a
            className="git_link"
            href="https://github.com/SaintSanta"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gitLogo} alt="Git logo" />
            SaintSanta
          </a>
          <a
            className="git_link"
            href="https://github.com/TanyaSamal"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gitLogo} alt="Git logo" />
            Tanya Samal
          </a>
        </div>
        <a className="rs-logo" href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <img src={rssLogo} alt="RSSchol logo" />
        </a>
      </div>
    </footer>
  );
};
