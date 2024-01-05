import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import s from "./style.module.css";
import { BsPerson } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import logo from "../../../../assets/logo.png"
import { useDispatch } from "react-redux";
import { setNotConnect } from "../../../../store/admin-slice";

export function NavALarge() {
  const [isShown, setIsShown] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch()

  function setIsSwhownTrue(e) {
    e.stopPropagation();
    setIsShown(true);
  }

  function setIsSwhownFalse(e) {
    e.stopPropagation();
    setIsShown(false);
  }
  function logoutHandler() {
    dispatch(setNotConnect());
    //window.location.reload(false);
  }

  return (
    <nav className={s.nav}>
      <ul className={s.ul}>
        <div className={s.logoContainer}>
          <li className={s.li}>
            <NavLink 
              to="/"
            >
              <img src={logo} alt="Léa English" className={s.logo} />
            </NavLink>
          </li>
        </div>
        <div className={s.centralItems}>
          <li className={s.li}>
            <NavLink
              to="/admin-login"
              onClick={logoutHandler}
              className={s.link}
              isActive={() => location.pathname === "/admin-login"}
              style={{ color: location.pathname === "/admin-login" ? "#F27066" : "#9BB5D8" }}
            >
              Logout
              <span className={s.icon}>
                <MdLogout/> 
              </span>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
