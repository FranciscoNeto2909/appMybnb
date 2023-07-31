import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import Skeleton from 'react-loading-skeleton';
import "./card.css"
import "react-loading-skeleton/dist/skeleton.css"
import ImgsSlider from '../imgsSlider/ImgsSlider';

export default function Card({ house }) {
  const houseimgs = house.images.split(",")
  const [favorite, setFavorite] = useState(false)

  return (
    <div className="card">
      <button className='card-favorite-btn' type='button' onClick={() => setFavorite(!favorite)}>
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