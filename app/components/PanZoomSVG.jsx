// app/components/SVGComponent.jsx
'use client';

import React, { useEffect, useRef } from 'react';
import Panzoom from 'panzoom';
import unitStyles from '../../public/unitStyles.json'; // Assuming this is available locally

const PanZoomSVG = ({ selectedCategory }) => {
  const panZoomRef = useRef(null);
  const elementConfigs = useRef({});

  useEffect(() => {
    // Fetch the SVG
    fetch('mapv4.svg')
      .then(response => response.text())
      .then(svg => {
        panZoomRef.current.innerHTML = svg;
        const svgElement = panZoomRef.current.querySelector('svg');
        Panzoom(svgElement, {
          maxScale: 4,
          minScale: 1,
          contain: 'outside'
        });

        // Load the JSON configuration
        elementConfigs.current = unitStyles;

        // Apply initial opacity and event listeners
        applyInitialOpacity(svgElement);
        applyStylesAndListeners(svgElement, selectedCategory);
      });
  }, []);

  useEffect(() => {
    // Update styles when selectedCategory changes
    if (panZoomRef.current) {
      const svgElement = panZoomRef.current.querySelector('svg');
      applyStylesAndListeners(svgElement, selectedCategory);
    }
  }, [selectedCategory]);

  const applyInitialOpacity = (svgElement) => {
    const elements = svgElement.querySelectorAll('.cls-2');
    const elements2 = svgElement.querySelectorAll('.cls-1');
    elements.forEach(element => {
      element.classList.add('opacity-0');
    });
    elements2.forEach(element2 => {
      element2.classList.add('opacity-0');
    });
  };

  const applyStylesAndListeners = (svgElement, category) => {
    // Remove existing styles
    Object.keys(elementConfigs.current).forEach(unitId => {
      const element = svgElement.querySelector(`#${unitId}`);
      if (element) {
        element.className.baseVal = 'cls-2 opacity-0'; // Reset to default class and opacity
        element.onclick = null;
      }
    });

    // Apply new styles based on selectedCategory
    Object.keys(elementConfigs.current).forEach(unitId => {
      const unitConfig = elementConfigs.current[unitId];
      if (unitConfig[category]) {
        const { severity, url } = unitConfig[category];
        const element = svgElement.querySelector(`#${unitId}`);
        if (element) {
          const severityClasses = getSeverityClasses(severity);
          const hoverClass = getHoverClass(severity);
          element.classList.remove('opacity-0');
          element.classList.add(...severityClasses, hoverClass, 'opacity-60', 'cursor-pointer', 'transition-colors', 'duration-400');
          element.onclick = () => window.open(url, '_blank');
        }
      }
    });
  };

  const getSeverityClasses = (severity) => {
    switch (severity) {
      case 1:
        return ['fill-yellow-500'];
      case 2:
        return ['fill-orange-500'];
      case 3:
        return ['fill-red-600'];
      default:
        return [];
    }
  };

  const getHoverClass = (severity) => {
    switch (severity) {
      case 1:
        return 'hover:fill-yellow-700';
      case 2:
        return 'hover:fill-orange-700';
      case 3:
        return 'hover:fill-red-800';
      default:
        return '';
    }
  };

  return (
    <div
      ref={panZoomRef}
      className="w-full h-full overflow-hidden border border-lightgray rounded-lg"
    />
  );
};

export default PanZoomSVG;
