import { useEffect, useRef, useState } from "react"
import { AiOutlineCloseCircle, AiOutlineMenu, AiOutlineHome } from "react-icons/ai"
import { NavLink, useLocation, useNavigate} from "react-router-dom"
import s from "./style.module.css"
/*import { useSelector } from "react-redux";*/
import logo from "../../../../assets/logo.png"
import { GoCommentDiscussion } from "react-icons/go";
import { MdHearing } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setNotConnect } from "../../../../store/admin-slice";

export function NavASmall() {
    const [isVocOptionsShown, setIsVocOptionsShown] = useState(false)
    const [isMenuShown, setIsMenuShown] = useState(false)
    const menuRef = useRef(null);
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    function logoutHandler() {
        localStorage.removeItem('admin-token')
        navigate('/jgieojoergj0replj')
        window.location.reload(false);
    }

    return(
        <nav className={s.nav}>
            <NavLink to="/jgieojoergj0replj"><img src={logo} alt="Léa English" className={s.logo} /></NavLink>

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
                                    to="/jgieojoergj0replj-vocabulary" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/jgieojoergj0replj-vocabulary"}
                                    style={{ color: location.pathname === "/jgieojoergj0replj-vocabulary" ? "#F27066" : "#28356B" }}
                                >
                                    <BsCardText 
                                        className={s.logo}
                                    /> 
                                    Vocabulaire
                                </NavLink>
                        
                            </li>
                            <li className={s.li}>
                                <NavLink 
                                    to="/jgieojoergj0replj-podcasts" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/jgieojoergj0replj-podcasts"}
                                    style={{ color: location.pathname === "/jgieojoergj0replj-podcasts" ? "#F27066" : "#28356B" }}
                                >
                                    <MdHearing 
                                        className={s.logo}
                                    /> 
                                    Podcast
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink 
                                    to="/jgieojoergj0replj-ai" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/jgieojoergj0replj-ai"}
                                    style={{ color: location.pathname === "/jgieojoergj0replj-ai" ? "#F27066" : "#28356B" }}
                                >
                                    <GoCommentDiscussion 
                                        className={s.logo}
                                    /> 
                                    Pratique
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink 
                                    to="/jgieojoergj0replj-test" 
                                    className={s.link}
                                    isActive={() => location.pathname === "/jgieojoergj0replj-test"}
                                    style={{ color: location.pathname === "/jgieojoergj0replj-test" ? "#F27066" : "#9BB5D8" }}
                                >
                                    <MdOutlineSchool 
                                        className={s.logo}
                                    /> 
                                    Test
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