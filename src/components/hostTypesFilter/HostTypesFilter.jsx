import React, { useState } from "react"
import { hostTypes } from "./hostTypes"
import "./hostTypesFilter.css"
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"
import { BsSliders } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { showFilter } from "../../assets/appSlice"

export default function Filter() {
    const [hostTypeSelected, setHostTypeSelected] = useState("Ilhas")
    const dispatch = useDispatch()

    function handleOpenFilter() {
        dispatch(showFilter())
    }

    return (
        <div className="hostTypes-container">
            <button className="hostTypes-button hostTypes-button--left">
                <AiOutlineLeft size={16} />
            </button>
            <div className="hostTypes">
                {
                    hostTypes.map((hostType, i) => (
                        <div key={i} onClick={() => setHostTypeSelected(hostType.title
                        )} className={`hostTypes-hostType ${hostTypeSelected === hostType.title && "hostTypes-hostType--selected"}`}>
                            <img src={hostType.src} className="hostTypes-hostType-img" alt="hostType" />
                            <span className="hostTypes-hostType-title">{hostType.title}</span>
                        </div>
                    ))
                }
            </div>
            <div className="hostTypes-buttons hostTypes-button--right">
                {/* <button className="hostTypes-buttons-button">
                    <AiOutlineRight size={16} />
                </button> */}
                <button className="hostTypes-buttons-filter" onClick={handleOpenFilter}>
                    <BsSliders size={20} />
                    <span>Filtros</span>
                </button>
            </div>
        </div>
    )
}