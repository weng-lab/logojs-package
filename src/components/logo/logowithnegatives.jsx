import React from 'react';

import { loadGlyphComponents, sortedIndices, sortedIndicesNegative, possum, negsum, maxLabelLength } from '../../common/utils';
import GlyphStack from './glyphstack';
import XAxis from './xaxis';
import YAxis from './yaxis';
import YAxisWithNegatives from './yaxisneg';
import { YGridlines } from './ygridlines';

const _position = (width, height, alpha, inverted) => (
    lv, transform, key, alphabet, negative, events
) => {
    const indices = negative ? sortedIndicesNegative(lv) : sortedIndices(lv); // tallest on top
    const { onSymbolMouseOver, onSymbolMouseOut, onSymbolClick } = events || {};
    return (
      <GlyphStack indices={indices} alphabet={alphabet} alpha={alpha}
	              lv={lv} transform={transform} width={width} height={height}
	  	          onSymbolMouseOver={onSymbolMouseOver ? s => onSymbolMouseOver(key, s) : null}
      	          onSymbolClick={onSymbolClick ? s => onSymbolClick(key, s) : null}
      	          onSymbolMouseOut={onSymbolMouseOut ? s => onSymbolMouseOut(key, s) : null}
	              key={key} inverted={inverted} />
    );
};

/**
 * Renders a logo with positive and negative symbol heights.
 *
 * @prop values matrix containing the symbol heights.
 * @prop height the height of the logo relative to the containing SVG.
 * @prop width the width of the logo relative to the containing SVG.
 * @prop alphabet symbol list mapping columns to colored glyphs.
 * @prop startpos number of the first position in the logo; defaults to 1.
 * @prop negativealpha if set, gives negative symbols a lighter shade than positive symbols.
 * @prop showGridLines if set, shows vertical grid lines.
 * @prop inverted if set, renders negative letters upright rather than upside down.
 */
const LogoWithNegatives = React.forwardRef(
    ({ values, height, width, alphabet, scale, startpos, negativealpha, showGridLines, inverted, onSymbolMouseOver,
       onSymbolMouseOut, onSymbolClick }, ref
) => {

    /* need at least one entry to continue */
    if (values.length === 0 || values[0].length === 0) {
	return <div />;
    }
    let alphabetSize = values[0].length;

    /* load alphabet components if necessary */
    for (const symbol in alphabet) {
        if (!symbol.component) {
            alphabet = loadGlyphComponents(alphabet);
            break;
        }
    }
    
    /* misc options */
    startpos = (startpos !== null && startpos !== undefined ? startpos : 1);
    negativealpha = (negativealpha < 0 ? 0 : negativealpha);
    negativealpha = negativealpha > 255 ? 255 : negativealpha;

    /* compute scaling factors */
    let maxes = values.map(possum);
    let mins = values.map(x => -negsum(x));
    let mvalue = Math.max(...maxes, ...mins);
    let maxHeight = 200.0;
    let glyphWidth = maxHeight / 6.0;

    /* compute viewBox */
    let viewBoxW = values.length * glyphWidth + 80;
    let viewBoxH = maxHeight + 18 * (maxLabelLength(startpos, values.length) + 1);
    let gposition = _position(glyphWidth, maxHeight / 2.05);
    let nposition = _position(glyphWidth, -maxHeight / 2.05, negativealpha / 255.0, inverted);
    if (scale)
	viewBoxW > viewBoxH ? width = scale : height = scale;
    
    return (
	<svg ref={ref} width={width} height={height} viewBox={'0 0 ' + viewBoxW + ' ' + viewBoxH}>
        {showGridLines && (
            <YGridlines
                {...{
                    minrange: startpos,
                    maxrange: startpos + values.length,
                    xstart: 70,
                    width: viewBoxW,
                    height: maxHeight,
                    xaxis_y: 10,
                    numberofgridlines: 10 * values.length //10 grid lines per glyph
                }} />
        )}
        <XAxis transform={'translate(80,' + (maxHeight + 20) + ')'} n={values.length}
	      glyphWidth={glyphWidth} startpos={startpos} />
	    {<YAxisWithNegatives transform="translate(0,10)" width={65} height={maxHeight} min={-mvalue} max={mvalue} />}
	    <line style={{ fill: 'none', stroke: '#000000', strokeWidth: 2.0, strokeLinecap: 'butt',
			   strokeLinejoin: 'miter', strokeOpacity: 1, strokeMiterlimit: 4,
			   strokeDasharray: '0.53,1.59', strokeDashoffset: 0 }}
	          transform={"translate(80," + (11 + maxHeight / 2) + ')'}
	          x1={0} x2={viewBoxW - 80} />
            <g transform="translate(80,10)">
                {values.map((lv, i) =>
		            gposition(lv.map(x => x > 0.0 ? x / mvalue : 0.0), 'translate(' + glyphWidth * i + ',0)', i, alphabet, false,
		              { onSymbolMouseOver, onSymbolMouseOut, onSymbolClick })
	        )}
	        {values.map((lv, i) =>
		    nposition(lv.map(x => x < 0.0 ? x / mvalue : 0.0), 'translate(' + glyphWidth * i + ',' + maxHeight + ')', i,
		              alphabet, true, { onSymbolMouseOver, onSymbolMouseOut, onSymbolClick })
                )}
            </g>           
    </svg>
    );
    
});
export default LogoWithNegatives;
