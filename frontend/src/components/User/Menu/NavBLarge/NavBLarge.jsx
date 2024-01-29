import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import s from "./style.module.css";
import { GoCommentDiscussion } from "react-icons/go";
import { MdHearing } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";


export function NavBLarge() {
  const [isShown, setIsShown] = useState(false);
  const location = useLocation();

  const setIsShownTrue = () => {
    setIsShown(true);
  };

  const setIsShownFalse = () => {
    setIsShown(false);
  };
    //e.stopPropagation();


  return (
    <nav className={s.nav}>
      <ul className={s.ul} >
        <li 
          className={s.li}
          onMouseEnter={setIsShownTrue}
          onMouseLeave={setIsShownFalse}
        >
          <NavLink
            to="/vocabulary"
            className={s.link}
            isActive={() => location.pathname === "/vocabulary"}
            style={{ color: (location.pathname === "/vocabulary" || location.pathname === "/revise") ? "#F27066" : "#28356B" }}
          >
            Vocabulaire
            <span className={s.icon}>
              <BsCardText/>
            </span>
          </NavLink>
        </li>
        <li className={s.li}>
          <NavLink
            to="/podcasts"
            className={s.link}
            isActive={() => location.pathname.startsWith("/podcast")}
            style={{ color: location.pathname.startsWith("/podcast") ? "#F27066" : "#28356B" }}
          >
            Podcast
            <span className={s.icon}>
              <MdHearing/>
            </span>
          </NavLink>
        </li>
        <li className={s.li}>
          <NavLink
            to="/ai"
            className={s.link}
            isActive={() => location.pathname === "/ai"}
            style={{ color: location.pathname === "/ai" ? "#F27066" : "#28356B" }}
          >
            Pratique
            <span className={s.icon}>
              <GoCommentDiscussion/>
            </span>
          </NavLink>
        </li>
        <li className={s.li}>
          <NavLink
            to="/test"
            className={s.link}
            isActive={() => location.pathname === "/test"}
            style={{ color: location.pathname === "/test" ? "#F27066" : "#9BB5D8" }}
          >
            Test
            <span className={s.icon}>
              <MdOutlineSchool/>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
