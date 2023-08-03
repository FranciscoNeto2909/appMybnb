import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./favorites.css"

export default function Favorites() {
    const navigate = useNavigate()
    const islogged = useSelector(data => data.user.isLogged)
    const favorites = useSelector(data => data.app.favorites)

    return (
        <div className="favorites">
            <div className="favorites-header">
                <h1 className="favorites-title">favorites</h1>
            </div>
            <section className="favorites-body">
                {islogged ?
                    <div className="favorites-categories">
                        {favorites?.map((item, i) => (
                            <div className="favorites-categorie" key={i}>
                                <button className="favorites-categories-btn">x</button>
                                <img className="favorites-categorie-img" src="https://cdn.leroymerlin.com.br/products/papel_de_parede_praia_paisagem_coqueiro_natureza_sala_painel_1567477501_4380_600x600.jpg" alt="" />
                                <p className="favorites-categorie-title">{item.title}</p>
                                <p className="favorites-categorie-saved">{item.items.length} saved</p>
                            </div>
                        ))}
                    </div> :
                    <div className="favorites-login">
                        <h2>Login to your account to view your favorites</h2>
                        <p className="favorites-login-desc">Você pode criar, visualizar ou editar listas de favoritos depois de fazer o login.</p>
                        <button className="favorites-login-btn" onClick={() => { navigate("/login") }}>Login</button>
                    </div>}
            </section>
        </div>
    )
}