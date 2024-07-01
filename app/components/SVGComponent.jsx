'use client';

import React, { useEffect, useRef } from 'react';
import Panzoom from 'panzoom';

const PanZoomSVG = () => {
    const panZoomRef = useRef(null);

    useEffect(() => {
        fetch('map.svg')
            .then(response => response.text())
            .then(svg => {
                panZoomRef.current.innerHTML = svg;
                const svgElement = panZoomRef.current.querySelector('svg');
                const panzoomInstance = Panzoom(svgElement, {
                    maxScale: 4,
                    minScale: 0.5,
                    contain: 'outside'
                });

               
            });
    }, []);

    return <div ref={panZoomRef} style={{ width: '100%', height: '1000px', overflow: 'hidden' }} />;
};

export default PanZoomSVG;

