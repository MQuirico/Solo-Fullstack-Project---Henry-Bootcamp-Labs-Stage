import {Link} from 'react-router-dom'


const Navbar = () => {
    return (
      <nav>
        <Link to="/">
            <img src={'../../assets/home.png'}></img>
        </Link>
        <Link to="/cr.Driver">
            <img src={'../../assets/create.png'} ></img>
        </Link>
      </nav>
    );
  };

  export default Navbar;