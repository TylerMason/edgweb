// app/components/CheckBoxGroup.jsx
import React, { useState, useEffect } from 'react';

const CheckBoxGroup = ({ checkboxes, parentLabel, groupKey }) => {
  const [childChecked, setChildChecked] = useState(() => {
    const savedChildChecked = JSON.parse(localStorage.getItem(`childChecked_${groupKey}`)) || {};
    const initialChildChecked = {};
    checkboxes.forEach((checkbox) => {
      initialChildChecked[checkbox.id] = savedChildChecked[checkbox.id] || false;
    });
    return initialChildChecked;
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(`childChecked_${groupKey}`, JSON.stringify(childChecked));
    updateSVGElements();
  }, [childChecked]);

  const handleChildChange = (childId) => {
    const newChildChecked = {
      ...childChecked,
      [childId]: !childChecked[childId],
    };
    setChildChecked(newChildChecked);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateSVGElements = () => {
    checkboxes.forEach((config) => {
      const svgElements = document.querySelectorAll(`svg [id^="${config.idPrefix}"]`);
      svgElements.forEach((element) => {
        const fillString = `fill-${config.color}`;
        if (childChecked[config.id]) {
          element.classList.add(fillString, 'opacity-50');
        } else {
          element.classList.remove(fillString, 'opacity-50');
        }
      });
    });
  };

  const getChildBgClass = (childId) => {
    const checkbox = checkboxes.find(cb => cb.id === childId);
    if (checkbox && childChecked[childId]) {
      const bgString = `bg-${checkbox.color} bg-opacity-70`;
      return bgString;
    }
    return 'bg-gray-100';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={toggleDropdown}>
          <div>{parentLabel}</div>
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        {isOpen && (
          <div className="mt-4 ml-4 space-y-2">
            {checkboxes.map((checkbox) => (
              <label
                key={checkbox.id}
                className={`flex items-center p-1.5 rounded-lg transform transition-transform duration-150 hover:translate-y-1 ${getChildBgClass(checkbox.id)}`}
              >
                <input
                  type="checkbox"
                  checked={childChecked[checkbox.id]}
                  onChange={() => handleChildChange(checkbox.id)}
                  className="mr-2"
                />
                {checkbox.label}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
