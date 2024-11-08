import {Link} from 'react-router-dom'
import './NavBar.css'

const Navbar = () => {
    return (
      <nav>

        <Link to="/Home">
            <h3 className="home">🏠Home</h3>
        </Link>
        <Link to="/cr.Driver">
            <h3 className="create">🏎️Crear Driver</h3>
        </Link>
        
        <Link to="/">
        <img 
        id='logo' 
        src='../../../Fotos F1 PI/logo-f1.jpg' 
        />
        </Link>
      </nav>
    );
  };

  export default Navbar;