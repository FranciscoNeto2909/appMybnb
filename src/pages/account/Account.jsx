import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { hideMenu } from "../../assets/appSlice"
import { AiOutlineSolution, AiOutlineSafety, AiOutlineCreditCard, AiOutlineFile, AiOutlineNotification, AiOutlineEye, AiOutlineControl, AiOutlineGift, AiOutlineCar, AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import "./account.css"

export default function Account({ windowWidth }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(hideMenu())
    }, [dispatch])

    return (
        <>
            <div className="account">
                <div className="account-user">
                    {windowWidth <= 500 &&
                        <AiOutlineLeft size={20} onClick={() => navigate(-1)} className="account-user-btn-back" />
                    }
                    <h1 className="account-title">Conta</h1>
                    {windowWidth > 500 &&
                        <>
                            <span className="account-user-name">User name</span>
                            <span className="account-user-email">User email</span>
                            <span className="account-user-profile">
                                <Link to="/profile">Acessar perfil</Link>
                            </span>
                        </>
                    }
                </div>
                <div className="account-options">
                    {windowWidth >= 500 &&
                        <div className="account-option" onClick={() => navigate("/account/personal-infos")}>
                            <AiOutlineSolution size={30} className="account-options-icons" />
                            <div className="account-option-desc" >
                                <h4>Informações pessoais</h4>
                                <span className="account-option-desc-text">Forneça detalhes pessoais e informações de contato</span>
                            </div>
                        </div>
                    }
                    <div className="account-option" onClick={() => navigate("/account/login-and-security")}>
                        <AiOutlineSafety size={30} className="account-options-icons" />
                        <div className="account-option-desc">
                            <h4>Login e segurança</h4>
                            <span className="account-option-desc-text">Atualize seus dados para mante-los sempre seguros</span>
                        </div>
                        <AiOutlineRight size={22} className="account-option-right" />
                    </div>
                    <div className="account-option">
                        <AiOutlineCreditCard size={30} className="account-options-icons" />
                        <div className="account-option-desc">
                            <h4>Pagamentos e recebimentos</h4>
                            <span className="account-option-desc-text">Consulte seus pagamentos, cupons e cartões de presente</span>
                        </div>
                        <AiOutlineRight size={22} className="account-option-right" />
                    </div>
                    <div className="account-option">
                        <AiOutlineFile size={30} className="account-options-icons" />
                        <div className="account-option-desc">
                            <h4>Impostos</h4>
                            <span className="account-option-desc-text">Gerencie informações e documentos do contribuinte</span>
                        </div>
                        <AiOutlineRight size={22} className="account-option-right" />
                    </div>
                    <div className="account-option">
                        <AiOutlineNotification size={30} className="account-options-icons" />
                        <div className="account-option-desc">
                            <h4>Notificações</h4>
                            <span className="account-option-desc-text">Escolha quais notificações você recebera</span>
                        </div>
                        <AiOutlineRight size={22} className="account-option-right" />
                    </div>
                    <div className="account-option">
                        <AiOutlineEye size={30} className="account-options-icons" />
                        <div className="account-option-desc">
                            <h4>Privacidade e compartilhamento</h4>
                            <span className="account-option-desc-text">Gerencie seus dados pessoais, serviços conectados</span>
                        </div>
                        <AiOutlineRight size={22} className="account-option-right" />
                    </div>
                    <div className="account-option">
                        <AiOutlineControl size={30} className="account-options-icons" />
                        <div className="account-option-desc">
                            <h4>Preferências globais</h4>
                            <span className="account-option-desc-text">Escolha se idioma, moeda e fuso horário</span>
                        </div>
                        <AiOutlineRight size={22} className="account-option-right" />
                    </div>
                    <div className="account-option">
                        <AiOutlineCar size={30} className="account-options-icons" />
                        <div className="account-option-desc">
                            <h4>Viagens a trabalho</h4>
                            <span className="account-option-desc-text">Tenha facilidade para encontrar uma hospedagem ao fazer viagens a trabalho</span>
                        </div>
                        <AiOutlineRight size={22} className="account-option-right" />
                    </div>
                    <div className="account-option">
                        <AiOutlineGift size={30} className="account-options-icons" />
                        <div className="account-option-desc">
                            <h4>Cupom e bonus de hospedagem</h4>
                            <span className="account-option-desc-text">Ganhe um cupom de desconto do anfitrião ou acumule bunos por cada viagem</span>
                            <AiOutlineRight size={22} className="account-option-right" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}