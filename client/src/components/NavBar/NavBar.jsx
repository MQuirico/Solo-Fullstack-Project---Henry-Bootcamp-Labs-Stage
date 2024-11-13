import {Link} from 'react-router-dom'
import './NavBar.css'
import logo from "../../../Fotos F1 PI/logo-f1.jpg"

const Navbar = () => {
    return (
      <nav>

        <Link to="/Home">
            <h3 className="home">🏠Home</h3>
        </Link>
        <Link to="/crDriver">
            <h3 className="create">🏎️Crear Driver</h3>
        </Link>
        
        <Link to="/">
        <img 
        id='logo' 
        src={logo}
        />
        </Link>
      </nav>
    );
  };

  export default Navbar;