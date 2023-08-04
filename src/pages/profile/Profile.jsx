import React, { useEffect, useState } from "react"
import { AiOutlineRight, AiOutlineSolution, AiOutlineSetting, AiOutlineHome, AiOutlineControl, AiOutlineBuild, AiOutlineGift, AiOutlineQuestion, AiOutlineGlobal, AiOutlineCamera } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import "./profile.css"
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout, setUserImage } from "../../assets/userSlice"
import { serverUrl } from "../../assets/api"

export default function Profile({ windowWidth }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userAcomodations = [1, 2]
    const [image, setImage] = useState("")
    const user = useSelector(data => data.user)
    const userImg = "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"

    function handleLogout() {
        dispatch(logout())
        localStorage.clear()
        navigate("/")
    }

    function handleGetUserImage() {
        setImage(`${serverUrl}profile/${user.user.image}`)
    }

    async function handleChangeUserImage(e) {
        const userId = localStorage.getItem('userId')
        const img = await e.target.files[0]
        dispatch(setUserImage(img)).then(e => {
            dispatch(getUser(userId))
            setImage(`${serverUrl}profile/${user.user.image}`)
        })
    }


    useEffect(() => {
        if (windowWidth > 500) {
            navigate("/account")
        }
    }, [windowWidth])

    useEffect(() => {
        if (user.user.image) {
            handleGetUserImage()
        }
    }, [user])

    return (
        <div className="profile">
            <section className="profile-divisor">
                <h1 className="profile-user-title">Profile</h1>
                <div className="profile-profile">
                    <div>
                        <label htmlFor="img" className="profile-profile-container">
                            <img src={image ? image : userImg} className="profile-profile-img" alt="" />
                            <AiOutlineCamera size={18} className="profile-profile-cam" />
                            <input type="file" id="img" className="profile-inpt" accept="image/*" alt="user profile" onChange={e => handleChangeUserImage(e)} />
                        </label>
                    </div>
                    <div className="profile-profile-texts">
                        <span className="profile-profile-texts-title">{user.name}</span>
                        <span className="profile-profile-texts-desc">Mostrar perfil</span>
                    </div>
                    <AiOutlineRight size={18} className="profile-arowLeft" />
                </div>
                <Link to="/account/personal-infos" className="profile-option" >
                    <AiOutlineSolution size={24} />
                    <span className="profile-option-text">Informações pessoais</span>
                    <AiOutlineRight size={18} className="profile-arowLeft" />
                </Link>
                <Link to="/account" className="profile-option">
                    <AiOutlineSetting size={24} />
                    <span className="profile-option-text">Conta</span>
                    <AiOutlineRight size={18} className="profile-arowLeft" />
                </Link>
            </section>
            <section className="profile-divisor">
                <h3 className="profile-title">Hospedagem</h3>
                <Link className="profile-option">
                    <AiOutlineHome size={24} />
                    <span className="profile-option-text">Hospede uma acomodação</span>
                    <AiOutlineRight size={18} className="profile-arowLeft" />
                </Link>
                {userAcomodations.length > 0 &&
                    <Link className="profile-option">
                        <AiOutlineControl size={24} />
                        <span className="profile-option-text">Minhas acomodações</span>
                        <AiOutlineRight size={18} className="profile-arowLeft" />
                    </Link>}
                <Link className="profile-option">
                    <AiOutlineBuild size={24} />
                    <span className="profile-option-text">Hospede uma experiência</span>
                    <AiOutlineRight size={18} className="profile-arowLeft" />
                </Link>
            </section>
            <section className="profile-divisor">
                <h3 className="profile-title">Indicações e créditos</h3>
                <Link className="profile-option">
                    <AiOutlineGift size={24} />
                    <span className="profile-option-text">Indicar um anfitrião</span>
                    <AiOutlineRight size={18} className="profile-arowLeft" />
                </Link>
            </section>
            <section className="profile-divisor">
                <h3 className="profile-title">Atendimento</h3>
                <Link className="profile-option">
                    <AiOutlineQuestion size={22} />
                    <span className="profile-option-text">Como funciona o mybnb</span>
                    <AiOutlineRight size={18} className="profile-arowLeft" />
                </Link>
            </section>
            <section className="profile-divisor profile-divisor--noborder">
                <div className="profile-buttons">
                    <button className="profile-buttons-button-lang">
                        <AiOutlineGlobal size={22} />
                        <span className="profile-buttons-button-txt">Português (BR)</span></button>
                    <button className="profile-buttons-button">R$ BRL</button>
                </div>
                <button onClick={handleLogout} className="profile-buttons-logout">Sair</button>
            </section>
            <footer>
                <p className="profile-notice">Esta aplicação foi desenvolvida no para praticar programação. Não tem nenhum fim comercial ou financeiro.</p>
            </footer>
        </div>
    )
}