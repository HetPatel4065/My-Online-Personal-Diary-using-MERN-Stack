import React, { useContext, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import pageContext from '../Context/pages/pageContext';



export default function NavBar() {

  const context = useContext(pageContext);
  const { showAlert } = context;


  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/login');
    showAlert("LogOut Successfully", "success");
  }

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => { setIsNavCollapsed(!isNavCollapsed); }
  const str = { backgroundColor: "rgb(4, 4, 88)" };

  return (

    <nav className="navbar navbar-expand-lg  navbar-dark " style={str}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My Diary</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>

          {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="btn btn-outline-success mx-1" to="/signup" role="button">Sign Up <i className="fa-solid fa-user-plus"></i>
            </Link>
            <Link className="btn btn-outline-success mx-1" to="/login" role="button">Login <i className="fa-solid fa-right-to-bracket"></i></Link>
          </form> : <form className="d-flex"><button className="btn btn-outline-danger" onClick={handleLogout}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button></form>}
        </div>
      </div>
    </nav>

  )
}