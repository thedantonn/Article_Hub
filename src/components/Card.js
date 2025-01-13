import React from 'react';

const Card = ({ title, excerpt, thumbnail, readingTime, category, lastEdited }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img className="w-full h-48 object-cover" src={thumbnail} alt={title} />
      <div className="p-4">
        <div className="text-sm text-gray-500 uppercase font-semibold">{category}</div>
        <h2 className="mt-2 text-lg font-bold text-gray-800">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{excerpt}</p>
        <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
          <span>{readingTime} min read</span>
          <span>Last edited: {lastEdited}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
