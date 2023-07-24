import { useState } from "react"
import "./login.css"

export default function Login() {
    const emailRegex = new RegExp("^[_a-z0-9-]+([_a-z0-9-]+)*@[a-z0-9-]+([a-z0-9-]+).([a-z]{2,3})$")

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    function handleChangeEmail(e) {
        setLoginData({ ...loginData, email: e.target.value })
    }

    function handleChangePassword(e) {
        setLoginData({ ...loginData, password: e.target.value })
    }

    function handleLogin() {
        if (loginData.email === "") {
            setErrors({ ...errors, email: true })
            setTimeout(() => {
                setErrors({ ...errors, email: false })
            }, 2000);
        } else if (!emailRegex.test(loginData.email)) {
            setErrors({ ...errors, email: true })
            setTimeout(() => {
                setErrors({ ...errors, email: false })
            }, 2000);
        } else if (loginData.password === "") {
            setErrors({ ...errors, password: true })
            setTimeout(() => {
                setErrors({ ...errors, password: false })
            }, 2000);
        } else if (loginData.password !== "abc123") {
            setErrors({ ...errors, password: true })
            setTimeout(() => {
                setErrors({ ...errors, password: false })
            }, 2000);
        } else {
            console.log("login feito")
        }
    }

    return (
        <div className="login">
            <p className="login-desc">Faça login com sua conta para acessar seus dados no myBnb</p>
            <form className="login-form">
                <div className="login-form-group input-group">
                    <input id="email" type="email" placeholder=" " autoComplete="none" required className={`inpt ${errors.email && "inpt-error"}`} autoCapitalize="on" onChange={handleChangeEmail} value={loginData.email} />
                    <label className={`lbl ${errors.email && "lbl-error"}`} htmlFor="email">Email</label>
                </div>
                {errors.email &&
                    <span className="lbl-error font-small">{loginData.email === "" ? "Este campo não pode ser vazio" : "Digite um email válido"}</span>}
                <div className="login-form-group input-group">
                    <input id="password" type="" required placeholder=" " className={`inpt ${errors.password && "inpt-error"}`} autoCapitalize="on" value={loginData.password} onChange={handleChangePassword} />
                    <label className={`lbl ${errors.password && "lbl-error"}`} htmlFor="">Senha</label>
                </div>
                {errors.password &&
                    <span className="lbl-error font-small">{loginData.password === "" ? "Este campo não pode ser vazio" : "Email ou senha incorretos"}</span>}
                <button type="button" className="login-form-btn" onClick={handleLogin}>Login</button>
            </form>
            <span>Sua senha deve conter numeros, letras maiusculas, letras minusculas e nenhum caracter especial.</span>
            <span className="login-notice">Essa aplicação foi desenvolvida no intuito de praticar programação e não tem nenhum fim comercial ou finançeiro</span>
        </div>
    )
}