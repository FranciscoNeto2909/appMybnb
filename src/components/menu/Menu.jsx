import { useDispatch, useSelector } from "react-redux"
import { hideModal, showLogin, showModal } from "../../assets/appSlice"
import { logout } from "../../assets/userSlice"
import { useNavigate } from "react-router-dom"

export default function Menu() {
    const { isLogged } = useSelector(data => data.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogin() {
        dispatch(showModal())
        dispatch(showLogin())
    }

    function handleLogout() {
        dispatch(logout())
        dispatch(hideModal())
        localStorage.clear()
    }

    return (
        <>
            {isLogged ?
                <nav className="menu-items-container">
                    <ul className="menu-items border-line font-dark">
                        <li className="menu-item">Mensagens</li>
                        <li className="menu-item">Viagens</li>
                        <li className="menu-item" onClick={() => navigate("/favorites")}>Favoritos</li>
                    </ul>
                    <ul className="menu-items border-line">
                        <li className="menu-item">Editar anuncio</li>
                        <li className="menu-item">Ofereça uma experiência</li>
                        <li className="menu-item">Indique um anfitrião</li>
                        <li className="menu-item" onClick={() => navigate("/account")}>Conta</li>
                    </ul>
                    <ul className="menu-items">
                        <li className="menu-item">Ajuda</li>
                        <li className="menu-item" onClick={handleLogout}>Sair da conta</li>
                    </ul>
                </nav> :
                <nav className="menu-items-container">
                    <ul className="menu-items border-line">
                        <li className="menu-item font-dark" onClick={handleLogin}>Entrar</li>
                        <li className="menu-item">Cadastre-se</li>
                    </ul>
                    <ul className="menu-items">
                        <li className="menu-item">Anuncie seu espaço</li>
                        <li className="menu-item">Ofereça uma experiência </li>
                        <li className="menu-item">Ajuda</li>
                    </ul>
                </nav>
            }
        </>
    )
}