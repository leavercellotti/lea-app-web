import { useEffect, useRef, useState } from "react"
import { AiOutlineCloseCircle, AiOutlineMenu, AiOutlineHome } from "react-icons/ai"
import { NavLink, useLocation} from "react-router-dom"
import s from "./style.module.css"
/*import { useSelector } from "react-redux";*/
import logo from "../../../../assets/logo.png"
import { GoCommentDiscussion } from "react-icons/go";
import { MdHearing } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

export function NavASmall() {
    const [isVocOptionsShown, setIsVocOptionsShown] = useState(false)
    const [isMenuShown, setIsMenuShown] = useState(false)
    const menuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        function handleClickOutside(event) {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuShown(false);
          }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return(
        <nav className={s.nav}>
            <NavLink to="/"><img src={logo} alt="Léa English" className={s.logo} /></NavLink>

            <AiOutlineMenu  
                className={s.menuIcon} 
                size={40}
                onClick={(event)=> {event.stopPropagation(); setIsMenuShown(true)}}
            />
            
            {isMenuShown &&
                    <div 
                        ref={menuRef}
                        onClick={()=> setIsMenuShown(false)}
                        className={s.menu}
                    >
                        <div className={s.close}>
                            <AiOutlineCloseCircle 
                                className={s.closeIcon} 
                                size={25}
                                onClick={()=> {setIsMenuShown(false); }}
                            />
                        </div>
                        <ul className={s.ul}>
                            <li className={s.li}>
                                <NavLink 
                                    to="/vocabulary" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/vocabulary"}
                                    style={{ color: location.pathname === "/vocabulary" ? "#F27066" : "#28356B" }}
                                >
                                    <BsCardText 
                                        className={s.logo}
                                    /> 
                                    Vocabulaire
                                </NavLink>
                            
                                <ul>
                                <li className={s.li}>
                                    <NavLink 
                                        to="/vocabulary" 
                                        className={s.link}
                                        isActive={() => location.pathname === "/vocabulary"}
                                        style={{ color: location.pathname === "/vocabulary" ? "#F27066" : "#28356B" }}
                                    >
                                        Apprendre
                                    </NavLink>
                                </li>
                                <li className={s.li}>
                                    <NavLink 
                                        to="/revise" 
                                        className={s.link}
                                        isActive={() => location.pathname === "/revise"}
                                        style={{ color: location.pathname === "/revise" ? "#F27066" : "#28356B" }}
                                    >
                                        Reviser
                                    </NavLink>
                                </li>
                                </ul>
                            </li>
                            <li className={s.li}>
                                <NavLink 
                                    to="/podcastOptions" 
                                    className={s.link}
                                    isActive={() => location.pathname.startsWith("/podcast")}
                                    style={{ color: location.pathname.startsWith("/podcast") ? "#F27066" : "#28356B" }}
                                >
                                    <MdHearing 
                                        className={s.logo}
                                    /> 
                                    Podcast
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink 
                                    to="/ai" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/ai"}
                                    style={{ color: location.pathname === "/ai" ? "#F27066" : "#28356B" }}
                                >
                                    <GoCommentDiscussion 
                                        className={s.logo}
                                    /> 
                                    Pratique
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink 
                                    to="/test" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/test"}
                                    style={{ color: location.pathname === "/test" ? "#F27066" : "#9BB5D8" }}
                                >
                                    <MdOutlineSchool 
                                        className={s.logo}
                                    /> 
                                    Test
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink 
                                    to="/profile" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/profile"}
                                    style={{ color: location.pathname === "/profile" ? "#F27066" : "#9BB5D8" }}
                                >
                                    <BsPerson
                                        className={s.logo}
                                    /> 
                                    Mon espace
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink 
                                    to="/login" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/login"}
                                    style={{ color: location.pathname === "/login" ? "#F27066" : "#9BB5D8" }}
                                >
                                    <MdLogout 
                                        className={s.logo}
                                    /> 
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div> 
            }
        </nav>
    )
}