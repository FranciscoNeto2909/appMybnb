import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { showNav } from "../../assets/appSlice"
import { AiOutlineLeft } from "react-icons/ai"
import { mask } from "remask"
import "./personalInfos.css"
import { getUser, updateUser } from "../../assets/userSlice"
import { parseISO, format } from 'date-fns';
import { ptBR } from "date-fns/locale"

export default function PersonalInfos() {
    const data = new Date()
    const year = data.getFullYear()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const user = useSelector(data => data.user.user)
    const navigate = useNavigate()

    const emailRegex = new RegExp("^[_a-z0-9-]+([_a-z0-9-]+)*@[a-z0-9-]+([a-z0-9-]+).([a-z]{2,3})$")

    const dispatch = useDispatch()
    const [nameVisib, setNameVisb] = useState(false)
    const [sexoVisib, setSexoVisb] = useState(false)
    const [birthVisib, setBirthVisb] = useState(false)
    const [EmailVisib, setEmailVisb] = useState(false)
    const [phoneVisib, setPhoneVisb] = useState(false)
    const [addrVisib, setAddrVisb] = useState(false)

    const [errors, setErrors] = useState({
        passwordError: false,
        confirmPassError: false,
        birthDateError: false,
        phoneError: false,
        emailError: false
    })
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        image: "",
        lastName: "",
        sex: "",
        phone: "",
        password: "",
        confirmPass: "",
        birthDate: "",
        address: ""
    })

    async function handleValidateEmail() {
        if (!emailRegex.test(userData.email)) {
            setErrors({ ...errors, emailError: true })
            setTimeout(() => {
                setErrors({ ...errors, emailError: false })
            }, 2000);
        } else {
            handleUpdateUser()
        }
    }

    function handleMaskPhone(e) {
        setUserData({ ...userData, phone: mask(`${e.target.value}`, ['(99) 99999-9999']) })
    }

    async function handleValidadeBirthDate() {
        if (userData.birthDate === "" || Number(year) - Number(userData.birthDate.slice(0, 4)) < 18) {
            setErrors({ ...errors, birthDateError: true })
            setTimeout(() => {
                setErrors({ ...errors, birthDateError: false })
            }, 2000);
        } else {
            handleUpdateUser()
        }
    }

    function handleValidatePhone() {
        if (userData.phone === "" || userData.phone.length < 15 || userData.phone[5] !== 9) {
            setErrors({ ...errors, phoneError: true })
            setTimeout(() => {
                setErrors({ ...errors, phoneError: false })
            }, 2000);
        } else {
            handleUpdateUser()
        }
    }

    function handleBackButton() {
        navigate(-1)
        dispatch(showNav())
    }

    function handleChangeBirthdate(e) {
        e.target.style.color = "#000"
        setUserData({ ...userData, birthDate: e.target.value })
    }

    function handleUpdateUser() {
        setNameVisb(false)
        setAddrVisb(false)
        setBirthVisb(false)
        setEmailVisb(false)
        setPhoneVisb(false)
        setSexoVisb(false)

        const dataObj = parseISO(userData.birthDate);
        const formatedDate = format(dataObj, 'dd/MM/yyyy', { locale: ptBR });

        dispatch(updateUser({
            name: `${userData.name} ${userData.lastName}`,
            image: "",
            email: userData.email,
            phone: userData.phone,
            birthDate: formatedDate,
            sex: userData.sex,
            address: userData.address,
            oldPassword: "",
            newPassword: ""
        }))
    }

    function handleGetNewUserdata() {
        setUserData({
            name: "",
            email: "",
            image: "",
            lastName: "",
            sex: "",
            phone: "",
            password: "",
            confirmPass: "",
            birthDate: "",
            address: ""
        })
        const userId = localStorage.getItem("userId")
        dispatch(getUser(userId))
    }

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="pinfo">
            {windowWidth < 750 &&
                <div className="">
                    <AiOutlineLeft size={25} onClick={handleBackButton} />
                </div>
            }
            <div className="pinfo-options">
                {windowWidth > 750 &&
                    <ul className="pinfo-nav">
                        <li className="pinfo-nav-item"><Link className="pinfo-nav-item-link" to="/account">Conta</Link></li>
                        <li className="pinfo-nav-item"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" className="pinfo-nav-item-arow"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg></li>
                        <li className="pinfo-nav-item">Informações pessoais</li>
                    </ul>
                }
                <h1 className="pinfo-title">Informações pessoais</h1>
                <div className="pinfo-container">
                    <h2 className="pinfo-container-title">Name</h2>
                    {nameVisib ?
                        <p className="pinfo-container-desc">Este é o nome que aparecerá em seus documentos de viagem.</p> :
                        <p className="pinfo-container-user">{user.name}</p>
                    }
                    {nameVisib &&
                        <form className="pinfo-form">
                            <div className="pinfo-form-name">
                                <div className="input-group">
                                    <input id="" type="text" className="inpt pinfo-form-name-inpt" autoComplete="none" placeholder=" " required value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
                                    <label className="lbl" htmlFor="name">Name</label>
                                </div>
                                <div className="input-group">
                                    <input id="" type="text" placeholder=" " className="inpt pinfo-form-name-inpt" autoComplete="none" required value={userData.lastName} onChange={e => setUserData({ ...userData, lastName: e.target.value })} />
                                    <label className="lbl" htmlFor="sobrenome">Sobrenome</label>
                                </div>
                            </div>
                            <button type="button" className="pinfo-btn-save" onClick={handleUpdateUser}>Salvar</button>
                        </form>
                    }
                    <button className="pinfo-btn-edit" onClick={() => setNameVisb(!nameVisib)}>{nameVisib ? "Cancelar" : "Editar"}</button>
                </div>
                <div className="pinfo-container">
                    <h2 className="pinfo-container-title">Sexo</h2>
                    <p className="pinfo-container-desc">{user.sex ? user.sex : "Não especificado"}</p>
                    {sexoVisib &&
                        <form className="">
                            <div className="input-group">
                                <select name="" id="" placeholder=" " className="inpt pinfo-select" onChange={e => setUserData({ ...userData, sex: e.target.value })}>
                                    <option value=""></option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="outro">Outro</option>
                                </select>
                                <label htmlFor="" className="lbl">Sexo</label>
                            </div>
                            <button type="button" className="pinfo-btn-save" onClick={handleUpdateUser}>Salvar</button>
                        </form>
                    }
                    <button className="pinfo-btn-edit" onClick={() => setSexoVisb(!sexoVisib)}>{sexoVisib ? "Cancelar" : "Editar"}</button>
                </div>
                <div className="pinfo-container">
                    <h2 className="pinfo-container-title">Data de nascimento</h2>
                    {!birthVisib && <p className="">{user.birthDate ? user.birthDate : "**/**/****"}</p>}
                    {birthVisib &&
                        <form className="">
                            <div className="">
                                <input type="date" className={errors.birthDateError ? "inpt--date inpt inpt-error lbl-error" : "inpt inpt--date"} value={userData.birthDate} onChange={handleChangeBirthdate} />
                            </div>
                            {errors.birthDateError && <p className="lbl-error">Você deve ter mais de 18 anos!</p>}
                            <button type="button" className="pinfo-btn-save" onClick={handleValidadeBirthDate}>Salvar</button>
                        </form>
                    }
                    <button className="pinfo-btn-edit" onClick={() => setBirthVisb(!birthVisib)}>{birthVisib ? "Cancelar" : "Editar"}</button>
                </div>
                <div className="pinfo-container">
                    <h2 className="pinfo-container-title">Endereço de email</h2>
                    {!EmailVisib ?
                        <p className="pinfo-container-user">{user.email}</p> :
                        <p className="pinfo-container-desc">Use um endereço de email a qual tenha acesso</p>
                    }
                    {EmailVisib && <div className="">
                        <form className="input-group">
                            <input id="name" type="email" required
                                className={errors.emailError ?
                                    "inpt inpt-error lbl-error" :
                                    "inpt"
                                } placeholder=" " autoComplete="none" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })}
                            />
                            <label className={errors.emailError ? "lbl lbl-error" : "lbl"} htmlFor="name">Endereço de email</label>
                            {errors.emailError &&
                                <p className="">Digite um endereço de email válido!</p>
                            }
                        </form>
                        <button className="pinfo-btn-save" onClick={handleValidateEmail}>Salvar</button>
                    </div>}
                    <button className="pinfo-btn-edit" onClick={() => setEmailVisb(!EmailVisib)}>{EmailVisib ? "Cancelar" : "Editar"}</button>
                </div>
                <div className="pinfo-container">
                    <h2 className="pinfo-container-title">Telefone</h2>
                    {!phoneVisib ?
                        <p className="pinfo-container-user">{user.phone}</p> :
                        <p className="pinfo-container-desc">Adicione um numero de telefone para que os hospedes e o mybnb possa entrar em contato.</p>
                    }
                    {phoneVisib &&
                        <form className="">
                            <p className="pinfo-container-desc">Insira um novo numero de telefone</p>
                            <div className="">
                                <div className="input-group">
                                    <select id="countrys" className="pinfo-select inpt" placeholder=" ">
                                        <option value=""></option>
                                        <option value="+55">Brasil(+55)</option>
                                        <option value="+1">Estados Unidos(+1)</option>
                                        <option value="+1">Canada(+1)</option>
                                        <option value="+49">Alemanha(+49)</option>
                                        <option value="+44">Reino unido(+44)</option>
                                        <option value="+7">Russia(+7)</option>
                                        <option value="+213">Argentina(+213)</option>
                                    </select>
                                    <label htmlFor="countrys" className="lbl">País/Região</label>
                                </div>
                                <div className="input-group">
                                    <input id="phone" type="tel" placeholder=" " required
                                        className={errors.phoneError ?
                                            "inpt inpt-error lbl-error" :
                                            "inpt pinfo-form-inpt"
                                        } autoComplete="none" value={userData.phone} onChange={e => handleMaskPhone(e)} />
                                    <label className={errors.phoneError ? "lbl lbl-error" : "lbl"} htmlFor="phone">Número de telefone</label>
                                    {errors.phoneError &&
                                        <p className="">
                                            Digite um telefone válido
                                        </p>
                                    }
                                </div>
                                <p className="pinfo-container-desc">Nenhum sms será enviado para seu número.</p>
                            </div>
                            <button className="pinfo-btn-save" onClick={handleValidatePhone}>Salvar</button>
                        </form>}
                    <button className="pinfo-btn-edit" onClick={() => setPhoneVisb(!phoneVisib)}>{phoneVisib ? "Cancelar" : "Editar"}</button>
                </div>
                <div className="pinfo-container" style={{ border: "none" }}>
                    <h2 className="pinfo-container-title">Endereço</h2>
                    {!addrVisib ?
                        <p className="pinfo-container-desc">{user.address ? user.address : "Não fornecido"}</p> :
                        <p className="pinfo-container-desc">Use um email a qual tenha acesso</p>
                    }
                    {addrVisib &&
                        <form className="">
                            <div className="input-group">
                                <input id="address" type="text" placeholder=" " className="inpt" autoComplete="none" required value={userData.address} onChange={e => setUserData({ ...userData, address: e.target.value })} />
                                <label className="lbl" htmlFor="address">Endereço</label>
                            </div>
                            <button type="button" className="pinfo-btn-save" onClick={handleUpdateUser}>Salvar</button>
                        </form>
                    }
                    <button className="pinfo-btn-edit" onClick={() => setAddrVisb(!addrVisib)}>{addrVisib ? "Cancelar" : "Editar"}</button>
                </div>
                <div className="">
                    <button className="pinfo-btn-update" onClick={handleGetNewUserdata}>Atualizar dados</button>
                </div>
            </div >
        </div >
    )
}