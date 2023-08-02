import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./favoritesModal.css"
import { cleanClickedCard, createCategorie, hideFavorites, hideModal, setFavorite, showModal } from "../../assets/appSlice";

export default function FavoritesForm() {
    const dispatch = useDispatch()
    const [newFav, setNewFav] = useState(false)
    const [newFavText, setNewFavText] = useState("")
    const clickedCard = useSelector(data => data.app.clickedCard)
    const favorites = useSelector(data => data.app.favorites)

    function handleContainerClick(e) {
        const close = e.target.classList
        if (close.contains("close")) {
            handleCloseModal()
        }
    }

    function handleCloseModal() {
        if (newFav) {
            setNewFav(false)
        }
        else {
            dispatch(cleanClickedCard())
            dispatch(hideModal())
            dispatch(hideFavorites())
        }
    }

    function handleAddToFavorite(id) {
        const hasAdded = favorites.map(item => item.items.filter(elem => elem.id === clickedCard.id))
        if (hasAdded.some(item => item.length > 0)) {
            alert("ja foi adicionado")
        } else {
            alert("adicionado com sucesso")
            dispatch(setFavorite({ id, item: clickedCard }))
            handleCloseModal()
        }
    }

    function handleCreateNewCategorie() {
        const hasCategorie = favorites.filter(item => item.title.toLowerCase() === newFavText.toLowerCase())
        if (newFavText === "") {
            alert("Escreva algo")
        } else if (hasCategorie.length > 0) {
            alert("Ja existente")
        } else {
            dispatch(createCategorie({ title: newFavText, items: [clickedCard] }))
            setNewFav(false)
            dispatch(hideModal())
            dispatch(hideFavorites())
        }
    }

    function handleOpenModal() {
        dispatch(showModal())
    }

    useEffect(() => {
        handleOpenModal()
    }, [])

    return (
        <div className="close favModal-container" onClick={handleContainerClick}>
            <section className="favModal">
                <div className="favModal-header">
                    <button onClick={handleCloseModal} className="favModal-header-btn">X</button>
                    <h4 className="favModal-header-title">{newFav ? "Criar lista de favoritos" : "Adicionar aos favoritos"}</h4>
                </div>
                <div className="favModal-body">
                    {!newFav ?
                        <>
                            <ul className="favModal-categories">
                                {favorites.map((item, i) => (
                                    <li className="favModal-categorie" onClick={() => handleAddToFavorite(i)} key={i}>
                                        <img className="favModal-categorie-img" src="https://cdn.leroymerlin.com.br/products/papel_de_parede_praia_paisagem_coqueiro_natureza_sala_painel_1567477501_4380_600x600.jpg" alt="" />
                                        <p className="favModal-categorie-title">{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="favModal-footer">
                                <button type="button" className="favModal-footer-btn" onClick={() => setNewFav(true)}>Criar nova lista de favoritos</button>
                            </div>
                        </> :
                        <>
                            <div className="newCategorie">
                                <div className="input-group newCategorie-container">
                                    <input type="text" id="newCateg" placeholder=" "
                                        className="inpt newCategorie-inpt" required value={newFavText} onChange={e => setNewFavText(e.target.value)} />
                                    <label htmlFor="newCateg" className="lbl">Name</label>
                                </div>
                            </div>
                            <div className="newCategorie-btns">
                                <button className="newCategorie-btn-cancel" type="button" onClick={() => setNewFavText("")}>Limpar</button>
                                <button onClick={handleCreateNewCategorie} className="newCategorie-btn" type="button">Criar</button>
                            </div>
                        </>
                    }
                </div>
            </section>
        </div>
    )
}