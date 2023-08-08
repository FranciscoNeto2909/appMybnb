import React, { useState } from "react"
import { mask } from "remask"
import "./emailAuth.css"

export default function EmailAuth({ code, setStep }) {
    const [writedCode, setWritedCode] = useState("")
    const [wrong, setWrong] = useState(false)

    function handleMaskCode(elem) {
        setWritedCode(mask(`${elem}`, ['999999']))
    }

    function handleConfirmCode() {
        if (writedCode.toString() !== code) {
            setWrong(true)

            setTimeout(() => {
                setWrong(false)
            }, 2000);

        } else {
            setStep(3)
        }
    }

    return (
        <div className="emailauth">
            <p className="emailauth-notice">Digite o código {code} enviado para seu endereço de email</p>
            <div className="emailauth-form">
                <input type="text" autoComplete="none" id="code-input"
                    className="emailauth-form-input" maxLength={6} placeholder="- - - - - -" value={writedCode} onChange={e => handleMaskCode(e.target.value)} />
                {wrong && <p className="emailauth-form-error">Codigo incorreto</p>}
            <button className="emailauth-form-button" onClick={handleConfirmCode}>Continuar</button>
            </div>
            <p className="emailauth-options">Não recebeu o código? <span>Mais opções</span></p>
            <span className="emailauth-help">Precisa de ajuda?</span>
        </div>
    )
}