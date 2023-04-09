import React from 'react';
import { AiOutlineSearch } from "react-icons/ai"
import { regions } from "../../../desktopNav/where/regions"
import "./mobWhere.css"

export default function MobWhere({ destiny, handleWriteDestiny, handleSearchDestiny, HandleChoiseRegion, setStep }) {

    return (
        <>
            <section className="mobWhere">
                <h1 className="">Para onde?</h1>
                <label htmlFor="w-search" className="mobWhere-search">
                    <AiOutlineSearch size={20} className="mobWhere-search-img" />
                    <input type="text" id="w-search" autoComplete="none" className="mobWhere-search-input" placeholder="Buscar destinos" onChange={handleWriteDestiny} onKeyDown={handleSearchDestiny} /></label>
                {destiny === "" &&
                    <div className="mobWhere-regions-container">
                        {
                            regions.map((dest, i) => (
                                <div key={i} className="mobWhere-regions" onClick={() => HandleChoiseRegion(dest.title)}>
                                    <img className="mobWhere-regions-img" src={dest.src} alt="" />
                                    <p className="mobWhere-regions-title">{dest.title}</p>
                                </div>
                            ))
                        }
                    </div>
                }
            </section>
            {destiny === "" &&
                <div className="mobWhere-buttons mobWhere-buttons--space-top">
                    <button className="mobWhere-button" onClick={() => setStep(2)}>
                        <span className="mobWhere-button-text">Quando</span>
                        <span className="">Adicionar datas</span>
                    </button>
                    <button className="mobWhere-button" onClick={() => setStep(3)}>
                        <span className="mobWhere-button-text">Quem</span>
                        <span className="">Adicionar hóspedes</span>
                    </button>
                </div>
            }
        </>
    )
}