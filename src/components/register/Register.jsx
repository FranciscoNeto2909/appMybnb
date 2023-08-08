import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AiOutlineLeft } from "react-icons/ai"
import { hideLogin, hideModal, hideNav, showNav } from "../../assets/appSlice"
import EmailAuth from "./emailAuth/EmailAuth"
import "./register.css"
import RegisterForm from "./registerForm/RegisterForm"
import Login from "../login/Login"
import { useNavigate } from "react-router-dom"
import { emailAuth } from "../../assets/userSlice"

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [inLoading, setInLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loginData, setLoginData] = useState({
        email: "",
        code: ""
    })

    const social = [
        {
            name: "Facebook",
            logo: "https://eastmarketchurch.com/wp-content/uploads/2018/12/50-best-facebook-logo-icons-gif-transparent-png-images-19.png"
        },
        {
            name: "Google",
            logo: "https://th.bing.com/th/id/OIP.0OuKM7Opm2u41UmXpJGYxwAAAA?pid=ImgDet&rs=1"
        },
        {
            name: "email",
            logo: "https://th.bing.com/th/id/OIP.9RcUGPQjcZjbS4102B7LkwHaHa?pid=ImgDet&rs=1"
        }
    ]

    const emailRegex = new RegExp("^[_a-z0-9-]+([_a-z0-9-]+)*@[a-z0-9-]+([a-z0-9-]+).([a-z]{2,3})$")

    async function handleGenerateAuthCode() {
        let arr = ""
        for (let index = 0; index < 6; index++) {
            const random = Math.floor(Math.random() * 10)
            arr += random
        }
        await setLoginData({ ...loginData, code: arr })
        return arr
    }

    function handleChange(e) {
        setLoginData({ ...loginData, email: e.target.value })
    }

    async function handleValidateEmail() {
        setLoading(true)
        if (loginData.email === undefined || !emailRegex.test(loginData.email)) {
            setError(true)
            setTimeout(() => {
                setLoading(false)
                setError(false)
                setLoginData({ ...loginData, email: "" })
            }, 2000);
        } else if (emailRegex.test(loginData.email)) {
            const code = await handleGenerateAuthCode()
            setInLoading(true)
            dispatch(emailAuth({
                email: loginData.email,
                code: code
            })).then(() => {
                setInLoading(false)
                setStep(step + 1)
            })
        }
    }

    function handleBackStep() {
        if (step === 4) {
            setStep(1)
        } else {
            setStep(step - 1)
        }
    }

    function handleCloseLogin(e) {
        const close = e.target.classList
        if (close.contains("close")) {
            dispatch(showNav())
            navigate("/")
            dispatch(hideLogin())
            dispatch(hideModal())
        }
    }

    function handlebtnClick() {
        navigate("/")
        dispatch(showNav())
        dispatch(hideLogin())
        dispatch(hideModal())
    }

    useEffect(() => {
        dispatch(hideNav())
    },[])

    return (
        <div className="close register-container" onClick={handleCloseLogin}>
            <div className="register">
                <header className="register-header">
                    {step === 1 || step === 4 ?
                        <button onClick={handlebtnClick} className="close register-header-closebtn">X</button>
                        :
                        <button className="register-header-backbtn" onClick={handleBackStep} type="button">
                            <AiOutlineLeft size={18} />
                        </button>
                    }
                    <h4 className="register-header-title">{step === 1 ? "Entrar ou cadastrar-se" : step === 2 ? "Confirme seu email" : step === 3 ? "Concluir cadastro" : "Login"}</h4>
                </header>
                <main className="register-main">
                    {step === 1 && <div className="register-main-container">
                        <h2 className="register-main-title">Bem-vindo ao Mybnb</h2>
                        <form className="register-form">
                            <div className={`register-form-container ${error && "inpt-error"}`}>
                                <label className={`register-form-container-lbl ${error && "lbl-error"}`} htmlFor="phone">Email</label>
                                <input id="email-register" type="email" className="register-form-container-inpt" placeholder="Exemplo123@gmail.com" autoComplete="none" required onChange={handleChange} value={loginData.email} />
                            </div>
                            {error && <span className="register-form-error">Digite um email válido!</span>}
                            <span className="register-form-notice">Certifique-se de inserir um endereço de email válido para receber o código de acesso.</span>
                            <button type="button" className="register-form-button" onClick={e => handleValidateEmail(e)}>{loading ? "Enviando..." : "Continuar"}</button>
                        </form>
                        <div className="register-divisor">
                            <span className="register-divisor-line"></span>
                            ou
                            <span className="register-divisor-line"></span>
                        </div>
                        <div className="register-social">
                            {social.map((social, i) =>
                                <div key={i} className="register-social-item" onClick={() => setStep(4)}>
                                    <img src={social.logo} alt="" className="register-social-item-img" />
                                    <span className="register-social-item-txt">Continuar com {social.name}</span>
                                </div>)
                            }
                        </div>
                    </div>
                    }
                    {step === 2 &&
                        <EmailAuth code={loginData.code} setStep={setStep} />
                    }
                    {step === 3 &&
                        <RegisterForm setStep={setStep} email={loginData.email} />
                    }
                    {step === 4 &&
                        <Login />
                    }
                </main>
            </div>
        </div>
    )
}