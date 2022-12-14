import logo from "../assets/logo.png";
import classes from "../App.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/authContext";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const styleActiveLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#A69CAC" : "",
    };
  };

  return (
    <header className="header flex-row">
      <div className="flex-row">
        <div className="flex-row">
          <NavLink to="/">
            <img src={logo} alt="dm-logo" className="logo" />
          </NavLink>
          <h2 className="main-title">BRW TRAINING</h2>
        </div>
        <nav className="main-nav">
          {authCtx.token ? (
            <ul className="main-nav">
              <NavLink
                className="nav-btn"
                style={styleActiveLink}
                to="/exercises"
              >
                EXERCISES
              </NavLink>
              <NavLink className="nav-btn" style={styleActiveLink} to="/form">
                CREATE WORKOUT
              </NavLink>
              {/* <NavLink
                className="nav-btn"
                style={styleActiveLink}
                to="/profile"
              >
                PROFILE
              </NavLink> */}
              <NavLink className="nav-btn" style={styleActiveLink} to="/auth" onClick={()=>authCtx.logout()}>
                LOGOUT
              </NavLink>
            </ul>
          ) : (
            <ul className="main-nav">
              <NavLink
                className="nav-btn"
                style={styleActiveLink}
                to="/exercises"
              >
                EXERCISES
              </NavLink>
              <NavLink className="nav-btn" style={styleActiveLink} to="/auth">LOGIN</NavLink>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
