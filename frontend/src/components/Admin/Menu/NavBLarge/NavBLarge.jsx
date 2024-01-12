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
            to="/jgieojoergj0replj-vocabulary"
            className={s.link}
            isActive={() => location.pathname === "/jgieojoergj0replj-vocabulary"}
            style={{ color: (location.pathname === "/jgieojoergj0replj-vocabulary" || location.pathname === "/revise") ? "#F27066" : "#28356B" }}
          >
            Vocabulaire
            <span className={s.icon}>
              <BsCardText/>
            </span>
          </NavLink>
        </li>
        <li className={s.li}>
          <NavLink
            to="/jgieojoergj0replj-podcasts"
            className={s.link}
            isActive={() => location.pathname === "/jgieojoergj0replj-podcasts"}
            style={{ color: location.pathname === "/jgieojoergj0replj-podcasts" ? "#F27066" : "#28356B" }}
          >
            Podcast
            <span className={s.icon}>
              <MdHearing/>
            </span>
          </NavLink>
        </li>
        <li className={s.li}>
          <NavLink
            to="/jgieojoergj0replj-ai"
            className={s.link}
            isActive={() => location.pathname === "/jgieojoergj0replj-ai"}
            style={{ color: location.pathname === "/jgieojoergj0replj-ai" ? "#F27066" : "#28356B" }}
          >
            Pratique
            <span className={s.icon}>
              <GoCommentDiscussion/>
            </span>
          </NavLink>
        </li>
        <li className={s.li}>
          <NavLink
            to="/jgieojoergj0replj-test"
            className={s.link}
            isActive={() => location.pathname === "/jgieojoergj0replj-test"}
            style={{ color: location.pathname === "/jgieojoergj0replj-test" ? "#F27066" : "#9BB5D8" }}
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
