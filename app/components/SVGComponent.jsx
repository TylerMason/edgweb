'use client';

import React, { useEffect, useRef } from 'react';
import Panzoom from 'panzoom';

const PanZoomSVG = () => {
    const panZoomRef = useRef(null);
    const elementConfigs = useRef({});

    useEffect(() => {
        // Fetch the SVG
        fetch('map.svg')
            .then(response => response.text())
            .then(svg => {
                panZoomRef.current.innerHTML = svg;
                const svgElement = panZoomRef.current.querySelector('svg');
                const panzoomInstance = Panzoom(svgElement, {
                    maxScale: 4,
                    minScale: 1,
                    contain: 'outside'
                });

                // Fetch the JSON configuration
                fetch('config.json')
                    .then(response => response.json())
                    .then(config => {
                        elementConfigs.current = config.elements.reduce((acc, elementConfig) => {
                            acc[elementConfig.id] = elementConfig;
                            return acc;
                        }, {});

                        config.elements.forEach(elementConfig => {
                            const targetElement = svgElement.querySelector(`#${elementConfig.id}`);
                            if (targetElement) {

                                // Add click event listener
                                targetElement.addEventListener('click', () => {
                                    window.open(elementConfig.url, '_blank');
                                });
                            }
                        });
                    });
            });
    }, []);

    return (
        <div
          ref={panZoomRef}
          className="w-full h-full overflow-hidden border border-lightgray rounded-lg"
        />
      );
      
};

export default PanZoomSVG;
