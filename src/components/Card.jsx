import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Card = ({ office }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={office.image} 
          alt={office.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg';
          }}
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-accent">
          {office.price} kr/dag
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 font-semibold text-lg mb-1 line-clamp-1">
          {office.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-1">
          {office.address}
        </p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {office.description || 'Modernt kontorsutrymme i bra läge.'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Värd: {office.host_name}
          </span>
          <Link to={`/listing/${office.id}`}>
            <Button text="Visa detaljer" color="accent" size="sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;