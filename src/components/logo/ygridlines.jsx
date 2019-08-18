import React from 'react';
export const YGridlines = props => {
    const { minrange, maxrange, xstart, width, height, xaxis_y, numberofgridlines } = props;
    let xls = LinearScale([minrange, maxrange], [xstart, width]);
    let xRange = maxrange - minrange;
    let h = xaxis_y + height;
    const deltaX = Math.ceil(xRange) / numberofgridlines;
    const nbins = Math.ceil(xRange / deltaX);
    const bins = Array.from(Array(nbins).keys());
    return (
        <g stroke="#ccc">
            {bins.map(i => {
                const v = minrange + deltaX * i;
                return <line key={i} x1={xls(v)} x2={xls(v)} y1={xaxis_y} y2={h} />;
            })}
            <line x1={xls(maxrange)} x2={xls(maxrange)} y1={xaxis_y} y2={h} />;
        </g>
    );
};
export const LinearScale = (d, r) => (v) =>
    // https://gist.github.com/vectorsize/7031902
    r[0] + (r[1] - r[0]) * ((v - d[0]) / (d[1] - d[0]));
