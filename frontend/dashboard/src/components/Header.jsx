import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ showBackButton = false }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        {showBackButton && (
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back
          </button>
        )}
        <h1 className="header-title">Puvi Intel</h1>
      </div>
    </header>
  );
};

export default Header;
