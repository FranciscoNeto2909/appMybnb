import React, { useEffect, useState } from "react"
import { AiOutlineSearch, AiOutlineLeft } from "react-icons/ai"
import "react-datepicker/dist/react-datepicker.css"
import "./mobSearchDestiny.css"
import { hideNav } from "../../../assets/appSlice"
import { useDispatch } from "react-redux"
import MobWhere from "./where/MobWhere"
import MobWhen from "./when/MobWhen"
import MobWho from "./who/MobWho"

export default function MobSearchDestiny({ handleOpenDestiny }) {
    const dispatch = useDispatch()

    const [headerBtn, setHeaderBtn] = useState("headerB1")
    const [btnId, setBtnId] = useState("btn-1")
    const [destiny, setDestiny] = useState("")
    const [date, setDate] = useState("")
    const [step, setStep] = useState(1)
    const [hosts, setHosts] = useState(
        {
            adults: 0,
            kids: 0,
            babies: 0,
            animals: 0
        })



    function handleClearAll() {
        setDate("")
        setDestiny("")
    }

    function handleSetDate(e) {
        setDate(e)
    }

    function handleBackStep() {
        setStep(step - 1)
        if (step === 2) {
            setDestiny("")
        }
    }

    function handleAddHosts(hostType) {
        if (hostType === "adult" && hosts.adults < 16) {
            setHosts({ ...hosts, adults: hosts.adults + 1 })
        } else if (hostType === "kid" && hosts.kids < 8) {
            setHosts({ ...hosts, kids: hosts.kids + 1 })
        } else if (hostType === "babie" && hosts.babies < 4) {
            setHosts({ ...hosts, babies: hosts.babies + 1 })
        } else if (hostType === "animal" && hosts.animals < 3) {
            setHosts({ ...hosts, animals: hosts.animals + 1 })
        }
    }

    function handleremoveHosts(hostType) {
        if (hostType === "adult" && hosts.adults > 0) {
            setHosts({ ...hosts, adults: hosts.adults - 1 })
        } else if (hostType === "kid" && hosts.kids > 0) {
            setHosts({ ...hosts, kids: hosts.kids - 1 })
        } else if (hostType === "babie" && hosts.babies > 0) {
            setHosts({ ...hosts, babies: hosts.babies - 1 })
        } else if (hostType === "animal" && hosts.animals > 0) {
            setHosts({ ...hosts, animals: hosts.animals - 1 })
        }
    }

    function handleWriteDestiny(e) {
        step === 0 && setStep(step + 1);
        setDestiny(e.target.value)
    }

    function handleSearchDestiny(e) {
        if (e.key === "Enter") {
            setStep(step + 1);
        }
    }

    async function HandleChoiseRegion(region) {
        setDestiny(region)
        setStep(2)
    }

    useEffect(() => {
        dispatch(hideNav())
    }, [dispatch])

    return (
        <div className="mobSearchDestiny">
            <>
                <header className="mobSearchDestiny-header">
                    {step === 1 ?
                        <button type="button" className="header-closeBtn"
                            onClick={handleOpenDestiny}>
                            x
                        </button> :
                        <AiOutlineLeft size={30} onClick={handleBackStep} className="header-backBtn" />}
                    <div className="header-options">
                        <button type="button" id="headerB1" className={`options-buttons ${headerBtn === "headerB1" && "options-buttons--selected"}`}
                            onClick={e => setHeaderBtn(e.target.id)}>
                            Acomodações
                        </button>
                        <button type="button" id="headerB2" className={`options-buttons ${headerBtn === "headerB2" && "options-buttons--selected"}`}
                            onClick={e => setHeaderBtn(e.target.id)}>
                            Experiêcias
                        </button>
                        <div className={`options-marker ${headerBtn === "headerB1" ? "translate-left" : "translate-right"}`}></div>
                    </div>
                </header>
                <main className="">
                    {step >= 2 &&
                        <div className="mobWhere-buttons">
                            <button className="mobWhere-button" onClick={() => setStep(1)}>
                                <span className="mobWhen-button-text">Onde</span>
                                {destiny ?
                                    <span className="">{destiny}</span> :
                                    <span className="mobWhen-button-text--dark">Busca flexível</span>}
                            </button>
                            {step > 2 &&
                                <button className="mobWhere-button" onClick={() => setStep(2)}>
                                    <span className="mobWhen-button-text">Quando</span>
                                    {date ?
                                        <span className="mobWhen-button-text--dark">{date.toString().split(" ").slice(1, 4).toString()}</span> :
                                        <span className="mobWhen-button-text--dark">Adicionar datas</span>}
                                </button>}
                        </div>
                    }
                    {step === 1 &&
                        <MobWhere HandleChoiseRegion={HandleChoiseRegion} step={step} handleSearchDestiny={handleSearchDestiny} handleWriteDestiny={handleWriteDestiny} setStep={setStep} destiny={destiny} />
                    }
                    {step === 2 &&
                        <MobWhen btnId={btnId} date={date} handleSetDate={handleSetDate} setBtnId={setBtnId} />
                    }
                    {step === 3 &&
                        <MobWho handleAddHosts={handleAddHosts} handleremoveHosts={handleremoveHosts} hosts={hosts} />
                    }
                </main>
            </>
            {step !== 1 &&
                <div className="mobSearchDestiny-buttons">
                    {step === 2 ?
                        <button className="mobSearchDestiny-buttons-btn-next" onClick={() => setStep(3)}>Pular</button> :
                        <button className="mobSearchDestiny-buttons-btn-clear" onClick={handleClearAll}>Limpar tudo</button>}
                    <button className="mobSearchDestiny-buttons-btn-search" style={step !== 0 && step !== 3 ? {
                        display
                            : "none"
                    } : {}}>
                        <span>
                            <AiOutlineSearch className="btn-search-img" size={22} />
                        </span>
                        Buscar
                    </button>
                    <button className="btn-search-next" onClick={() => setStep(3)}
                        style={step !== 1 && step !== 2 ? {
                            display
                                : "none"
                        } : {}}>Avançar</button>
                </div>
            }
        </div>
    )
}