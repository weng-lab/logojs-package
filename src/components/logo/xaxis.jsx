import React from 'react';

import { xrange } from '../../common/utils';

/**
 * Renders an x-axis with logo position numbers.
 *
 * @prop n the total number of positions in the logo.
 * @prop transform SVG transform to apply to the axis.
 * @prop glyphWidth the width of each glyph in the containing logo.
 * @prop startpos the number of the first position in the logo.
 */
const XAxis = ({ n, transform, glyphWidth, startpos }) => {
    const numbers = xrange(n);
    return (
        <g transform={transform}>
	  <g transform="rotate(-90)">
	    {numbers.map( n => (
	        <text x="0" y={glyphWidth * (n + 0.66)} fontSize="18"
		      textAnchor="end" key={n}>
                  {n + startpos}
                </text>
	    ))}
	  </g>
   	</g>
    );
};
export default XAxis;
