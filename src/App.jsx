import React, { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Host from "./pages/Host";
import MobileNav from "./components/mobileNav/MobileNav";
import HostFilter from "./components/hostFilter/HostFilter";
import Register from "./components/register/Register";
import Account from "./pages/account/Account";
import DesktopNav from "./components/desktopNav/DesktopNav";
import { hideMenu } from "./assets/appSlice";
import PersonalInfos from "./components/personalInfos/PersonalInfos";
import Profile from "./pages/profile/Profile";
import LoginAndSecurity from "./components/loginAndSecurity/LoginAndSecurity";
import { getAcomodations } from "./assets/housesSlice"
import { getUser } from "./assets/userSlice"
import Favorites from "./pages/favorites/Favorites";


export default function App() {
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('userId')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isModalOpened, isFilterOpened, isLoginOpened } = useSelector(data => data.app)
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function handleToggleMenu(e) {
    const className = String(e.target.className)
    if (!className.includes("menu")) {
      dispatch(hideMenu())
    }
  }

  useEffect(() => {
    navigate("/")
    if (token !== null && id !== null) {
      dispatch(getUser(id))
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(getAcomodations())
  }, [])

  return (
    <div className={`App ${isModalOpened && "hideScroll"}`} onClick={handleToggleMenu}>

      {windowWidth <= 750 &&
        <MobileNav />
      }
      {windowWidth >= 750 &&
        <DesktopNav />
      }
      {isFilterOpened && <HostFilter />}
      {isLoginOpened && <Register />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account windowWidth={windowWidth} />} />
        <Route path="/account/personal-infos" element={<PersonalInfos />} />
        <Route path="/account/login-and-security" element={<LoginAndSecurity windowWidth={windowWidth} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile windowWidth={windowWidth} />} />
        <Route path="/host" element={<Host />} />
        <Route path="/login" element={<Register />} />
      </Routes>
    </div>
  );
}

