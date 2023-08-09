import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineUser, AiOutlineSearch } from "react-icons/ai"
import "./desktopNav.css"
import Who from "./who/Who"
import When from "./when/When"
import SearchDestiny from "./where/SearchDestiny"
import HostTypesFilter from "../hostTypesFilter/HostTypesFilter"
import { hideMenu, hideModal, showMenu, showModal } from '../../assets/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from "../../imgs/logo.png"
import Menu from '../menu/Menu';
import { serverUrl } from '../../assets/api';

export default function DesktopNav() {
    const user = useSelector(data => data.user.user)
    const { isMenuOpened } = useSelector(data => data.app)
    const [choisingDest, setChoisingDest] = useState(false)
    const [destOption, setDestOption] = useState('op1')
    const [acmdOption, setAcmdOption] = useState("where")
    const [image, setImage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleShowMenu() {
        if (isMenuOpened) {
            dispatch(hideMenu())
        } else {
            dispatch(showMenu())
        }
    }

    function handleGetUserImage() {
        if (user.image) {
            setImage(`${serverUrl}profile/${user.image}`)
        } else{
            setImage("")
        }
    }

    function handleSetDestinyOption(e) {
        setDestOption(e.target.value)
    }

    function handleOpenSearchDestiny() {
        setChoisingDest(true)
        setAcmdOption("where")
        dispatch(showModal())
    }

    function handleOpenCheckin() {
        setChoisingDest(true)
        setAcmdOption("checkIn")
        dispatch(showModal())
    }

    function handleOpenHosts() {
        setChoisingDest(true)
        setAcmdOption("who")
        dispatch(showModal())
    }

    function handleCloseModal() {
        dispatch(hideModal())
        setChoisingDest(false)
    }

    useEffect(() => {
        handleGetUserImage()
    }, [user])

    return (
        <div className={`desktopNav ${choisingDest && "choisingDest"}`}>
            <div className='desktopNav-logo' onClick={() => navigate("/")}>
                <img src={logo} className='desktopNav-logo-img' alt="" />
                <span className='desktopNav-logo-title'>Mybnb</span>
            </div>
            {window.location.pathname === "/" && <div className="destiny-container">
                {!choisingDest ?
                    <div className='desktopNav-container'>
                        <div className="destinyFilter">
                            <button className="destinyFilter-button" onClick={handleOpenSearchDestiny}>Qualquer lugar</button>
                            <span className="destinyFilter-divisor"></span>
                            <button className="destinyFilter-button" onClick={handleOpenCheckin}>Qualquer semana</button>
                            <span className="destinyFilter-divisor"></span>
                            <button onClick={handleOpenHosts} className="destinyFilter-button destiny-button--search">
                                <span className="destinyFilter-button--text">Hóspedes?</span>
                                <div>
                                    <AiOutlineSearch className="destinyFilter-button-img" size={30} />
                                </div>
                            </button>
                        </div>
                        <HostTypesFilter />
                    </div> :
                    <>
                        <div className="destinyFilter-destinyOptions">
                            <button value="op1" onClick={handleSetDestinyOption} className={`destinyFilter-destinyOptions-btn ${destOption === "op1" ? "border-bottom" : "destinyOptions-btn"}`}>Acomodações</button>

                            <button value="op2" onClick={handleSetDestinyOption} className={`destinyFilter-destinyOptions-btn ${destOption === "op2" ? "border-bottom" : "destinyOptions-btn"}`}>Experiências</button>

                            <button value="op3" onClick={handleSetDestinyOption} className={`destinyFilter-destinyOptions-btn ${destOption === "op3" ? "border-bottom" : "destinyOptions-btn"}`}>Experiências online</button>
                        </div>
                        <div className="destinyFilter destinyFilter--findDestiny">
                            <label htmlFor="findDestiny" onClick={() => { setAcmdOption("where") }} className={`destinyFilter-findDestiny ${acmdOption === "where" && "findDestiny-btn-selected"}`}>Where
                                <input placeholder="Buscar Destino" id="findDestiny" className="findDestiny-input" type="text" />
                                {acmdOption === "where" &&
                                    <SearchDestiny />
                                }
                            </label>
                            <div onClick={() => { setAcmdOption("checkIn") }} className={`destinyFilter-findDestiny-btn destinyFilter-findDestiny-btn--center ${acmdOption === "checkIn" && "findDestiny-btn-selected"}`}>
                                <span className="destinyFilter-findDestiny-title">
                                    Check-in</span>
                                <span className="destinyFilter-findDestiny-txt">Insert the da...</span>
                                {
                                    acmdOption === "checkIn" &&
                                    <div className="setDestiny-checkin">
                                        <When />

                                    </div>
                                }
                            </div>
                            <div onClick={() => { setAcmdOption("checkOut") }} className={`destinyFilter-findDestiny-btn destinyFilter-findDestiny-btn--center ${acmdOption === "checkOut" && "findDestiny-btn-selected"}`}>
                                <span className="destinyFilter-findDestiny-title">
                                    Check-out</span>
                                <span className="destinyFilter-findDestiny-txt">
                                    Insert the da...</span>
                                {
                                    acmdOption === "checkOut" &&
                                    <div className="setDestiny-checkout">
                                        <When />
                                    </div>
                                }
                            </div>
                            <div onClick={() => { setAcmdOption("who") }} className={`destinyFilter-findDestiny-btn destinyFilter-findDestiny-btn--hosts ${acmdOption === "who" && "findDestiny-btn-selected"}`}>
                                <div className="destinyFilter-findDestiny-text">
                                    <span className="destinyFilter-findDestiny-title">Who</span>
                                    <span className="destinyFilter-findDestiny-txt">Hóspedes?</span>
                                </div>
                                <button className="findDestiny-search-btn">
                                    <AiOutlineSearch size={25} />
                                    <span>Buscar</span>
                                </button>
                                {acmdOption === "who" &&
                                    <div className="setDestiny-hosts">
                                        <Who />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="destinyFilter-setDestiny" onClick={handleCloseModal}>
                        </div>
                    </>
                }
            </div>}
            <div className="menu">
                <div className="menu-container" onClick={handleShowMenu}>
                    <button type='button' className="menu-btn">
                        <AiOutlineMenu size={18} className="menu-lines" />
                        {image ?
                            <img src={image} className="menu-userImg" alt="" /> :
                            <AiOutlineUser size={28} className="menu-user-profile" />}
                    </button>
                </div>
                {isMenuOpened &&
                    <Menu />
                }
            </div>
        </div>
    )
}