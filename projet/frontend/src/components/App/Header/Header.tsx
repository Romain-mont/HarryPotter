import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

import './Header.scss';

const Header = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <header>
      <Link to="/">
        <img src="/poudlard.png" alt="Logo de Poudlard" />
      </Link>

      <h1>Poudlard's portal</h1>

      {isAuthenticated ? (
        <button onClick={onLogout}>
          Se déconnecter
        </button>
      ) : (
        <Link to="/login">
          <img src="/locked.png" alt="" />
        </Link>
      )}
    </header>
  );
}

export default Header;
