import React from 'react';

import { xrange } from '../../common/utils';

/**
 * Renders a y-axis for a logo scaled by frequency.
 *
 * @prop ticks the number of ticks to display, not conuting the tick at 0 which is always displayed.
 * @prop transform SVG transform to apply to the y-axis.
 * @prop height the height of the logo relative to the containing SVG.
 * @prop width the width of the logo relative to the containing SVG.
 */
const YAxisFrequency = ({ ticks, transform, height, width }) => {
    const ticks = xrange(ticks + 1).map(x => x / ticks);
    return (
	<g transform={transform}>
	  <rect height={height} width={4} x={width + 1} y="0"
	        fill="#000000" />
	  {ticks.map( x => (
	      <g key={x} transform={"translate(0," + (height - Math.floor(x * height)) + ")"}>
		<text x={width - 10} textAnchor="end" y="4" fontSize="18">
                  {(x + '').substring(0, 4)}
                </text>
		<rect x={width - 5} width="10" height="4" y="-2" fill="#000000" />
	      </g>
	  ))}
	  <g transform="rotate(-90)">
	    <text y="15" x={-height / 2} textAnchor="middle" fontSize="18">frequency</text>
	  </g>
	</g>
    );
};
export default YAxisFrequency;
