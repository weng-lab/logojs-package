import React from 'react';

import { maxLabelLength, logLikelihood, sortedIndices, loadGlyphComponents, FREQUENCY } from '../../common/utils';
import { parseFASTA, parseSequences } from '../../common/fasta';
import GlyphStack from './glyphstack';
import XAxis from './xaxis';
import YAxis from './yaxis';
import YAxisFrequency from './yaxisfreq';
import { YGridlines } from './ygridlines';

const _position = (width, height) => (lv, transform, key, alphabet, events) => {
    const indices = sortedIndices(lv); // tallest on top
    const { onSymbolMouseOver, onSymbolMouseOut, onSymbolClick } = events || {};
    return (
	    <GlyphStack indices={indices} alphabet={alphabet}
	                onSymbolMouseOver={onSymbolMouseOver ? s => onSymbolMouseOver(key, s) : null}
	                onSymbolClick={onSymbolClick ? s => onSymbolClick(key, s) : null}
	                onSymbolMouseOut={onSymbolMouseOut ? s => onSymbolMouseOut(key, s) : null}
	                lv={lv} transform={transform} width={width} height={height} key={key} />
    );
};

/**
 * Renders a logo without axes.
 *
 * @prop values matrix containing symbol values.
 * @prop glyphWidth the width of a single glyph, relative to the containing SVG.
 * @prop stackHeight the height of each position, relative to the containing SVG; corresponds to a matrix value of 1.
 * @prop alphabet symbol list mapping columns to colored glyphs.
 * @prop onSymbolMouseOver raised when a symbol is moused over; receives information about the moused over symbol.
 * @prop onSymbolMousedOut raised when a symbol is moused out; receives information about the moused out symbol.
 * @prop onSymbolClicked raised when a symbol is clicked; receives information about the clicked symbol.
 */
export const RawLogo = ({ values, glyphWidth, stackHeight, alphabet, onSymbolMouseOver, onSymbolMouseOut, onSymbolClick }) => {
    const gposition = _position(glyphWidth, stackHeight);
    for (const symbol in alphabet) {
        if (!symbol.component) {
            alphabet = loadGlyphComponents(alphabet);
            break;
        }
    }
    return values.map((lv, i) => (
	    gposition(lv, 'translate(' + glyphWidth * i + ',0)', i, alphabet, { onSymbolMouseOver, onSymbolMouseOut, onSymbolClick })
    ));
};

/**
 * Renders a logo with x- and y-axes.
 *
 * @prop ppm position probability matrix. Rows are positions and should sum to 1; columns are symbols. If this is provided, it takes precedence over PFM in computing symbol heights.
 * @prop pfm position frequency matrix. Rows are positions and columns are nucleotides, alphabetically.
 * @prop fasta if provided, renders the logo from the given FASTA sequence. Only used if both ppm and pfm are not set.
 * @prop noFastaNames if set and if FASTA is used to compute letter heights, specifies that the FASTA data contains one sequence per line without sequence names.
 * @prop countUnaligned if set and if FASTA is used to compute letter heights, specifies that unaligned positions (dashes) should contribute to information content.
 * @prop constantPseudocount if set and if FASTA is used to compute letter heights, adds this value divided by the alphabet length to the resulting PFM.
 * @prop mode determines how symbol heights are computed; either FREQUENCY or INFORMATION_CONTENT.
 * @prop height the height of the logo relative to the containing SVG.
 * @prop width the width of the logo relative to the containing SVG.
 * @prop alphabet symbol list mapping columns to colored glyphs.
 * @prop startpos number of the first position in the logo; defaults to 1.
 * @prop negativealpha if set, gives negative symbols a lighter shade than positive symbols.
 * @prop showGridLines if set, shows vertical grid lines.
 * @prop inverted if set, renders negative letters upright rather than upside down.
 * @prop yAxisMax if set, uses an explicit maximum value for the y-axis rather than the total number of bits possible. This is ignored in FREQUENCY mode.
 */
const Logo = React.forwardRef(
    ({ ppm, pfm, values, fasta, mode, height, width, alphabet, glyphwidth, scale, startpos, showGridLines, backgroundFrequencies, constantPseudocount,
       yAxisMax, onSymbolMouseOver, onSymbolMouseOut, onSymbolClick, noFastaNames, countUnaligned }, ref
) => {

    /* compute likelihood; need at least one entry to continue */
    let count = null;
    const pseudocount = (constantPseudocount || 0) / alphabet.length;
    if (!ppm && !pfm && fasta) {
        const r = (noFastaNames ? parseSequences : parseFASTA)(alphabet, fasta.toUpperCase());
        pfm = r.pfm;
        count = r.count || 1;
    }
    if (!ppm && pfm && pfm.map)
        ppm = pfm.map( column => {
            const sum = (count && countUnaligned ? count : column.reduce( (a, c) => a + c ) + pseudocount * alphabet.length) || 1;
            return column.map( x => (x + pseudocount) / sum );
        });
    if (ppm.length === 0 || ppm[0].length === 0)
	return <div />;
    let alphabetSize = ppm[0].length;
    if (!backgroundFrequencies)
        backgroundFrequencies = ppm[0].map( _ => 1.0 / alphabetSize );
    let likelihood = values || ( mode !== FREQUENCY
		       ? ppm.map(logLikelihood(backgroundFrequencies))
		       : ppm.map(x => x.map(v => v * Math.log2(alphabetSize))) );
    const theights = mode === FREQUENCY ? [ Math.log2(alphabetSize) ] : backgroundFrequencies.map( x => Math.log2(1.0 / (x || 0.01)) );
    const max = yAxisMax || Math.max(...theights), min = Math.min(...theights);
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
	<svg width={width} height={height} viewBox={'0 0 ' + viewBoxW + ' ' + viewBoxH} ref={ref}>
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
            <RawLogo values={likelihood} glyphWidth={glyphWidth} stackHeight={maxHeight} alphabet={alphabet}
                     onSymbolMouseOver={onSymbolMouseOver} onSymbolMouseOut={onSymbolMouseOut} onSymbolClick={onSymbolClick} />
          </g>
        </svg>
    );
	
});
export default Logo;
