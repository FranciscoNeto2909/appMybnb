import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineLeft } from "react-icons/ai";
import "./loginAndSecurity.css"
import { hideModal, showModal } from "../../assets/appSlice";
import { DeleteUser, logout, updateUser } from "../../assets/userSlice"
import { hash } from "bcryptjs";
export default function LoginAndSecurity({ windowWidth }) {

    const [loginVisib, setLoginVisib] = useState(false)
    const [delUserVisib, setDeluserVisib] = useState(false)
    const [newPassVisib, setNewPassVisib] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassowrd] = useState("")
    const [confirmNewPassword, setConfirmNewPassowrd] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [errors, setErrors] = useState({
        passwordError: false,
        newPasswordError: false
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleVerifyPassword() {
            dispatch(updateUser({
                name: " ",
                email: "",
                phone: "",
                birthDate: "",
                sex: "",
                address: "",
                oldPassword,
                newPassword
            })).then(e => {
                console.log(e)
                if (e.payload.response?.data.error == true) {
                    setErrorMsg(e.payload.response.data.msg)
                    setErrors({ ...errors, passwordError: true })
                    setTimeout(() => {
                        setErrors({ ...errors, passwordError: false })
                        setErrorMsg("")
                    }, 2000);
                }
                else {
                    setNewPassVisib(true)
                }
            })
    }

    async function handleUpdatePassoword() {
        if (confirmNewPassword != newPassword) {
            setErrors({ ...errors, newPasswordError: true })
            setTimeout(() => {
                setErrors({ ...errors, newPasswordError: false })
            }, 2000);
        } else {
            const hashedPassword = await hash(newPassword, 8)
            dispatch(updateUser({
                name: " ",
                email: "",
                phone: "",
                birthDate: "",
                sex: "",
                address: "",
                oldPassword,
                newPassword: hashedPassword
            })).then(e => console.log(e))
            setNewPassowrd("")
            setConfirmNewPassowrd("")
            setOldPassword("")
            setNewPassVisib(false)

        }
    }

    function handleDeleteUser() {
        const userId = localStorage.getItem("userId")
        dispatch(DeleteUser(userId))
        dispatch(logout())
        navigate("/")
        localStorage.clear()
    }

    function handleDissableAccount() {
        dispatch(showModal())
        setDeluserVisib(true)
    }

    function handleCancelDissableAccount() {
        dispatch(hideModal())
        setDeluserVisib(false)
    }

    return (
        <div className="logAndSec">
            <>
                {windowWidth > 500 ?
                    <ul className="logAndSec-nav">
                        <li className="logAndSec-nav-item">
                            <Link className="logAndSec-nav-item-link" to="/account">Conta</Link>
                        </li>
                        <li className=""><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" className="pinfo-nav-item-arow"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg>
                        </li>
                        <li className="logAndSec-nav-item">Login e segurança</li>
                    </ul> :
                    <AiOutlineLeft className="logAndSec-nav-btn-back" size={25} onClick={() => navigate(-1)} />
                }
            </>
            <h1 className="logAndSec-title">Login e segurança</h1>
            <section className="logAndSec-section">
                <h2 className="logAndSec-section-title">Login</h2>
                <div className="logAndSec-section-password">
                    <h3 className="">Senha</h3>
                    {loginVisib ?
                        "" : <p className="logAndSec-section-password-notice">Atualize aqui</p>
                    }
                    {loginVisib &&
                        <div className="">
                            <form className="input-group logAndSec-section-form">
                                <label className="logAndSec-section-form-lbl" htmlFor="name">Senha atual</label>
                                <input id="name" type="password" value={oldPassword} className={`inpt ${errors.passwordError && "inpt-error lbl-error"}`} onChange={e => setOldPassword(e.target.value)} autoComplete="none" required />
                                {errors.passwordError && <p className="lbl-error">{errorMsg}</p>}
                                <button className="logAndSec-btn-verify" type="button" onClick={handleVerifyPassword}>Verificar</button>
                            </form>
                            {newPassVisib &&
                                <form>
                                    <div className="input-group">
                                        <label className="logAndSec-section-form-lbl" htmlFor="sobrenome">Nova Senha</label>
                                        <input id="newPassword" type="password" className={`inpt ${errors.newPasswordError && "inpt-error lbl-error"}`} autoComplete="none" required value={newPassword} onChange={e => setNewPassowrd(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label className="logAndSec-section-form-lbl" htmlFor="sobrenome">Confirmar nova senha</label>
                                        <input id="confirmPassword" type="password" className={`inpt ${errors.newPasswordError && "inpt-error lbl-error"}`} autoComplete="none" required value={confirmNewPassword} onChange={e => setConfirmNewPassowrd(e.target.value)} />
                                        {errors.newPasswordError &&
                                            <p className="">As senhas não coincidem!</p>}
                                    </div>
                                    <button type="button" className="logAndSec-btn-update" onClick={handleUpdatePassoword}>Atualizar senha</button>
                                </form>
                            }
                        </div>
                    }
                    <button className="logAndSec-section-btn" onClick={e => { setLoginVisib(!loginVisib); setNewPassVisib(false) }}>{loginVisib ? "Cancelar" : "Atualizar"}</button>
                </div>
            </section>
            <section className="logAndSec-section">
                <h1 className="logAndSec-section-title">Contas sociais</h1>
                <div className="">
                    <div className="logAndSec-section-social">
                        <h4 className="">Facebook</h4>
                        <span className="logAndSec-section-social-status">Não conectado</span>
                        <button className="logAndSec-section-btn">Conectar</button>
                    </div>
                    <div className="logAndSec-section-social">
                        <h4 className="">Google</h4>
                        <span className="logAndSec-section-social-status">Não conectado</span>
                        <button className="logAndSec-section-btn">Conectar</button>
                    </div>
                </div>
            </section>
            <section className="logAndSec-section">
                <h2 className="logAndSec-section-title">Histórico de dispositivos</h2>
                <p>Não temos acesso aos dispositivos acessados pelo usuario</p>
            </section>
            <section className="logAndSec-section logAndSec-account">
                <h1 className="logAndSec-section-title">Conta</h1>
                <div className="logAndSec-section-dissable">
                    <span className="logAndSec-section-dissable-txt">Desativar sua conta</span>
                    <button className="logAndSec-section-dissable-btn" onClick={handleDissableAccount}>Desativar</button>
                </div>
            </section>
            {delUserVisib &&
                <div className="logAndSec-accountDissable" >
                    <div className="logAndSec-accountDissable-container">
                        <span>Desejo excluir todos os meus dados</span>
                        <p className="logAndSec-accountDissable-notice">Ao clicar em excluir, todos os seus dados serão apagados permanentemente do nosso sistema, tem certeza de sua decisão ?</p>
                        <div className="logAndSec-accountDissable-buttons">
                            <button className="logAndSec-accountDissable-buttons-cancel" onClick={handleCancelDissableAccount}>Cancelar</button>
                            <button onClick={handleDeleteUser} className="logAndSec-accountDissable-buttons-delete">Excluir</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}