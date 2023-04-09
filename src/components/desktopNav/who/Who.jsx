import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import "./who.css"

export default function HostsFilter() {

    const [hostsQuant, setHostsQuant] = useState({
        adults: 0,
        kids: 0,
        babies: 0,
        animals: 0
    })

    function handleAddHosts(type) {
        if (type === "adult" && hostsQuant.adults < 16) {
            setHostsQuant({ ...hostsQuant, adults: hostsQuant.adults + 1 })
        } else if (type === "kid" && hostsQuant.kids < 6) {
            setHostsQuant({ ...hostsQuant, kids: hostsQuant.kids + 1 })
        } else if (type === "babie" && hostsQuant.babies < 4) {
            setHostsQuant({ ...hostsQuant, babies: hostsQuant.babies + 1 })
        } else if (type === "animal" && hostsQuant.animals < 3) {
            setHostsQuant({ ...hostsQuant, animals: hostsQuant.animals + 1 })
        }
    }

    function handleRemoveHosts(type) {
        if (type === "adult" && hostsQuant.adults > 0) {
            setHostsQuant({ ...hostsQuant, adults: hostsQuant.adults - 1 })
        } else if (type === "kid" && hostsQuant.kids > 0) {
            setHostsQuant({ ...hostsQuant, kids: hostsQuant.kids - 1 })
        } else if (type === "babie" && hostsQuant.babies > 0) {
            setHostsQuant({ ...hostsQuant, babies: hostsQuant.babies - 1 })
        } else if (type === "animal" && hostsQuant.animals > 0) {
            setHostsQuant({ ...hostsQuant, animals: hostsQuant.animals - 1 })
        }
    }

    return (
        <div className="hostsFilter">
            <div className="hostsFilter-hosts hostsFilter-hosts-border">
                <h3 className="hostsFilter-title">Adultos</h3>
                <span className="hostsFilter-desc">13 anos ou mais</span>
                <div className="hostsFilter-hosts-buttons">
                    <button onClick={() => handleRemoveHosts("adult")} className={`hostsFilter-hosts-button ${hostsQuant.adults === 0 && "hostsFilter-hosts-button--disabled"}`}>
                        <AiOutlineMinus size={18} />
                    </button>
                    <span>{hostsQuant.adults}</span>
                    <button onClick={() => handleAddHosts("adult")} className={`hostsFilter-hosts-button ${hostsQuant.adults === 16 && "hostsFilter-hosts-button--disabled"}`}>
                        <AiOutlinePlus size={18} />
                    </button>
                </div>
            </div>
            <div className="hostsFilter-hosts hostsFilter-hosts-border">
                <h3 className="hostsFilter-title">Crianças</h3>
                <span className="hostsFilter-desc">Idade 2-12</span>
                <div className="hostsFilter-hosts-buttons">
                    <button onClick={() => handleRemoveHosts("kid")}
                        className={`hostsFilter-hosts-button ${hostsQuant.kids === 0 && "hostsFilter-hosts-button--disabled"}`}>
                        <AiOutlineMinus size={18} />
                    </button>
                    <span>{hostsQuant.kids}</span>
                    <button onClick={() => handleAddHosts("kid")} className={`hostsFilter-hosts-button ${hostsQuant.kids === 6 && "hostsFilter-hosts-button--disabled"}`}>
                        <AiOutlinePlus size={18} />
                    </button>
                </div>
            </div>
            <div className="hostsFilter-hosts hostsFilter-hosts-border">
                <h3 className="hostsFilter-title">Bebês</h3>
                <span className="hostsFilter-desc">Menor de 2</span>
                <div className="hostsFilter-hosts-buttons">
                    <button onClick={() => handleRemoveHosts("babie")} className={`hostsFilter-hosts-button ${hostsQuant.babies === 0 && "hostsFilter-hosts-button--disabled"}`}>
                        <AiOutlineMinus size={18} />
                    </button>
                    <span>{hostsQuant.babies}</span>
                    <button onClick={() => handleAddHosts("babie")} className={`hostsFilter-hosts-button ${hostsQuant.babies === 4 && "hostsFilter-hosts-button--disabled"}`}>
                        <AiOutlinePlus size={18} />
                    </button>
                </div>
            </div>
            <div className="hostsFilter-hosts">
                <h3 className="hostsFilter-title">Animais de estimação</h3>
                <span className="hostsFilter-desc">Vai levar um animal de serviço?</span>
                <div className="hostsFilter-hosts-buttons">
                    <button onClick={() => handleRemoveHosts("animal")} className={`hostsFilter-hosts-button ${hostsQuant.animals === 0 && "hostsFilter-hosts-button--disabled"}`}>
                        <AiOutlineMinus size={18} />
                    </button>
                    <span>{hostsQuant.animals}</span>
                    <button onClick={() => handleAddHosts("animal")} className={`hostsFilter-hosts-button ${hostsQuant.animals === 3 && "hostsFilter-hosts-button--disabled"}`}>
                        <AiOutlinePlus size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}