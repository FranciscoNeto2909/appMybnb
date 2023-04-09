import React from 'react';
import { regions } from "./regions"
import "./searchDestiny.css"

export default function SearchDestiny() {
    return (
        <div className="setDestiny-search">
            <div className="setDestiny-search-left">
                <h3>Buscas recentes</h3>
            </div>
            <span className="setDestiny-search-divisor"></span>
            <div className="setDestiny-search-right">
                <h3>Busque por região</h3>
                <div className="search-right-regions">
                    {
                        regions.map((region, i) => (
                            <label key={i} className="search-right-region">
                                <input type="radio" className="search-right-region-input" />
                                <img className="search-right-region-img" alt="" src={region.src} />
                                <span className="search-right-region-txt">{region.title}</span>
                            </label>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}