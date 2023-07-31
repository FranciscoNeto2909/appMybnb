import React, { useRef } from 'react';
import Card from '../components/card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { hideNav, showNav } from "../assets/appSlice";
import CardSkeleton from '../components/cardSkeleton/CardSleketon';

export default function Home() {
  const skeletonArr = [1, 2, 3, 4, 5]

  const previousTouchRef = useRef({ y: 0, x: 0 })
  const acomodations = useSelector(data => data.house.acomodation)
  const dispatch = useDispatch()


  const handleTouchMove = (event) => {
    const touch = event.touches[0]
    const deltaY = touch.clientY - previousTouchRef.current.y
    if (deltaY < -50) {
      dispatch(hideNav())
    }
    if (deltaY > 0) {
      dispatch(showNav())
    }
  }

  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    previousTouchRef.current.x = touch.clientX
    previousTouchRef.current.y = touch.clientY
  }

  return (
    <div className="home" onTouchMove={handleTouchMove} onTouchStart={handleTouchStart}>
      {acomodations.length > 0 ? acomodations.map((house, i) => (
        <Card key={i} house={house} />
      )) :
        skeletonArr.map((sklt, i) => (
          <CardSkeleton key={i} />
        ))
      }
    </div>
  );
}