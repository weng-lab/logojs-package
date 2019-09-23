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
 * @prop values matrix containing symbol values.
 * @prop glyphWidth the width of a single glyph, relative to the containing SVG.
 * @prop stackHeight the height of each position, relative to the containing SVG; corresponds to a matrix value of 1.
 * @prop alphabet symbol list mapping columns to colored glyphs.
 */
export const RawLogo = ({ values, glyphWidth, stackHeight, alphabet }) => {
    let gposition = _position(glyphWidth, stackHeight);
    for (const symbol in alphabet) {
        if (!symbol.component) {
            alphabet = loadGlyphComponents(alphabet);
            break;
        }
    }
    return values.map((lv, i) => (
	gposition(lv, 'translate(' + glyphWidth * i + ',0)', i, alphabet)
    ));
};

const maxLabelLength = (startpos, length) => {
    let max = ("" + startpos).length;
    for (let i = startpos + 1; i < startpos + length; ++i)
        if (("" + i).length > max) max = ("" + i).length;
    return max;
};

/**
 * Renders a logo with x- and y-axes.
 *
 * @prop ppm position probability matrix. Rows are positions and should sum to 1; columns are symbols. If this is provided, it takes precedence over PFM in computing symbol heights.
 * @prop pfm position frequency matrix. Rows are positions and columns are nucleotides, alphabetically.
 * @prop mode determines how symbol heights are computed; either FREQUENCY or INFORMATION_CONTENT.
 * @prop height the height of the logo relative to the containing SVG.
 * @prop width the width of the logo relative to the containing SVG.
 * @prop alphabet symbol list mapping columns to colored glyphs.
 * @prop startpos number of the first position in the logo; defaults to 1.
 * @prop negativealpha if set, gives negative symbols a lighter shade than positive symbols.
 * @prop showGridLines if set, shows vertical grid lines.
 * @prop inverted if set, renders negative letters upright rather than upside down.
 */
const Logo = ({ ppm, pfm, mode, height, width, alphabet, glyphwidth, scale, startpos, showGridLines, backgroundFrequencies }) => {

    /* compute likelihood; need at least one entry to continue */
    if (!ppm && pfm && pfm.map)
        ppm = pfm.map( column => {
            const sum = column.reduce( (a, c) => a + c );
            return column.map( x => x / sum );
        });
    if (ppm.length === 0 || ppm[0].length === 0)
	return <div />;
    let alphabetSize = ppm[0].length;
    if (!backgroundFrequencies)
        backgroundFrequencies = ppm[0].map( _ => 1.0 / alphabetSize );
    let likelihood = ( mode !== FREQUENCY
		       ? ppm.map(logLikelihood(backgroundFrequencies))
		       : ppm.map(x => x.map(v => v * Math.log2(alphabetSize))) );
    const theights = mode === FREQUENCY ? [ Math.log2(alphabetSize) ] : backgroundFrequencies.map( x => Math.log2(1.0 / (x || 0.01)) );
    const max = Math.max(...theights), min = Math.min(...theights);
    const zeroPoint = min < 0 ? max / (max - min) : 1.0;
    
    /* misc options */
    startpos = !isNaN(parseFloat(startpos)) && isFinite(startpos) ? startpos : 1;

    /* compute scaling factors */
    let maxHeight = 100.0 * max;
    let glyphWidth = maxHeight / 6.0 * (glyphwidth || 1.0);
    
    /* compute viewBox and padding for the x-axis labels */
    let viewBoxW = likelihood.length * glyphWidth + 80;
    let viewBoxH = maxHeight + 18 * (maxLabelLength(startpos, likelihood.length) + 1);
    if (scale)
	viewBoxW > viewBoxH ? width = scale : height = scale;

    return (
	<svg width={width} height={height} viewBox={'0 0 ' + viewBoxW + ' ' + viewBoxH}>
          {showGridLines && (
              <YGridlines
                {...{
                    minrange: startpos,
                    maxrange: startpos + ppm.length,
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
            : <YAxis transform="translate(0,10)" width={65} height={maxHeight} bits={max} zeroPoint={zeroPoint} /> }
          <g transform="translate(80,10)">
            <RawLogo values={likelihood} glyphWidth={glyphWidth} stackHeight={maxHeight} alphabet={alphabet} />
          </g>
        </svg>
    );
	
};
export default Logo;
