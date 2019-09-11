import React from 'react';

import { logLikelihood, sortedIndices, loadGlyphComponents, FREQUENCY } from '../../common/utils';
import GlyphStack from './glyphstack';
import XAxis from './xaxis';
import YAxis from './yaxis';
import YAxisFrequency from './yaxisfreq';
import { YGridlines } from './ygridlines';

const _position = (width, height) => (lv, transform, key, alphabet) => {
    let indices = sortedIndices(lv); // tallest on top
    return (
	<GlyphStack indices={indices} alphabet={alphabet}
	  lv={lv} transform={transform} width={width} height={height}
	  key={key} />
    );
};

/**
 * Renders a logo without axes.
 *
 * @prop pwm matrix containing symbol values.
 * @prop glyphWidth the width of a single glyph, relative to the containing SVG.
 * @prop stackHeight the height of each position, relative to the containing SVG.
 * @prop alphabet symbol list mapping columns to colored glyphs.
 */
export const RawLogo = ({ pwm, glyphWidth, stackHeight, alphabet }) => {
    let gposition = _position(glyphWidth, stackHeight);
    for (const symbol in alphabet) {
        if (!symbol.component) {
            alphabet = loadGlyphComponents(alphabet);
            break;
        }
    }
    return pwm.map((lv, i) => (
	gposition(lv, 'translate(' + glyphWidth * i + ',0)', i, alphabet)
    ));
};

/**
 * Renders a logo with x- and y-axes.
 *
 * @prop pwm matrix containing the symbol heights.
 * @prop mode determines how symbol heights are computed; either FREQUENCY or INFORMATION_CONTENT.
 * @prop height the height of the logo relative to the containing SVG.
 * @prop width the width of the logo relative to the containing SVG.
 * @prop alphabet symbol list mapping columns to colored glyphs.
 * @prop startpos number of the first position in the logo; defaults to 1.
 * @prop negativealpha if set, gives negative symbols a lighter shade than positive symbols.
 * @prop showGridLines if set, shows vertical grid lines.
 * @prop inverted if set, renders negative letters upright rather than upside down.
 */
const Logo = ({ pwm, mode, height, width, alphabet, glyphwidth, scale, startpos, showGridLines }) => {

    /* compute likelihood; need at least one entry to continue */
    if (pwm.length === 0 || pwm[0].length === 0) {
	return <div />;
    }
    let alphabetSize = pwm[0].length;
    let likelihood = ( mode !== FREQUENCY
		       ? pwm.map(logLikelihood(alphabet.length))
		       : pwm.map(x => x.map(v => v * Math.log2(alphabetSize))) );
    
    /* misc options */
    startpos = startpos || 1;

    /* compute scaling factors */
    let maxHeight = 100.0 * Math.log2(alphabetSize);
    let glyphWidth = maxHeight / 6.0 * (glyphwidth || 1.0);
    
    /* compute viewBox */
    let viewBoxW = likelihood.length * glyphWidth + 80;
    let viewBoxH = maxHeight + 20 * (Math.log10(Math.max(Math.abs(startpos), startpos + pwm.length)) + 1);
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
                    numberofgridlines: 10 * likelihood.length //10 grid lines per glyph
                }} />
          )}
          <XAxis transform={'translate(80,' + (maxHeight + 20) + ')'} n={likelihood.length}
	         glyphWidth={glyphWidth} startpos={startpos} />
	  { mode === FREQUENCY
	    ? <YAxisFrequency transform="translate(0,10)" width={65} height={maxHeight} ticks={2} />
            : <YAxis transform="translate(0,10)" width={65} height={maxHeight} bits={maxHeight / 100.0} /> }
          <g transform="translate(80,10)">
            <RawLogo pwm={likelihood} glyphWidth={glyphWidth} stackHeight={maxHeight} alphabet={alphabet} />
          </g>           
        </svg>
    );
	
};
export default Logo;
