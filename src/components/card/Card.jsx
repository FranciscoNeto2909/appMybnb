import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import "./card.css"
import "react-loading-skeleton/dist/skeleton.css"
import ImgsSlider from '../imgsSlider/ImgsSlider';
import { setClickedCard, showFavorites } from '../../assets/appSlice';

export default function Card({ house }) {
  const houseimgs = house.images.split(",")
  const [favorite, setFavorite] = useState(false)
  const dispatch = useDispatch()

  function handleOpenFavoritesForm() {
    if (!favorite) {
      setFavorite(!favorite)
      dispatch(showFavorites())
      dispatch(setClickedCard(house))
    } else {
      setFavorite(!favorite)
    }
  }

  return (
    <div className="card">
      <button className='card-favorite-btn' id='fav-btn' aria-label='fav-btn' type='button' onClick={handleOpenFavoritesForm}>
        {favorite ?
          <AiFillHeart size={25} className="favorite" /> :
          <AiOutlineHeart size={25} />}
      </button>
      <div>
        {houseimgs.length > 0 &&
          <ImgsSlider imgs={houseimgs} />}
      </div>
      <div className="card-data">
        <h2 className='card-data-title'>{house.title}</h2>
        <p className='card-data-desc'>{house.hostDesc}</p>
        <p className='card-data-price'>{<span className='card-data-price--dark'> R${house.price}/noite </span>}</p>
      </div>
    </div>
  )
}