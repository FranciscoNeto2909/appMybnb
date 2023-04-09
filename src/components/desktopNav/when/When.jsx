import React, { useState } from 'react';
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "./when.css"

export default function When() {
    const [date, setDate] = useState("")
    const [btnId, setBtnId] = useState("btn-1")
    function handleSetDate(e) {
        setDate(e)
    }

    return (
        <>
            <h4 className="when-title">Quando é sua viagem?</h4>
            <div className="when-buttons">
                <button className={`when-button ${btnId === "btn-1" && "when-button--selected"}`} onClick={e => setBtnId(e.target.id)} id="btn-1">Escolher data</button>
                <button className={`when-button ${btnId === "btn-2" && "when-button--selected"}`} onClick={e => setBtnId(e.target.id)} id="btn-2">Datas flexíveis</button>
            </div>
            <div className="when-datepicker-container">
                <Datepicker
                    className="when-datepicker" selected={date} dateFormat="dd / MMM / yyyy"
                    onChange={e => handleSetDate(e)}
                    inline
                    minDate={new Date()}
                ></Datepicker>
            </div>
        </>
    )
}