import argentBankLogo from '../../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import './index.css';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../utils/selectors';

const Nav = () => {
  const auth = useSelector(selectAuth);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {auth.data?.body.token ? (
          <div>
            <Link class="main-nav-item" to="/profile">
              <i class="fa fa-user-circle"></i>
              Tony
            </Link>
            <div class="main-nav-item">
              <i class="fa fa-sign-out"></i>
              Sign Out
            </div>
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
