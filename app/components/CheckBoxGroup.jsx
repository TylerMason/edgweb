// app/components/CheckBoxGroup.jsx
import React, { useState, useEffect } from 'react';

const CheckBoxGroup = () => {
  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState({
    child1: false,
    child2: false,
    child3: false,
    child4: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    updateSVGElements();
  }, [childChecked]);

  const handleParentChange = () => {
    const newChecked = !parentChecked;
    setParentChecked(newChecked);
    setIsOpen(newChecked); // Open the dropdown if parent checkbox is checked

    const newChildChecked = {
      child1: newChecked,
      child2: newChecked,
      child3: newChecked,
      child4: newChecked,
    };
    setChildChecked(newChildChecked);
  };

  const handleChildChange = (child) => {
    const newChildChecked = {
      ...childChecked,
      [child]: !childChecked[child],
    };
    setChildChecked(newChildChecked);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateSVGElements = () => {
    const svgElements = document.querySelectorAll('svg [id^="windowRepair"]');
    svgElements.forEach((element) => {
      if (childChecked.child1) {
        element.classList.add('fill-green-500', 'opacity-50');
      } else {
        element.classList.remove('fill-green-500', 'opacity-50');
      }
    });
  };

  const getChildBgClass = (child) => {
    if (child === 'child1' && childChecked[child]) {
      return 'bg-green-500 bg-opacity-50';
    }
    return 'bg-gray-100';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between cursor-default" onClick={handleParentChange}>
          <input
            type="checkbox"
            checked={parentChecked}
            onChange={handleParentChange}
            className="mr-2"
          />
          <div onClick={toggleDropdown}>Builder Repair Locations</div>
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} onClick={toggleDropdown}>
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
            <label className={`flex items-center p-0.5 px-1 rounded-lg transform transition-transform duration-150 hover:translate-y-1 ${getChildBgClass('child1')}`}>
              <input
                type="checkbox"
                checked={childChecked.child1}
                onChange={() => handleChildChange('child1')}
                className="mr-2"
              />
              Windows
            </label>
            <label className={`flex items-center p-0.5 rounded-lg transform transition-transform duration-150 hover:translate-y-1 ${getChildBgClass('child2')}`}>
              <input
                type="checkbox"
                checked={childChecked.child2}
                onChange={() => handleChildChange('child2')}
                className="mr-2"
              />
              Decks
            </label>
            <label className={`flex items-center p-0.5 rounded-lg transform transition-transform duration-150 hover:translate-y-1 ${getChildBgClass('child3')}`}>
              <input
                type="checkbox"
                checked={childChecked.child3}
                onChange={() => handleChildChange('child3')}
                className="mr-2"
              />
              Roofs
            </label>
            <label className={`flex items-center p-0.5 rounded-lg transform transition-transform duration-150 hover:translate-y-1 ${getChildBgClass('child4')}`}>
              <input
                type="checkbox"
                checked={childChecked.child4}
                onChange={() => handleChildChange('child4')}
                className="mr-2"
              />
              Reported Leaks
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
