import React from 'react';
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "./mobWhen.css"

export default function MobWhen({btnId, setBtnId, date, handleSetDate}) {
    return (
        <>
            <div className="mobWhen">
                <h4 className="mobWhen-title">Quando é sua viagem?</h4>
                <div className="mobWhen-buttons">
                    <button className={`mobWhen-button ${btnId === "btn-1" && "mobWhen-button--selected"}`} onClick={e => setBtnId(e.target.id)} id="btn-1">Escolher data</button>
                    <button className={`mobWhen-button ${btnId === "btn-2" && "mobWhen-button--selected"}`} onClick={e => setBtnId(e.target.id)} id="btn-2">Datas flexíveis</button>
                </div>
                <div className="mobWhen-datepicker-container">
                    <Datepicker
                        className="mobWhen-datepicker" selected={date} dateFormat="dd / MMM / yyyy"
                        onChange={e => handleSetDate(e)}
                        inline
                        minDate={new Date()}
                    ></Datepicker>
                </div>
            </div>
        </>
    )
}