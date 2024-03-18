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
  const navigate = useNavigate()

  function setIsSwhownTrue(e) {
    e.stopPropagation();
    setIsShown(true);
  }

  function setIsSwhownFalse(e) {
    e.stopPropagation();
    setIsShown(false);
  }
  function logoutHandler() {
    localStorage.removeItem('admin-token')
    navigate('/jgieojoergj0replj')
    window.location.reload(false);
  }

  return (
    <nav className={s.nav}>
      <ul className={s.ul}>
        <div className={s.logoContainer}>
          <li className={s.li}>
            <NavLink 
              to="/jgieojoergj0replj"
            >
              <img src={logo} alt="Léa English" className={s.logo} />
            </NavLink>
          </li>
        </div>
        <div className={s.centralItems}>
        <li 
          className={s.li}
        >
          <NavLink
            to="/jgieojoergj0replj-users"
            className={s.link}
            isActive={() => location.pathname === "/jgieojoergj0replj-users"}
            style={{ color: (location.pathname === "/jgieojoergj0replj-users") ? "#F27066" : "#28356B" }}
          >
            Utilisateurs
            <span className={s.icon}>
              <BsPerson/>
            </span>
          </NavLink>
        </li>
          <li className={s.li}>
            <NavLink
              to="/jgieojoergj0replj"
              onClick={logoutHandler}
              className={s.link}
              isActive={() => location.pathname === "/jgieojoergj0replj"}
              style={{ color: location.pathname === "/jgieojoergj0replj" ? "#F27066" : "#9BB5D8" }}
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
