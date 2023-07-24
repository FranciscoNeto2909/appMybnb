import React from 'react';
import Card from '../components/cards/Card';
import { useSelector } from 'react-redux';
export default function Home() {
    const acomodations = useSelector(data => data.house.acomodation)
    return (
        <div className="home">
           {acomodations.map((house, i) => (
             <Card key={i} house={house} />
           ))}
        </div>
    );
}