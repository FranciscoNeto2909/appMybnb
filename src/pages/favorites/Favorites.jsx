import { useSelector } from "react-redux"
import "./favorites.css"
import { useEffect } from "react"
export default function Favorites() {
    const favorites = useSelector(data => data.app.favorites)
    useEffect(() => {
        console.log(favorites)
    },[])
    return (
        <div className="favorites">
            <h1>favorites</h1>
        </div>
    )
}