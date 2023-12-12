import { useState } from "react";
import { CiPizza } from "react-icons/ci";
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
              to="/profile"
              className={s.link}
              isActive={() => location.pathname === "/profile"}
              style={{ color: location.pathname === "/profile" ? "#F27066" : "#28356B" }}
            >
              Mon espace
              <span className={s.icon}>
                <BsPerson/>
              </span>
            </NavLink>
          </li>
          <li className={s.li}>
            <NavLink
              to="/login"
              className={s.link}
              isActive={() => location.pathname === "/login"}
              style={{ color: location.pathname === "/login" ? "#F27066" : "#28356B" }}
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
