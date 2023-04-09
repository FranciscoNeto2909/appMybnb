import React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import "./mobWho.css"

export default function MobWho({ handleremoveHosts, handleAddHosts, hosts }) {
    return (
        <>
            <div className="mobWho">
                <h4 className="mobWho-title">Quem está vindo?</h4>
                <div className="mobWho-buttons-container">
                    <div className="">
                        <p className="mobWho-button-text-dark">Adultos</p>
                        <p className="mobWho-button-text">16 anos ou mais</p>
                    </div>
                    <div className="mobWho-buttons">
                        <button onClick={() => handleremoveHosts("adult")} className={`mobWho-button ${hosts.adults === 0 && "mobWho-button--disabled"}`}>
                            <AiOutlineMinus size={16} />
                        </button>
                        <p className="fs-5 mx-3">{hosts.adults}</p>
                        <button onClick={() => handleAddHosts("adult")} className={`mobWho-button ${hosts.adults === 16 && "mobWho-button--disabled"}`}>
                            <AiOutlinePlus size={16} />
                        </button>
                    </div>
                </div>
                <div className="mobWho-buttons-container">
                    <div className="">
                        <p className="mobWho-button-text-dark">Crianças</p>
                        <p className="mobWho-button-text">Idade entre 2 e 15</p>
                    </div>
                    <div className="mobWho-buttons">
                        <button onClick={() => handleremoveHosts("kid")} className={`mobWho-button ${hosts.kids === 0 && "mobWho-button--disabled"}`}>
                            <AiOutlineMinus size={16} />
                        </button>
                        <p className="">{hosts.kids}</p>
                        <button onClick={() => handleAddHosts("kid")} className={`mobWho-button ${hosts.kids === 8 && "mobWho-button--disabled"}`}>
                            <AiOutlinePlus size={16} />
                        </button>
                    </div>
                </div>
                <div className="mobWho-buttons-container">
                    <div className="">
                        <p className="mobWho-button-text-dark">Bebês</p>
                        <p className="mobWho-button-text">Menor de 2</p>
                    </div>
                    <div className="mobWho-buttons">
                        <button onClick={() => handleremoveHosts("babie")} className={`mobWho-button ${hosts.babies === 0 && "mobWho-button--disabled"}`}>
                            <AiOutlineMinus size={16} />
                        </button>
                        <p className="">{hosts.babies}</p>
                        <button onClick={() => handleAddHosts("babie")} className={`mobWho-button ${hosts.babies === 4 && "mobWho-button--disabled"}`}>
                            <AiOutlinePlus size={16} />
                        </button>
                    </div>
                </div>
                <div className="mobWho-buttons-container">
                    <div className="">
                        <p className="mobWho-button-text-dark">Animais de estimação</p>
                        <p className="mobWho-button-text">Animais de serviço?</p>
                    </div>
                    <div className="mobWho-buttons">
                        <button onClick={() => handleremoveHosts("animal")} className={`mobWho-button ${hosts.animals === 0 && "mobWho-button--disabled"}`}>
                            <AiOutlineMinus size={16} />
                        </button>
                        <p className="">{hosts.animals}</p>
                        <button onClick={() => handleAddHosts("animal")} className={`mobWho-button ${hosts.animals === 3 && "mobWho-button--disabled"}`}>
                            <AiOutlinePlus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}