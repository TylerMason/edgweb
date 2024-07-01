
'use client';

import React, { useState } from 'react';

const Categories = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        "Windows & Doors",
        "Stucco",
        "Decks",
        "Roof",
        "Soil",
        "Patio Wall",
        "Prior Water Intrusion"
    ];

    return (
        <div className="flex flex-col space-y-2">
            {categories.map((category, index) => (
                <label
                    key={index}
                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer justify-center ${
                    selectedCategory === category ? "bg-yellow-300" : "hover:bg-yellow-100"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                >
                    <span>{category}</span>
                </label>
            ))}
        </div>
      );
      
};

export default Categories