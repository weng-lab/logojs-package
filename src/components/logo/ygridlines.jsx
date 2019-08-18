import React from 'react';

const linearScale = (d, r) => v => (
    r[0] + (r[1] - r[0]) * ((v - d[0]) / (d[1] - d[0]))
);

export const YGridlines = ({ minrange, maxrange, xstart, width, height, xaxis_y, numberofgridlines, stroke }) => {
    
    const xls = linearScale([minrange, maxrange], [xstart, width]);
    const xRange = maxrange - minrange;
    const h = xaxis_y + height;
    const deltaX = Math.ceil(xRange) / numberofgridlines;
    const nbins = Math.ceil(xRange / deltaX);
    const bins = Array.from(Array(nbins).keys());
    
    return (
        <g stroke={stroke}>
            {bins.map(i => {
                const v = minrange + deltaX * i;
                return <line key={i} x1={xls(v)} x2={xls(v)} y1={xaxis_y} y2={h} />;
            })}
            <line x1={xls(maxrange)} x2={xls(maxrange)} y1={xaxis_y} y2={h} />;
        </g>
    );
    
};
