import React, { useState } from "react"
import { AiOutlineSearch, AiOutlineHeart, AiOutlineMessage, AiOutlineUser } from "react-icons/ai"
import { BsSliders, BsAirplane } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, Link } from "react-router-dom"
import { hideModal, showFilter, showLogin, showModal, showNav } from "../../assets/appSlice"
import MobSearchDestiny from "./destinyFilter/MobSearchDestiny"
import HostTypesFilter from "../hostTypesFilter/HostTypesFilter"
import "./mobileNav.css"

export default function MobNav() {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const isLogged = useSelector(data => data.user.isLogged)
    const [choisingDest, setChoisingDest] = useState(false)
    const isNavVisible = useSelector(data => data.app.isNavVisible)

    function handleOpenDestiny() {
        setChoisingDest(!choisingDest)
        dispatch(showModal())
        if (choisingDest === true) {
            dispatch(showNav())
            dispatch(hideModal())
        }
    }

    function handleOpenFilter() {
        dispatch(showFilter())
    }

    function handleLogin() {
        dispatch(showModal())
        dispatch(showLogin())
    }

    return (
        <>
            {window.location.pathname === "/" &&
                <div className="mobDestinyButton">
                    <div className="mobDestinyButton-items">
                        <button className="mobDestinyButton-button" onClick={handleOpenDestiny}>
                            <div className="mobDestinyButton-item-search">
                                <AiOutlineSearch size={20} />
                            </div>
                            <div className="mobDestinyButton-item-texts">
                                <span className="mobDestinyButton-item-text mobDestinyButton-item-text--first">Qualquer lugar</span>
                                <span className="mobDestinyButton-item-text">Qualquer semana</span>
                                <div className="mobDestinyButton-item-text-divisor">.</div>
                                <span className="mobDestinyButton-item-text">Hóspedes?</span>
                            </div>
                        </button>
                        <button className="mobButton-button" onClick={handleOpenFilter}>
                            <BsSliders size={16} />
                        </button>
                    </div>
                    {choisingDest && <MobSearchDestiny handleOpenDestiny={handleOpenDestiny} />}
                    <HostTypesFilter />
                </div>}
            {isNavVisible && <nav className="mobNav">
                <ul className="mobNav-items-container">
                    <li>
                        <Link to="/" className="mobNav-item">
                            <AiOutlineSearch strokeWidth={40} size={25} className={`${pathname === "/" && "mobNav-item-selected"}`} />
                            <span className={`${pathname === "/" && "mobNav-item-selected--text"}`} >Explorar</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/favorites" className="mobNav-item">
                            <AiOutlineHeart size={25} className={`${pathname === "/favorites" && "mobNav-item-selected"}`} />
                            <span className={`${pathname === "/favorites" && "mobNav-item-selected--text"}`} >Favoritos</span>
                        </Link>
                    </li>
                    {isLogged ?
                        <>
                            <li>
                                <Link to="/travels" className="mobNav-item">
                                    <BsAirplane size={25} className={`${pathname === "/travels" && "mobNav-item-selected"}`} />
                                    <span className={`${pathname === "/travels" && "mobNav-item-selected--text"}`} >Viagens</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/messages" className="mobNav-item">
                                    <AiOutlineMessage size={25} className={`${pathname === "/messages" && "mobNav-item-selected"}`} />
                                    <span className={`${pathname === "/messages" && "mobNav-item-selected--text"}`} >Mensagens</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="mobNav-item">
                                    <AiOutlineUser size={25} className={`${pathname === "/profile" | pathname === "/account" && "mobNav-item-selected"}`} />
                                    <span className={`${pathname === "/profile" | pathname === "/account" && "mobNav-item-selected--text"}`} >Perfil</span>
                                </Link>
                            </li>
                        </> :
                        <li onClick={handleLogin}>
                            <Link to={"/login"} className="mobNav-item">
                                <AiOutlineUser size={25} className="mobNav-item" />
                                <span className="">Entrar</span>
                            </Link>
                        </li>
                    }
                </ul>
            </nav>}
        </>
    )
}