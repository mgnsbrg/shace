// src/components/Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Card = ({ office }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <img src={office.image} alt={office.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-gray-900 font-semibold text-lg">{office.title}</p>
        <p className="text-gray-600 text-sm mb-1">{office.address}</p>
        <p className="text-gray-700 mb-2">{office.price} kr/dag</p>
        <Link to={`/listing/${office.id}`}>
          <Button text="Visa detaljer" color="accent" size="sm" />
        </Link>
      </div>
    </div>
  );
};

export default Card;