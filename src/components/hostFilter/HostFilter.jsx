import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { hideFilter, hideModal, showModal } from "../../assets/appSlice"
import { AiOutlineClose } from "react-icons/ai"
import "./hostFilter.css"

export default function HostFilter() {
    const dispatch = useDispatch()
    const prices = [230, 150, 75, 300, 460, 170, 542, 340, 430, 275]
    const averagePrice = Math.round(prices.reduce((prev, curr) => prev + curr) / prices.length)

    const quantity = ["Qualquer um", 1, 2, 3, 4, 5, 6, 7, 8]
    const [filter, setFilter] = useState({
        minPrice: 50,
        maxPrice: 5000,
        bdRoom: 0,
        beds: 0,
        bthRoom: 0,
        spaceType: [],
        placeType: [],
        confort: [],
        lang: [],
    })
    // const [lang, setLang] = useState("")
    const [bdRoomsId, setBdRoomsId] = useState(0)
    const [bedsId, setBedsId] = useState(0)
    const [bthRoomsId, setBthRoomsId] = useState(0)
    const [hostTypeId, setHostTypeId] = useState(0)

    function handleSelectItem(e, type) {
        if (type === "bedroom") {
            setFilter({ ...filter, bdRoom: e.target.innerText })
            setBdRoomsId(Number(e.target.id))
        } else if (type === "bed") {
            setFilter({ ...filter, beds: e.target.innerText })
            setBedsId(Number(e.target.id))
        } else if (type === "bethroom") {
            setFilter({ ...filter, bthRoom: e.target.innerText })
            setBthRoomsId(Number(e.target.id))
        }
    }

    function handleSetPriceValue(e, type) {
        const maxReg = /^\d{0,5}$/
        if (type === "min") {
            if (maxReg.test(e.target.value)) {
                setFilter({ ...filter, minPrice: e.target.value })
            }
        } else if (type === "max") {
            if (maxReg.test(e.target.value)) {
                setFilter({ ...filter, maxPrice: e.target.value })
            }
        }
    }

    // function handlesetPlaceType(e) {
    //     if (filter.placeType.includes(e)) {
    //         setFilter({ ...filter, placeType: filter.placeType.filter(place => place !== e) })
    //     } else {
    //         filter.placeType.push(e)
    //     }
    // }

    function handleSetSpaceType(e, { text }) {
        setHostTypeId(Number(e.target.id))
        if (filter.spaceType.includes(text)) {
            setFilter({ ...filter, spaceType: filter.spaceType.filter(space => space !== text) })
        } else if (e.value) {
            filter.spaceType.push(text)
        }
    }

    // function handleSetLang(e) {
    //     if (filter.lang.includes(e)) {
    //         setFilter({ ...filter, lang: filter.lang.filter(lng => lng !== e) })
    //     } else {
    //         filter.lang.push(e)
    //     }
    // }

    function handleCloseFilter() {
        dispatch(hideFilter())
        dispatch(hideModal())
    }

    function handleCheck(e) {
        e.target.firstElementChild.checked = !e.target.firstElementChild.checked
        console.log(e.target.firstElementChild.value)
    }

    function handleSelectConfort(e) {
        e.target.firstElementChild.checked = !e.target.firstElementChild.checked
        const value = e.target.firstElementChild.value
        if (filter.confort.includes(value)) {
            setFilter({ ...filter, confort: filter.confort.filter(item => item !== value) })
        } else {
            filter.confort.push(value)
        }
    }

    function handleReserve(e) {
        e.target.parentNode.firstElementChild.classList.toggle("switch")
        e.target.parentNode.classList.toggle("selected")
        console.log(e.target.value)
    }

    useEffect(() => {
        dispatch(showModal())
    }, [dispatch])


    return (
        <div className="filter-container">
            <div className="filter">
                <header className="filter-header">
                    <button className="filter-header-button" onClick={handleCloseFilter}>
                        <AiOutlineClose size={18} />
                    </button>
                    <h1 className="filter-header-title">Filtros</h1>
                </header>
                <main className="filter-main">
                    <section className="filter-main-price">
                        <h2 className="filter-main-price-title">Faixa de preço</h2>
                        <p className="filter-main-price-desc">O preço médio por noite é R${averagePrice}</p>
                        <div className="filter-main-price-table">
                            {
                                prices.map((price, i) => (
                                    filter.minPrice < price && <div key={i} className="filter-main-price-table-col" style={{ height: `${price / 8}px` }}></div>
                                ))
                            }
                        </div>
                        <div className="filter-main-price-prices">
                            <div className="filter-main-price-prices-min">
                                <label htmlFor="minPrice" className="filter-main-price-prices-min-lbl" >preço mínimo</label>
                                <div>
                                    <span className="">R$</span>
                                    <input type="text" id="minPrice" autoComplete="none" className="filter-main-price-prices-min-inpt" value={filter.minPrice} onChange={e => handleSetPriceValue(e, "min")} />
                                </div>
                            </div>
                            <span className="filter-main-price-prices-divisor">-</span>
                            <div className="filter-main-price-prices-max">
                                <label htmlFor="maxPrice" className="filter-main-price-prices-max-lbl" >preço máximo</label>
                                <div>
                                    <span className="">R$</span>
                                    <input type="text" id="maxPrice" className="filter-main-price-prices-max-inpt" value={`${filter.maxPrice}`} onChange={e => handleSetPriceValue(e, "max")} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="filter-main-place">
                        <h2 className="">Tipo de lugar</h2>
                        <div className="filter-main-place-buttons">
                            <div className="filter-main-place-buttons-box" onClick={handleCheck} >
                                <input type="checkbox" readOnly checked={false} value="espacoInteiro" name="" id="" className="filter-main-place-buttons-box-input" />
                                <div className="filter-main-place-buttons-box-texts">
                                    <span>Espaço inteiro</span>
                                    <span className="filter-main-place-buttons-box-texts-desc">Um lugar só para você</span>
                                </div>
                            </div>
                            <div className="filter-main-place-buttons-box" onClick={handleCheck}>
                                <input type="checkbox" readOnly checked={false} value="quartoInteiro" name="" id="" className="filter-main-place-buttons-box-input" />
                                <div className="filter-main-place-buttons-box-texts">
                                    <span>Quarto inteiro</span>
                                    <span className="filter-main-place-buttons-box-texts-desc">Seu próprio quarto em uma cas ou hotel, além de alguns espaços comuns compartilhados</span>
                                </div>
                            </div>
                            <div className="filter-main-place-buttons-box" onClick={handleCheck}>
                                <input type="checkbox" readOnly checked={false} value="quartoCompartilhado" name="" id="" className="filter-main-place-buttons-box-input" />
                                <div className="filter-main-place-buttons-box-texts">
                                    <span>Quarto compartilhado</span>
                                    <span className="filter-main-place-buttons-box-texts-desc">Um espaço para dormir e áreas comuns que podem ser compartilhadas com outras pessoas</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="filter-main-roomsandbeds">
                        <h2 className="filter-main-roomsandbeds-title">Quartos e camas</h2>
                        <div className="filter-main-roomsandbeds-options">
                            <h5 className="filter-main-roomsandbeds-options-title">Quartos</h5>
                            <div className="filter-main-roomsandbeds-options-buttons">
                                {
                                    quantity.map((option, i) => (
                                        <button key={i} id={i} className={`filter-main-roomsandbeds-options-buttons-button ${bdRoomsId === i && "selected"}`} onClick={e => handleSelectItem(e, "bedroom")}>{option}</button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="filter-main-roomsandbeds-options">
                            <h5 className="filter-main-roomsandbeds-options-title">Camas</h5>
                            <div className="filter-main-roomsandbeds-options-buttons">
                                {
                                    quantity.map((option, i) => (
                                        <button key={i} id={i} className={`filter-main-roomsandbeds-options-buttons-button ${bedsId === i && "selected"}`} onClick={e => handleSelectItem(e, "bed")}>{option}</button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="filter-main-roomsandbeds-options">
                            <h5 className="filter-main-roomsandbeds-options-title">Banheiros</h5>
                            <div className="filter-main-roomsandbeds-options-buttons">
                                {
                                    quantity.map((option, i) => (
                                        <button key={i} id={i} className={`filter-main-roomsandbeds-options-buttons-button ${bthRoomsId === i && "selected"}`} onClick={e => handleSelectItem(e, "bethroom")}>{option}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                    <section className="filter-main-hostType">
                        <h2 className="filter-main-hostType-title">Tipo de propriedade</h2>
                        <div className="filter-main-hostType-buttons">
                            <div className={`filter-main-hostType-buttons-button ${hostTypeId === 1 && "selected"}`} onClick={e => handleSetSpaceType(e, "Casa")} id={1}>
                                <img src="https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg" className="filter-main-hostType-buttons-button-hostType-img" alt="" />
                                <span>Casa</span>
                            </div>
                            <div className={`filter-main-hostType-buttons-button ${hostTypeId === 2 && "selected"}`} onClick={e => handleSetSpaceType(e, "Apartamento")} id={2}>
                                <img src="https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg" className="filter-main-hostType-buttons-button-hostType-img" alt="" />
                                <span>Apartamento</span>
                            </div>
                            <div className={`filter-main-hostType-buttons-button ${hostTypeId === 3 && "selected"}`} onClick={e => handleSetSpaceType(e, "Casa de hóspedes")} id={3}>
                                <img src="https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg" className="filter-main-hostType-buttons-button-hostType-img" alt="" />
                                <span>Casa de hóspedes</span>
                            </div>
                            <div className={`filter-main-hostType-buttons-button ${hostTypeId === 4 && "selected"}`} onClick={e => handleSetSpaceType(e, "Hotel")} id={4}>
                                <img src="https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg" className="filter-main-hostType-buttons-button-hostType-img" alt="" />
                                <span>Hotel</span>
                            </div>
                        </div>
                    </section>
                    <section className="filter-main-confort">
                        <h2 className="filter-main-confort-title">Comodidades</h2>
                        <h5 className="filter-main-confort-subtitle">Itens básicos</h5>
                        <div className="filter-main-confort-buttons">
                            <div className="filter-main-confort-buttons-button" onClick={handleSelectConfort}>
                                <input type="checkbox" readOnly className="filter-main-confort-buttons-button-inpt" value="wifi" />
                                <span className="filter-main-confort-buttons-button-text">Wi-Fi</span>
                            </div>
                            <div className="filter-main-confort-buttons-button" onClick={handleSelectConfort}>
                                <input type="checkbox" value="cozinha" className="filter-main-confort-buttons-button-inpt" />
                                <span className="filter-main-confort-buttons-button-text">Cozinha</span>
                            </div>
                            <div className="filter-main-confort-buttons-button" onClick={handleSelectConfort}>
                                <input type="checkbox" value="tv" className="filter-main-confort-buttons-button-inpt" />
                                <span className="filter-main-confort-buttons-button-text">Televisor</span>
                            </div>
                            <div className="filter-main-confort-buttons-button" onClick={handleSelectConfort}>
                                <input type="checkbox" value="maquina" className="filter-main-confort-buttons-button-inpt" />
                                <span className="filter-main-confort-buttons-button-text">Maquina de lavar</span>
                            </div>
                        </div>
                    </section>
                    <section className="filter-main-reserve">
                        <h2 className="filter-main-reserve-title">Opções de reserva</h2>
                        <div className="filter-main-reserve-buttons">
                            <label className="filter-main-reserve-buttons-switch" htmlFor="reserve-switch-1">
                                <div className="filter-main-reserve-buttons-switch-button"></div>
                                <input className="filter-main-reserve-buttons-switch-inpt" type="checkbox" value="reserve" id="reserve-switch-1" onClick={handleReserve} />
                            </label>
                            <div className="filter-main-reserve-buttons-texts">
                                <span className="filter-main-reserve-buttons-texts-title">instant reserv</span>
                                <p className="filter-main-reserve-buttons-texts-desc">Acomodações que você pode reservar sem ter que esperar pela aprovação do anfitrião</p>
                            </div>
                        </div>
                        <div className="filter-main-reserve-buttons">
                            <label className="filter-main-reserve-buttons-switch" htmlFor="reserve-switch-2">
                                <div className="filter-main-reserve-buttons-switch-button"></div>
                                <input className="filter-main-reserve-buttons-switch-inpt" type="checkbox" value="Self check-in" id="reserve-switch-2" onClick={handleReserve} />
                            </label>
                            <div className="filter-main-reserve-buttons-texts">
                                <span className="filter-main-reserve-buttons-texts-title">Self check-in</span>
                                <p className="filter-main-reserve-buttons-texts-desc">Acesso fácil a propriedade assim que chegar</p>
                            </div>
                        </div>
                    </section>
                    <section className="filter-main-lang">
                        <h2 className="filter-main-lang-title">Idioma do anfitrião</h2>
                        <div className="filter-main-lang-buttons">
                            <div className="filter-main-lang-button">
                                <label htmlFor="pt" className="filter-main-lang-button-lbl">
                                    <input type="checkbox" name="" className="filter-main-lang-button-inpt" value="portugues" id="pt" />
                                    <span className="filter-main-lang-button-texts">Português</span>
                                </label>
                            </div>
                            <div className="filter-main-lang-button">
                                <label htmlFor="en" className="filter-main-lang-button-lbl">
                                    <input type="checkbox" name="" className="filter-main-lang-button-inpt" value="ingles" id="en" />
                                    <span className="filter-main-lang-button-texts">inglês</span>
                                </label>
                            </div>
                            <div className="filter-main-lang-button">
                                <label htmlFor="fr" className="filter-main-lang-button-lbl">
                                    <input type="checkbox" name="" className="filter-main-lang-button-inpt" value="frances" id="fr" />
                                    <span className="filter-main-lang-button-texts">Francês</span>
                                </label>
                            </div>
                            <div className="filter-main-lang-button">
                                <label htmlFor="al" className="filter-main-lang-button-lbl">
                                    <input type="checkbox" name="" className="filter-main-lang-button-inpt" value="alemao" id="al" />
                                    <span className="filter-main-lang-button-texts">Alemão</span>
                                </label>
                            </div>
                        </div>
                    </section>
                </main>
                <div className="filter-footer">
                    <button className="filter-footer-button filter-footer-button--remove ">Remover filtros</button>
                    <button className="filter-footer-button filter-footer-button--filter" onClick={() => console.log(filter)}>Filtrar acomodações</button>
                </div>
            </div>
        </div>
    )
}