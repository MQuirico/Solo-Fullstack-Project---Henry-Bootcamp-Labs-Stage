import {Link} from 'react-router-dom'
import SearchBar from '../Search Bar/SearchBar';
import './NavBar.css'

const Navbar = () => {
    return (
      <nav>
        <Link to="/Home">
            <h3>🏠Home</h3>
        </Link>
        <Link to="/cr.Driver">
            <h3>🏎️Crear Driver</h3>
        </Link>
        <Link to="/">
            <h3>🚀Landing Page</h3>
        </Link>
        <img id='logo' src='../../../Fotos F1 PI/logo-f1.jpg'></img>
      </nav>
    );
  };

  export default Navbar;