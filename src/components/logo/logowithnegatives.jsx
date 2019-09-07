import React from 'react';

import { sortedIndices, sortedIndicesNegative, possum, negsum } from '../../common/utils';
import GlyphStack from './glyphstack';
import XAxis from './xaxis';
import YAxis from './yaxis';
import YAxisWithNegatives from './yaxisneg';
import { YGridlines } from './ygridlines';

const _position = (width, height, alpha, inverted) => (lv, transform, key, alphabet, negative) => {
    let indices = negative ? sortedIndicesNegative(lv) : sortedIndices(lv); // tallest on top
    return (
      <GlyphStack indices={indices} alphabet={alphabet} alpha={alpha}
	  lv={lv} transform={transform} width={width} height={height}
	  key={key} inverted={inverted} />
    );
};

/**
 * Renders a logo with positive and negative symbol heights.
 *
 * @prop pwm matrix containing the symbol heights.
 * @prop height the height of the logo relative to the containing SVG.
 * @prop width the width of the logo relative to the containing SVG.
 * @prop alphabet symbol list mapping columns to colored glyphs.
 * @prop startpos number of the first position in the logo; defaults to 1.
 * @prop negativealpha if set, gives negative symbols a lighter shade than positive symbols.
 * @prop showGridLines if set, shows vertical grid lines.
 * @prop inverted if set, renders negative letters upright rather than upside down.
 */
const LogoWithNegatives = ({ pwm, height, width, alphabet, scale, startpos, negativealpha, showGridLines, inverted }) => {

    /* compute likelihood; need at least one entry to continue */
    if (pwm.length === 0 || pwm[0].length === 0) {
	return <div />;
    }
    let alphabetSize = pwm[0].length;

    /* misc options */
    startpos = (startpos !== null ? startpos : 1);
    negativealpha = (negativealpha < 0 ? 0 : negativealpha);
    negativealpha = negativealpha > 255 ? 255 : negativealpha;

    /* compute scaling factors */
    let maxes = pwm.map(possum);
    let mins = pwm.map(x => -negsum(x));
    let mvalue = Math.max(...maxes, ...mins);
    let maxHeight = 200.0;
    let glyphWidth = maxHeight / 6.0;

    /* compute viewBox */
    let viewBoxW = pwm.length * glyphWidth + 80;
    let viewBoxH = maxHeight +  + 20 * (Math.log10(Math.max(Math.abs(startpos), startpos + pwm.length)) + 1);
    let gposition = _position(glyphWidth, maxHeight / 2.05);
    let nposition = _position(glyphWidth, -maxHeight / 2.05, negativealpha / 255.0, inverted);
    if (scale)
	viewBoxW > viewBoxH ? width = scale : height = scale;
    
    return (
	<svg width={width} height={height} viewBox={'0 0 ' + viewBoxW + ' ' + viewBoxH}>
        {showGridLines && (
            <YGridlines
                {...{
                    minrange: startpos,
                    maxrange: startpos + pwm.length,
                    xstart: 70,
                    width: viewBoxW,
                    height: maxHeight,
                    xaxis_y: 10,
                    numberofgridlines: 10 * pwm.length //10 grid lines per glyph
                }} />
        )}
        <XAxis transform={'translate(80,' + (maxHeight + 20) + ')'} n={pwm.length}
	      glyphWidth={glyphWidth} startpos={startpos} />
	    {<YAxisWithNegatives transform="translate(0,10)" width={65} height={maxHeight} min={-mvalue} max={mvalue} />}
	    <line style={{ fill: 'none', stroke: '#000000', strokeWidth: 2.0, strokeLinecap: 'butt',
			   strokeLinejoin: 'miter', strokeOpacity: 1, strokeMiterlimit: 4,
			   strokeDasharray: '0.53,1.59', strokeDashoffset: 0 }}
	          transform={"translate(80," + (11 + maxHeight / 2) + ')'}
	          x1={0} x2={viewBoxW - 80} />
            <g transform="translate(80,10)">
                {pwm.map((lv, i) =>
		    gposition(lv.map(x => x > 0.0 ? x / mvalue : 0.0), 'translate(' + glyphWidth * i + ',0)', i, alphabet)
	        )}
	        {pwm.map((lv, i) =>
		    nposition(lv.map(x => x < 0.0 ? x / mvalue : 0.0), 'translate(' + glyphWidth * i + ',' + maxHeight + ')', i, alphabet, true)
                )}
            </g>           
    </svg>
    );
    
};
export default LogoWithNegatives;
