import React from 'react';

import { xrange } from '../../common/utils';

/**
 * Renders a y-axis for a logo scaled by information content.
 *
 * @prop bits the maximum number of bits possible in the logo.
 * @prop transform SVG transform to apply to the y-axis.
 * @prop height the height of the logo relative to the containing SVG.
 * @prop width the width of the logo relative to the containing SVG.
 * @prop zeroPoint if set, fraction of the distance from the top where zero should be.
 */
const YAxis = ({ bits, transform, height, width, zeroPoint }) => {
    const ticks = xrange(bits + 1);
    if (zeroPoint === undefined) zeroPoint = 1.0;
    return (
	<g transform={transform}>
	  <rect height={height} width={4} x={width + 1} y={0}
	        fill="#000000" />
	  {ticks.map( i => (
	      <g key={i}
                 transform={"translate(0," + ((height * zeroPoint) - Math.floor(i * (height * zeroPoint) / bits)) + ")"}>
		<text x={width - 15} textAnchor="end" y="4" fontSize="18">{i}</text>
		<rect x={width - 10} width="15" height="4" y="-2" fill="#000000" />
	      </g>
	  ))}
	  <g transform="rotate(-90)">
	    <text y="20" x={-height / 2} textAnchor="middle" fontSize="18">
              bits
            </text>
	  </g>
	</g>
    );
};
export default YAxis;
