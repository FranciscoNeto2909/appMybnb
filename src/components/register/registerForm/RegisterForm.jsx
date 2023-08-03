import React, { useState } from "react"
import { createUser } from "../../../assets/userSlice"
import { useDispatch } from "react-redux"
import { mask } from "remask"
import { hash } from "bcryptjs"
import "./registerForm.css"

export default function RegisterForm({ setStep, email }) {
    const data = new Date()
    const year = data.getFullYear()
    const dispatch = useDispatch()

    const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$")

    const [errors, setErrors] = useState({
        name: false,
        lastName: false,
        phone: false,
        password: false,
        confirmPass: false,
        birthDate: false
    })

    const [userData, setUserData] = useState({
        name: "",
        lastName: "",
        password: "",
        confirmPass: "",
        phone: "",
        birthDate: "",
    })


    function handleMaskPhone(e) {
        setUserData({ ...userData, phone: mask(`${e.target.value}`, ['(99) 99999-9999']) })
    }

    async function handleRegister() {
        if (userData.name === "" || userData.name.length < 2) {
            setErrors({ ...errors, name: true })
            setTimeout(() => {
                setErrors({ ...errors, name: false })
            }, 2000);
        } else if (userData.lastName === "" || userData.lastName.length < 4) {
            setErrors({ ...errors, lastName: true })
            setTimeout(() => {
                setErrors({ ...errors, lastName: false })
            }, 2000);
        } else if (userData.password === "" || userData.password.length < 6 || !passwordRegex.test(userData.password)) {
            setErrors({ ...errors, password: true })
            setTimeout(() => {
                setErrors({ ...errors, password: false })
            }, 2500);
        } else if (userData.confirmPass === "") {
            setErrors({ ...errors, confirmPass: true })
            setTimeout(() => {
                setErrors({ ...errors, confirmPass: false })
            }, 2000);
        } else if (userData.password !== userData.confirmPass) {
            setErrors({ ...errors, confirmPass: true })
            setTimeout(() => {
                setErrors({ ...errors, confirmPassword: false })
            }, 2000);
        } else if (userData.birthDate === "" || Number(year) - Number(userData.birthDate.slice(0, 4)) < 18) {
            setErrors({ ...errors, birthDate: true })
            setTimeout(() => {
                setErrors({ ...errors, birthDate: false })
            }, 2000);
        } else if (userData.phone === "" || userData.phone.length < 15 || Number(userData.phone[5]) !== 9) {
            setErrors({ ...errors, phone: true })
            setTimeout(() => {
                setErrors({ ...errors, phone: false })
            }, 2000);
        }
        else {
            const hashedPassword = await hash(userData.password, 8)
            const partesData = userData.birthDate.split("-");
            const formatedDate = partesData[2] + "/" + partesData[1] + "/" + partesData[0];

            await dispatch(createUser({
                name: `${userData.name} ${userData.lastName}`,
                phone: userData.phone,
                email: email,
                password: hashedPassword,
                birthDate: formatedDate
            })).then(() => setStep(4))
        }
    }


    return (
        <>
            <section className="name">
                <h4 className="registerForm-title">Nome e sobrenome</h4>
                <div className="input-group">
                    <input id="name" type="email" placeholder=" " className={`inpt ${errors.name && "inpt-error"}`} required autoCapitalize="on" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
                    <label className={`lbl ${errors.name && "lbl-error"}`} htmlFor="name">Name</label>
                </div>
                <div className="input-group">
                    <input id="sobrenome" type="text" placeholder=" " className={`inpt ${errors.lastName && "inpt-error"}`} autoComplete="none" required autoCapitalize="on" onChange={e => setUserData({ ...userData, lastName: e.target.value })} />
                    <label className={`lbl ${errors.lastName && "lbl-error"}`} htmlFor="sobrenome">Sobrenome</label>
                    {errors.name && <p className="lbl-error">Nome muito curto!</p>}
                    {errors.lastName && <p className="lbl-error">Sobrenome muito curto!</p>}
                </div>
                <p className="name-desc">O nome que você colocar aqui ficara visivel para os outros usuarios</p>
            </section>
            <section className="password">
                <h4 className="registerForm-title">Senha</h4>
                <div className="input-group">
                    <input type="password" id="pass" placeholder=" "
                        className="inpt"
                        required value={userData.password}
                        onChange={e => setUserData({ ...userData, password: e.target.value })} />
                    <label htmlFor="pass" className={`lbl ${errors.password && "lbl-error"}`}>Senha</label>
                </div>
                {errors.password && userData.password === "" && <p className="lbl-error">Este campo não pode ser vazio!</p>}

                {errors.password && userData.password.length > 1 && userData.password.length < 6 && <p className="lbl-error">Este campo deve conter no minimo 6 digitos</p>}

                {errors.password && userData.password.length > 1 && userData.password.length >= 6 && <p className="lbl-error">Sua senha deve ter letras maiusculas minusculas e numeros</p>}

                <h4 className="registerForm-title">Confirme sua senha</h4>
                <div className="input-group">
                    <input type="password" id="pass-confirm" placeholder=" "
                        className="inpt" required onChange={e => setUserData({ ...userData, confirmPass: e.target.value })} />
                    <label htmlFor="confirm-pass" className={`lbl ${errors.confirmPass && "lbl-error"}`}>Confirmação</label>
                </div>
                {errors.confirmPass && userData.confirmPass === "" && <p className="lbl-error">Este campo não pode ser vazio!</p>}
                {errors.confirmPass && userData.confirmPass.length > 0 && userData.confirmPass.length < 6 && <p className="lbl-error">Este campo deve conter no minimo 6 digitos</p>}
                {errors.confirmPass && userData.password !== userData.confirmPass && userData.confirmPass.length >= 6 && <p className="lbl-error">As senhas não coincidem</p>}
            </section>
            <section className="birthDate">
                <details className="">
                    <summary className="registerForm-title">Data de nascimento</summary>
                    <span className="registerForm-birthDate-desc">para se cadastrar deve ter mais de 18 anos.</span></details>
                <input type="date" onChange={e => setUserData({ ...userData, birthDate: e.target.value })} className={`inpt ${errors.birthDate && "inpt-error"}`} />
                {errors.birthDate && userData.birthDate === "" &&
                    <p className="lbl-error">este campo não pode ser vazio!</p>}
                {errors.birthDate && Number(year) - Number(userData.birthDate.slice(0, 4)) < 18 && <p className="lbl-error">Você deve ter mais de 18 anos</p>}
            </section>
            <section className="phone">
                <div className="input-group">
                    <input className="inpt" placeholder=" " type={'tel'} id="tel" autoComplete="none" required onChange={e => handleMaskPhone(e)} value={userData.phone} />
                    <label className={errors.phone ? "lbl lbl-error" : "lbl"} htmlFor="tel">Telefone</label>
                    {errors.phone && userData.phone === "" &&
                        <p className="lbl-error">Este campo não pode ser vazio!</p>}
                    {errors.phone && userData.phone !== "" &&
                        <p className="lbl-error">Digite um numero válido!</p>}
                </div>
            </section>
            <section className="service-terms">
                <p className="">Não vamos enviar confirmações de viagem e recibos para voce por email.</p>
                <p className="">Ao selecionar <strong>Concordar e continuar</strong>, eu concordo com os termos de serviços, Politica de Não Discriminalização e Politica de Privacidade</p>
            </section>
            <button className="registerForm-button" onClick={() => handleRegister()}>Concordar e continuar</button>
            <div className="">
                <input className="" type="checkbox" id="espaco" />
                <label className="" htmlFor="espaco">Não quero receber mensagens de marketing do mybnb</label>
            </div>
            <small className="register-form-notice">Esta aplicação foi desenvolvida no intuito de praticar programação web. Não tem nenhum fim comercial ou financeiro.</small>
        </>
    )
}