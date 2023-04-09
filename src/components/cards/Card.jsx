import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import Skeleton from 'react-loading-skeleton';
import "./card.css"
import "react-loading-skeleton/dist/skeleton.css"

export default function Card() {

  const [data, setData] = useState({
    img: "",
    title: "",
    description: ""
  })
  const [favorite, setFavorite] = useState(false)

  setTimeout(() => {
    setData({ img: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=", title: "Titulo do card", description: "Descrição do card", price: 300 });

  }, 2000);

  return (
    <div className="card">
      <button className='card-favorite-btn' type='button' onClick={() => setFavorite(!favorite)}>
        {favorite ?
          <AiFillHeart size={25} className="favorite" /> :
          <AiOutlineHeart size={25} />}
      </button>
      {data.img ? <img src={data.img} alt="" className='card-img' style={{ borderRadius: "10px" }} /> : <Skeleton height={300} />}
      <div className="card-data">
        <h2 className='card-data-title'>{data.title ? data.title : <Skeleton />}</h2>
        <p className='card-data-desc'>{data.description ? data.description : <Skeleton />}</p>
        <p className='card-data-price'>{data.price ? <span className='card-data-price--dark'> R${data.price}/noite </span> : <Skeleton />}</p>
      </div>
    </div>
  )
}