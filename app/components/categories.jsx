// components/categories.jsx
'use client';

import React from 'react';

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { display: "Windows & Doors", key: "windowsDoors" },
    { display: "Stucco", key: "stucco" },
    { display: "Decks", key: "deck" },
    { display: "Roof", key: "roof" },
    { display: "Soil", key: "soil" },
    { display: "Adj Improvements", key: "adjImprove" },
    { display: "Prior Water Intrusion", key: "priorWater" }
  ];

  return (
    <div className="flex flex-col space-y-2">
      {categories.map((category, index) => (
        <label
          key={index}
          className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer justify-center ${
            selectedCategory === category.key ? "bg-yellow-300" : "hover:bg-yellow-100"
          }`}
          onClick={() => {
            setSelectedCategory(category.key);
          }}
        >
          <span>{category.display}</span>
        </label>
      ))}
    </div>
  );
};

export default Categories;
