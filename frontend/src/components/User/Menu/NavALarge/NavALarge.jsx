import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import s from "./style.module.css";
import { BsPerson } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import logo from "../../../../assets/logo.png"


export function NavALarge() {
  const [isShown, setIsShown] = useState(false);
  const location = useLocation();

  function setIsSwhownTrue(e) {
    e.stopPropagation();
    setIsShown(true);
  }

  function setIsSwhownFalse(e) {
    e.stopPropagation();
    setIsShown(false);
  }

  function logoutHandler() {
    localStorage.removeItem('user-info')
    localStorage.removeItem('token')
    window.location.reload(false);
  }

  return (
    <nav className={s.nav}>
      <ul className={s.ul}>
        <div className={s.logoContainer}>
          <li className={s.li} onClick={() => {window.speechSynthesis.cancel();}}>
            <NavLink 
              to="/"
            >
              <img src={logo} alt="Léa English" className={s.logo} />
            </NavLink>
          </li>
        </div>
        <div className={s.centralItems}>
          <li className={s.li} onClick={() => {window.speechSynthesis.cancel();}}>
            <NavLink
              to="/profile"
              className={s.link}
              isActive={() => location.pathname === "/profile"}
              style={{ color: location.pathname === "/profile" ? "#F27066" : "#9BB5D8" }}
            >
              Mon espace
              <span className={s.icon}>
                <BsPerson/>
              </span>
            </NavLink>
          </li>
          <li 
            style={{color: "#9BB5D8"}} 
            // onClick={logoutHandler} 
            onClick={() => {logoutHandler(); window.speechSynthesis.cancel();}}
            className={s.li}
          >
              Logout
              <span className={s.icon}>
                <MdLogout/> 
              </span>
          </li>
        </div>
      </ul>
    </nav>
  );
}
