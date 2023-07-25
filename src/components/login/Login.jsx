import { useState } from "react"
import { getUser, login } from "../../assets/userSlice"
import { hideLogin, hideModal } from "../../assets/appSlice"
import "./login.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function Login() {
    const [inLoading, setInLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRegex = new RegExp("^[_a-z0-9-]+([_a-z0-9-]+)*@[a-z0-9-]+([a-z0-9-]+).([a-z]{2,3})$")

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        loginError: false
    })

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    function handleChangeEmail(e) {
        setUser({ ...user, email: e.target.value })
    }

    function handleChangePassword(e) {
        setUser({ ...user, password: e.target.value })
    }

    function handleLogin() {
        if (user.email === "") {
            setErrors({ ...errors, email: true })
            setTimeout(() => {
                setErrors({ ...errors, email: false })
            }, 2000);
        } else if (!emailRegex.test(user.email)) {
            setErrors({ ...errors, email: true })
            setTimeout(() => {
                setErrors({ ...errors, email: false })
            }, 2000);
        } else if (user.password === "") {
            setErrors({ ...errors, password: true })
            setTimeout(() => {
                setErrors({ ...errors, password: false })
            }, 2000);
        } else if (inLoading == false) {
            setInLoading(true)
            dispatch(login(user))
                .then(e => {
                    if (e.payload.error == false) {
                        const userId = e.payload.userId
                        localStorage.setItem("userId", userId.toString())
                        dispatch(getUser(userId.toString()))
                        setInLoading(false)
                        dispatch(hideModal())
                        dispatch(hideLogin())
                        navigate("/")
                    } else {
                        setErrors({ ...errors, loginError: true })
                        setTimeout(() => {
                            setErrors({ ...errors, loginError: false })
                        }, 2500);
                    }
                });
        }
    }

    return (
        <div className="login">
            <p className="login-desc">Faça login com sua conta para acessar seus dados no myBnb</p>
            <form className="login-form">
                <div className="login-form-group input-group">
                    <input id="email-login" type="email" placeholder=" " autoComplete="none" required className={`inpt ${errors.email && "inpt-error"}`} autoCapitalize="on" onChange={handleChangeEmail} value={user.email} />
                    <label className={`lbl ${errors.email && "lbl-error"}`} htmlFor="email">Email</label>
                </div>
                {errors.email &&
                    <span className="lbl-error font-small">{user.email === "" ? "Este campo não pode ser vazio" : "Digite um email válido"}</span>}
                <div className="login-form-group input-group">
                    <input id="password" type="password" required placeholder=" " className={`inpt ${errors.password && "inpt-error"}`} autoCapitalize="on" value={user.password} onChange={handleChangePassword} />
                    <label className={`lbl ${errors.password && "lbl-error"}`} htmlFor="">Senha</label>
                </div>
                {errors.password &&
                    <span className="lbl-error font-small">{user.password === "" ? "Este campo não pode ser vazio" : "Email ou senha incorretos"}</span>}
                <button type="button" className="login-form-btn" onClick={handleLogin}>{inLoading ? "Aguarde ..." : "Login"}</button>
            </form>
            <span>Sua senha deve conter numeros, letras maiusculas, letras minusculas e nenhum caracter especial.</span>
            <span className="login-notice">Essa aplicação foi desenvolvida no intuito de praticar programação e não tem nenhum fim comercial ou finançeiro</span>
        </div>
    )
}