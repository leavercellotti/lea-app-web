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
          {isShown &&
            <ul className={s.subUl}>
              <li className={s.subLi}>
                <NavLink
                  to="/vocabulary"
                  className={s.subLink}
                  isActive={() => location.pathname === "/vocabulary"}
                  style={{ color: location.pathname === "/vocabulary" ? "#F27066" : "#28356B" }}
                >
                  Apprendre
                </NavLink>
              </li>
              <li className={s.subLi}>
                <NavLink
                  to="/revise"
                  className={s.subLink}
                  isActive={() => location.pathname === "/revise"}
                  style={{ color: location.pathname === "/revise" ? "#F27066" : "#28356B" }}
                >
                  Réviser
                </NavLink>
              </li>
            </ul>
          }
        </li>
        <li className={s.li}>
          <NavLink
            to="/podcast"
            className={s.link}
            isActive={() => location.pathname === "/podcast"}
            style={{ color: location.pathname === "/podcast" ? "#F27066" : "#28356B" }}
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
            style={{ color: location.pathname === "/test" ? "#F27066" : "#28356B" }}
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
